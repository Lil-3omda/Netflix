namespace Netflix.API.DTOs
{
    public class WatchHistoryDTO
    {
        public int VideoId { get; set; }
        public string Title { get; set; }
        public DateTime WatchedAt { get; set; }
        public string ThumbnailPath { get; set; }
    }
}
