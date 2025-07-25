using Netflix.API.DTOs.ChatDtos;

namespace Netflix.API.Services.Interfaces
{
    public interface IChatService
    {
        Task<ChatResponse> ProcessMessageAsync(string userId, ChatRequest request);
        Task<ConversationDto> GetConversationAsync(string userId, int conversationId);
        Task<List<ConversationDto>> GetUserConversationsAsync(string userId);
        Task<int> CreateConversationAsync(string userId, string initialMessage);
    }
}