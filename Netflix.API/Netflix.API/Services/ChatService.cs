using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.ChatDtos;
using Netflix.API.Models;
using Netflix.API.Services.Interfaces;
using System.Text.Json;

namespace Netflix.API.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAiService _aiService;
        private readonly IMapper _mapper;
        private readonly ILogger<ChatService> _logger;

        public ChatService(ApplicationDbContext context, IAiService aiService, IMapper mapper, ILogger<ChatService> logger)
        {
            _context = context;
            _aiService = aiService;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ChatResponse> ProcessMessageAsync(string userId, ChatRequest request)
        {
            try
            {
                // Get or create conversation
                ChatConversation conversation;
                if (request.ConversationId.HasValue)
                {
                    conversation = await _context.Set<ChatConversation>()
                        .Include(c => c.Messages)
                        .FirstOrDefaultAsync(c => c.Id == request.ConversationId.Value && c.UserId == userId);

                    if (conversation == null)
                    {
                        throw new UnauthorizedAccessException("Conversation not found or access denied");
                    }
                }
                else
                {
                    conversation = new ChatConversation
                    {
                        UserId = userId,
                        Title = TruncateTitle(request.Message)
                    };
                    _context.Set<ChatConversation>().Add(conversation);
                    await _context.SaveChangesAsync();
                }

                // Save user message
                var userMessage = new ChatMessage
                {
                    ConversationId = conversation.Id,
                    Role = MessageRole.User,
                    Content = request.Message
                };
                _context.Set<ChatMessage>().Add(userMessage);

                // Get conversation history for context
                var conversationHistory = conversation.Messages
                    .OrderBy(m => m.CreatedAt)
                    .Select(m => new ChatMessageDto
                    {
                        Id = m.Id,
                        Role = m.Role.ToString(),
                        Content = m.Content,
                        CreatedAt = m.CreatedAt
                    })
                    .ToList();

                // Generate AI response
                string aiResponse;
                List<MovieRecommendation>? recommendations = null;

                if (request.IncludeRecommendations || IsRecommendationRequest(request.Message))
                {
                    recommendations = await _aiService.GenerateMovieRecommendationsAsync(userId, request.Message);
                    var watchHistoryContext = await _aiService.AnalyzeWatchHistoryAsync(userId);
                    aiResponse = await _aiService.GenerateResponseAsync(request.Message, conversationHistory, watchHistoryContext);
                }
                else
                {
                    aiResponse = await _aiService.GenerateResponseAsync(request.Message, conversationHistory);
                }

                // Save assistant message
                var assistantMessage = new ChatMessage
                {
                    ConversationId = conversation.Id,
                    Role = MessageRole.Assistant,
                    Content = aiResponse,
                    Metadata = recommendations != null ? JsonSerializer.Serialize(recommendations) : null
                };
                _context.Set<ChatMessage>().Add(assistantMessage);

                // Update conversation timestamp
                conversation.LastMessageAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return new ChatResponse
                {
                    ConversationId = conversation.Id,
                    Response = aiResponse,
                    Recommendations = recommendations,
                    TokensUsed = EstimateTokens(request.Message + aiResponse)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing chat message for user {UserId}", userId);
                throw;
            }
        }

        public async Task<ConversationDto> GetConversationAsync(string userId, int conversationId)
        {
            var conversation = await _context.Set<ChatConversation>()
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == conversationId && c.UserId == userId);

            if (conversation == null)
                throw new NotFoundException("Conversation not found");

            return _mapper.Map<ConversationDto>(conversation);
        }

        public async Task<List<ConversationDto>> GetUserConversationsAsync(string userId)
        {
            var conversations = await _context.Set<ChatConversation>()
                .Include(c => c.Messages)
                .Where(c => c.UserId == userId && c.IsActive)
                .OrderByDescending(c => c.LastMessageAt)
                .Take(20)
                .ToListAsync();

            return _mapper.Map<List<ConversationDto>>(conversations);
        }

        public async Task<int> CreateConversationAsync(string userId, string initialMessage)
        {
            var conversation = new ChatConversation
            {
                UserId = userId,
                Title = TruncateTitle(initialMessage)
            };

            _context.Set<ChatConversation>().Add(conversation);
            await _context.SaveChangesAsync();

            return conversation.Id;
        }

        private bool IsRecommendationRequest(string message)
        {
            var recommendationKeywords = new[] { "recommend", "suggestion", "what to watch", "movie", "show", "series" };
            return recommendationKeywords.Any(keyword => message.ToLower().Contains(keyword));
        }

        private string TruncateTitle(string message)
        {
            return message.Length > 50 ? message.Substring(0, 47) + "..." : message;
        }

        private int EstimateTokens(string text)
        {
            // Rough estimation: 1 token ≈ 4 characters
            return text.Length / 4;
        }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }
}