namespace Netflix.API.Models
{
    public class ChatConversation
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string Title { get; set; } = "New Conversation";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastMessageAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
        
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    }
}