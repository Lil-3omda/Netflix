using Netflix.API.Models;

namespace Netflix.API.DTOs.MessageDtos
{
    public class MessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public string? SenderName { get; set; }
        public string? SenderId { get; set; }
        public string? AttachmentUrl { get; set; }
        public string? AttachmentType { get; set; }
        public int ConversationId { get; set; }
    }
}