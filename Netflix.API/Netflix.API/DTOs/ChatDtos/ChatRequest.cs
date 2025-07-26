namespace Netflix.API.DTOs.ChatDtos
{
    public class ChatRequest
    {
        public int? ConversationId { get; set; }
        public string Message { get; set; }
        public bool IncludeRecommendations { get; set; } = false;
    }
}