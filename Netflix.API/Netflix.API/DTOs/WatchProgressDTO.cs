namespace Netflix.API.DTOs
{
    public class WatchProgressDTO
    {
        public int VideoId { get; set; }
        public string Title { get; set; }
        public TimeSpan LastPosition { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string ThumbnailPath { get; set; }
    }
}
