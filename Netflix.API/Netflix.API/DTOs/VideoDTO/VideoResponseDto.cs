namespace Netflix.API.DTOs.VideoDTO
{
    public class VideoResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string CategoryName { get; set; }
        public int ViewCount { get; set; }
        public string Type { get; set; }
    }
}
