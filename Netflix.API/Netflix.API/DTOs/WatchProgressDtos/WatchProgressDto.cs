namespace Netflix.API.DTOs.WatchProgressDtos
{
    public class WatchProgressDto
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public int VideoId { get; set; }
        public TimeSpan CurrentTime { get; set; }
    }
}
