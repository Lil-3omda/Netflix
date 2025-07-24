namespace Netflix.API.Models
{
    public enum ConversationStatus
    {
        Open,
        InProgress,
        Resolved,
        Closed
    }

    public class Conversation
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public ConversationStatus Status { get; set; } = ConversationStatus.Open;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastMessageAt { get; set; }

        // Customer who started the conversation
        public string CustomerId { get; set; }
        public ApplicationUser Customer { get; set; }

        // Admin handling the conversation (optional)
        public string? AssignedAdminId { get; set; }
        public ApplicationUser? AssignedAdmin { get; set; }

        // Messages in this conversation
        public ICollection<Message> Messages { get; set; } = new List<Message>();

        // Metadata
        public string? CustomerEmail { get; set; }
        public string? CustomerName { get; set; }
        public string? Priority { get; set; } = "Normal"; // Low, Normal, High, Urgent
    }
}