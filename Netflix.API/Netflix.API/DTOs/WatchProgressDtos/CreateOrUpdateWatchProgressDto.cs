namespace Netflix.API.DTOs.WatchProgressDtos
{
    public class CreateOrUpdateWatchProgressDto
    {
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public TimeSpan CurrentTime { get; set; }
    }
}
