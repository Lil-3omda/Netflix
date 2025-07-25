using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.ConversationDtos;
using Netflix.API.DTOs.MessageDtos;
using Netflix.API.Models;
using Netflix.API.Repositories.ConversationRepository;
using Netflix.API.Repositories.MessageRepository;
using Netflix.API.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Netflix.API.Services
{
    public class CommunicationService : ICommunicationService
    {
        private readonly IConversationRepository _conversationRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CommunicationService(
            IConversationRepository conversationRepository,
            IMessageRepository messageRepository,
            ApplicationDbContext context,
            IMapper mapper)
        {
            _conversationRepository = conversationRepository;
            _messageRepository = messageRepository;
            _context = context;
            _mapper = mapper;
        }



        private async Task<string?> GetLeastBusyAdminIdAsync()
        {
                
                var query = await _context.Users
                    .Where(u => u.IsAdmin) 
                    .Select(u => new
                    {
                        u.Id,
                        OpenCount = _context.Conversations.Count(c =>
                            c.AssignedAdminId == u.Id &&
                           (c.Status == ConversationStatus.Open || c.Status == ConversationStatus.InProgress)),
                        LastAssignedAt = _context.Conversations
                            .Where(c => c.AssignedAdminId == u.Id)
                            .Max(c => (DateTime?)c.CreatedAt) 
                    })
                    .OrderBy(x => x.OpenCount)                                   
                    .ThenBy(x => x.LastAssignedAt ?? DateTime.MinValue)          
                    .ThenBy(x => x.Id)                                          
                    .FirstOrDefaultAsync();

                return query?.Id;
        }


    public async Task<ConversationDto> CreateConversationAsync(string customerId, CreateConversationDto dto)
        {
            var customer = await _context.Users.FindAsync(customerId);
            if (customer == null)
                throw new ArgumentException("Customer not found");

            var conversation = new Conversation
            {
                Subject = dto.Subject,
                CustomerId = customerId,
                CustomerEmail = customer.Email,
                CustomerName = customer.FullName,
                AssignedAdminId = await GetLeastBusyAdminIdAsync(),
                Priority = dto.Priority,
                Status = ConversationStatus.Open
            };

            await _conversationRepository.AddAsync(conversation);
            await _context.SaveChangesAsync();

            // Add initial message
            var initialMessage = new Message
            {
                Content = dto.InitialMessage,
                Type = MessageType.CustomerToAdmin,
                SenderId = customerId,
                ConversationId = conversation.Id
            };

            await _messageRepository.AddAsync(initialMessage);
            conversation.LastMessageAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<ConversationDto>(conversation);
        }

        public async Task<IEnumerable<ConversationDto>> GetCustomerConversationsAsync(string customerId)
        {
            var conversations = await _conversationRepository.GetByCustomerIdAsync(customerId);
            return _mapper.Map<IEnumerable<ConversationDto>>(conversations);
        }

        public async Task<IEnumerable<ConversationDto>> GetAdminConversationsAsync(string? adminId = null)
        {
            var conversations = await _conversationRepository.GetAdminConversationsAsync(adminId);
            var result = new List<ConversationDto>();

            foreach (var conversation in conversations)
            {
                var dto = _mapper.Map<ConversationDto>(conversation);
                
                // Calculate unread count for admin
                dto.UnreadCount = await _context.Messages
                    .Where(m => m.ConversationId == conversation.Id && 
                               m.Type == MessageType.CustomerToAdmin && 
                               m.Status != MessageStatus.Read)
                    .CountAsync();

                result.Add(dto);
            }

            return result;
        }

        public async Task<ConversationDto?> GetConversationWithMessagesAsync(int conversationId)
        {
            var conversation = await _conversationRepository.GetWithMessagesAsync(conversationId);
            if (conversation == null)
                return null;

            return _mapper.Map<ConversationDto>(conversation);
        }

        public async Task<bool> AssignConversationToAdminAsync(int conversationId, string adminId)
        {
            var conversation = await _context.Conversations.FindAsync(conversationId);
            if (conversation == null)
                return false;

            conversation.AssignedAdminId = adminId;

            var messages = await _context.Messages
                .Where(m => m.ConversationId == conversationId && m.ReceiverId == null)
                .ToListAsync();

            foreach (var msg in messages)
            {
                if (msg.Type == MessageType.CustomerToAdmin)
                {
                    msg.ReceiverId = adminId;
                }
            }

            _context.Conversations.Update(conversation);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> UpdateConversationStatusAsync(int conversationId, string status)
        {
            if (Enum.TryParse<ConversationStatus>(status, out var conversationStatus))
            {
                try
                {
                    await _conversationRepository.UpdateStatusAsync(conversationId, conversationStatus);
                    return true;
                }
                catch
                {
                    return false;
                }
            }
            return false;
        }

        public async Task<MessageDto> SendMessageAsync(string senderId, CreateMessageDto dto)
        {
            var sender = await _context.Users.FindAsync(senderId);
            if (sender == null)
                throw new ArgumentException("Sender not found");

            Conversation conversation;

            if (dto.ConversationId.HasValue)
            {
                conversation = await _context.Conversations.FindAsync(dto.ConversationId.Value);
                if (conversation == null)
                    throw new ArgumentException("Conversation not found");

                if (sender.IsAdmin && string.IsNullOrEmpty(conversation.AssignedAdminId))
                {
                    conversation.AssignedAdminId = senderId;
                    _context.Conversations.Update(conversation);
                }
            }
            else
            {
                conversation = new Conversation
                {
                    Subject = dto.Subject ?? "New Support Request",
                    CustomerId = senderId,
                    CustomerEmail = sender.Email,
                    CustomerName = sender.FullName,
                    Status = ConversationStatus.Open
                };

                await _conversationRepository.AddAsync(conversation);
                await _context.SaveChangesAsync();
            }

            string receiverId;
            MessageType messageType;

            if (sender.IsAdmin)
            {
                messageType = MessageType.AdminToCustomer;

                if (string.IsNullOrEmpty(conversation.AssignedAdminId))
                {
                    conversation.AssignedAdminId = senderId;
                    _context.Conversations.Update(conversation);
                }

                receiverId = conversation.CustomerId;
            }
            else
            {
                messageType = MessageType.CustomerToAdmin;

                // Auto-assign an available admin if not yet assigned
                if (string.IsNullOrEmpty(conversation.AssignedAdminId))
                {
                    var admin = await _context.Users.FirstOrDefaultAsync(u => u.IsAdmin);
                    if (admin != null)
                    {
                        conversation.AssignedAdminId = admin.Id;
                        _context.Conversations.Update(conversation);
                    }
                }

                receiverId = conversation.AssignedAdminId;
            }


            var message = new Message
            {
                Content = dto.Content,
                Type = messageType,
                SenderId = senderId,
                ReceiverId = receiverId,
                ConversationId = conversation.Id,
                AttachmentUrl = dto.AttachmentUrl,
                AttachmentType = dto.AttachmentType
            };

            await _messageRepository.AddAsync(message);
            conversation.LastMessageAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();


            return _mapper.Map<MessageDto>(message);
        }

        public async Task<IEnumerable<MessageDto>> GetConversationMessagesAsync(int conversationId)
        {
            var messages = await _messageRepository.GetByConversationIdAsync(conversationId);
            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> MarkMessageAsReadAsync(int messageId)
        {
            try
            {
                await _messageRepository.MarkAsReadAsync(messageId);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> MarkConversationAsReadAsync(int conversationId, string userId)
        {
            try
            {
                await _messageRepository.MarkConversationAsReadAsync(conversationId, userId);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<int> GetUnreadCountAsync(string userId)
        {
            var unreadMessages = await _messageRepository.GetUnreadMessagesAsync(userId);
            return unreadMessages.Count();
        }

        public async Task<MessageDto> ProcessChatbotMessageAsync(string customerId, string message)
        {
            // Find or create a chatbot conversation
            var chatbotConversation = await _context.Conversations
                .FirstOrDefaultAsync(c => c.CustomerId == customerId && c.Subject.Contains("Chatbot"));

            if (chatbotConversation == null)
            {
                var customer = await _context.Users.FindAsync(customerId);
                chatbotConversation = new Conversation
                {
                    Subject = "Chatbot Support",
                    CustomerId = customerId,
                    CustomerEmail = customer?.Email,
                    CustomerName = customer?.FullName,
                    Status = ConversationStatus.Open
                };

                await _conversationRepository.AddAsync(chatbotConversation);
                await _context.SaveChangesAsync();
            }

            // Save customer message
            var customerMessage = new Message
            {
                Content = message,
                Type = MessageType.CustomerToAdmin,
                SenderId = customerId,
                ConversationId = chatbotConversation.Id
            };

            await _messageRepository.AddAsync(customerMessage);

            // Generate chatbot response
            var botResponse = await GenerateChatbotResponseAsync(message);

            // Save bot response
            var botMessage = new Message
            {
                Content = botResponse,
                Type = MessageType.SystemMessage,
                ConversationId = chatbotConversation.Id
            };

            await _messageRepository.AddAsync(botMessage);
            
            chatbotConversation.LastMessageAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return _mapper.Map<MessageDto>(botMessage);
        }

        public async Task<string> GenerateChatbotResponseAsync(string message)
        {
            // Simple rule-based chatbot responses
            var lowerMessage = message.ToLower();

            if (lowerMessage.Contains("password") || lowerMessage.Contains("login") || lowerMessage.Contains("sign in"))
            {
                return "I can help you with login issues! Try resetting your password by clicking 'Forgot Password' on the login page. If you continue having trouble, I'll connect you with a support agent.";
            }
            else if (lowerMessage.Contains("subscription") || lowerMessage.Contains("plan") || lowerMessage.Contains("billing"))
            {
                return "For subscription and billing questions, you can manage your plan in Account Settings. Would you like me to connect you with a billing specialist?";
            }
            else if (lowerMessage.Contains("video") || lowerMessage.Contains("movie") || lowerMessage.Contains("show") || lowerMessage.Contains("streaming"))
            {
                return "Having trouble with video playback? Try refreshing the page or checking your internet connection. For persistent issues, I can escalate this to our technical team.";
            }
            else if (lowerMessage.Contains("cancel") || lowerMessage.Contains("delete") || lowerMessage.Contains("account"))
            {
                return "To cancel your subscription or delete your account, go to Account Settings > Membership & Billing. Need help with this process? I can guide you through it.";
            }
            else if (lowerMessage.Contains("hello") || lowerMessage.Contains("hi") || lowerMessage.Contains("help"))
            {
                return "Hello! I'm the Netflix support chatbot. I can help you with login issues, subscription questions, video playback problems, and account management. What can I assist you with today?";
            }
            else if (lowerMessage.Contains("human") || lowerMessage.Contains("agent") || lowerMessage.Contains("representative"))
            {
                return "I'll connect you with a human support agent right away. Please wait while I transfer your conversation to our support team.";
            }
            else
            {
                return "I understand you need help with: \"" + message + "\". Let me connect you with a support specialist who can better assist you with this specific issue.";
            }
        }
    }
}