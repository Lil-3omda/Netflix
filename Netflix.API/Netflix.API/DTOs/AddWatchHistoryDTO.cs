namespace Netflix.API.DTOs
{
    public class AddWatchHistoryDTO
    {
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public DateTime WatchedAt { get; set; }
    }
}
