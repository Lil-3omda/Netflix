namespace Netflix.API.DTOs.ReviewsDTOs
{
    public class CreateReviewDTO
    {
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
