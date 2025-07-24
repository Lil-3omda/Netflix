using Netflix.API.DTOs.ConversationDtos;
using Netflix.API.DTOs.MessageDtos;

namespace Netflix.API.Services.Interfaces
{
    public interface ICommunicationService
    {
        // Conversation management
        Task<ConversationDto> CreateConversationAsync(string customerId, CreateConversationDto dto);
        Task<IEnumerable<ConversationDto>> GetCustomerConversationsAsync(string customerId);
        Task<IEnumerable<ConversationDto>> GetAdminConversationsAsync(string? adminId = null);
        Task<ConversationDto?> GetConversationWithMessagesAsync(int conversationId);
        Task<bool> AssignConversationToAdminAsync(int conversationId, string adminId);
        Task<bool> UpdateConversationStatusAsync(int conversationId, string status);

        // Message management
        Task<MessageDto> SendMessageAsync(string senderId, CreateMessageDto dto);
        Task<IEnumerable<MessageDto>> GetConversationMessagesAsync(int conversationId);
        Task<bool> MarkMessageAsReadAsync(int messageId);
        Task<bool> MarkConversationAsReadAsync(int conversationId, string userId);
        Task<int> GetUnreadCountAsync(string userId);

        // Chatbot functionality
        Task<MessageDto> ProcessChatbotMessageAsync(string customerId, string message);
        Task<string> GenerateChatbotResponseAsync(string message);
    }
}