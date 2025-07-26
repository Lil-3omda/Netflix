namespace Netflix.API.Models
{
    public enum MessageRole
    {
        User,
        Assistant,
        System
    }

    public class ChatMessage
    {
        public int Id { get; set; }
        public int ConversationId { get; set; }
        public ChatConversation Conversation { get; set; }
        public MessageRole Role { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? TokenCount { get; set; }
        public string? Metadata { get; set; } // JSON for additional data
    }
}