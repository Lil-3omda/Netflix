namespace Netflix.API.Models
{
    public class WatchProgress
    {
        public int Id { get; set; }

        public int ProfileId { get; set; }
        public Profile Profile { get; set; }

        public int VideoId { get; set; }
        public Video Video { get; set; }

        public TimeSpan CurrentTime { get; set; }
    }
}
