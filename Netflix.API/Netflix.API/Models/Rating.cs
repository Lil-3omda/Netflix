namespace Netflix.API.Models
{
    public class Rating
    {
        public int Id { get; set; }

        public int VideoId { get; set; }
        public Video Video { get; set; }

        public int ProfileId { get; set; }
        public Profile Profile { get; set; }

        public int Value { get; set; }

    }
}
