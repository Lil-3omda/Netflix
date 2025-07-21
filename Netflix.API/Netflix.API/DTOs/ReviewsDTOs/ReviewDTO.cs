namespace Netflix.API.DTOs.ReviewsDTOs
{
    public class ReviewDTO
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public string ProfileName { get; set; }
        public DateTime CreatedAt { get; set; }
      
    }
}
