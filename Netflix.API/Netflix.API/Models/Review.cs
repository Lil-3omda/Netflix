namespace Netflix.API.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public int Rating { get; set; } // 1–5
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }

        public Profile Profile { get; set; }
        public Video Video { get; set; }
    }
}
