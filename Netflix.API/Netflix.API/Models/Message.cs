namespace Netflix.API.Models
{
    public enum MessageType
    {
        CustomerToAdmin,
        AdminToCustomer,
        SystemMessage
    }

    public enum MessageStatus
    {
        Sent,
        Delivered,
        Read
    }

    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public MessageStatus Status { get; set; } = MessageStatus.Sent;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReadAt { get; set; }

        // Foreign Keys
        public string? SenderId { get; set; }
        public ApplicationUser? Sender { get; set; }

        public string? ReceiverId { get; set; }
        public ApplicationUser? Receiver { get; set; }

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }

        // For file attachments (optional)
        public string? AttachmentUrl { get; set; }
        public string? AttachmentType { get; set; }
    }
}