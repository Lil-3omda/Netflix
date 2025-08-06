using Netflix.API.DTOs.ChatDtos;

namespace Netflix.API.Services.Interfaces
{
    public interface IAiService
    {
        Task<string> GenerateResponseAsync(string userMessage, List<ChatMessageDto> conversationHistory, string? userContext = null);
        Task<List<MovieRecommendation>> GenerateMovieRecommendationsAsync(string userId, string userMessage);
        Task<string> AnalyzeWatchHistoryAsync(string userId);
    }
}