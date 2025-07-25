namespace Netflix.API.DTOs.ConversationDtos
{
    public class CreateConversationDto
    {
        public string Subject { get; set; }
        public string InitialMessage { get; set; }
        public string Priority { get; set; } = "Normal";
    }
}