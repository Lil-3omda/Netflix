namespace Netflix.API.DTOs.ChatDtos
{
    public class ChatResponse
    {
        public int ConversationId { get; set; }
        public string Response { get; set; }
        public List<MovieRecommendation>? Recommendations { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public int TokensUsed { get; set; }
    }

    public class MovieRecommendation
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double Rating { get; set; }
        public string Category { get; set; }
        public string Reason { get; set; }
    }
}