namespace Netflix.API.DTOs.MessageDtos
{
    public class CreateMessageDto
    {
        public string Content { get; set; }
        public int? ConversationId { get; set; }
        public string? Subject { get; set; } // For new conversations
        public string? AttachmentUrl { get; set; }
        public string? AttachmentType { get; set; }
    }
}