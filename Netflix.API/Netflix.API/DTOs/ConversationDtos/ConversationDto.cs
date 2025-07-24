using Netflix.API.DTOs.MessageDtos;

namespace Netflix.API.DTOs.ConversationDtos
{
    public class ConversationDto
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastMessageAt { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string? AssignedAdminName { get; set; }
        public string Priority { get; set; }
        public int UnreadCount { get; set; }
        public MessageDto? LastMessage { get; set; }
        public List<MessageDto> Messages { get; set; } = new List<MessageDto>();
    }
}