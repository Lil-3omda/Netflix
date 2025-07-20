namespace Netflix.API.Models
{
    public class WatchHistory
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public DateTime WatchedAt { get; set; }

        public Profile Profile { get; set; }
        public Video Video { get; set; }
    }
}
