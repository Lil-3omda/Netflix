namespace Netflix.API.DTOs.VideoDTO
{
    public class VideoResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string VideoUrl { get; set; }
        public string TrailerUrl { get; set; }
        public string ImageUrl { get; set; }
        public string CoverUrl { get; set; }

        public int ViewCount { get; set; }
        public int TotalView { get; set; }


        public string CategoryName { get; set; }
        public string Type { get; set; }
        public string Duration { get; set; }
        public string Status { get; set; }
    }
}
