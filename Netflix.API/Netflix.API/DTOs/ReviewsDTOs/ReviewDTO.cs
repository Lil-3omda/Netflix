namespace Netflix.API.DTOs.ReviewsDTOs
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public string ProfileName { get; set; }
        public int VideoId { get; set; }
        public string? VideoTitle { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
