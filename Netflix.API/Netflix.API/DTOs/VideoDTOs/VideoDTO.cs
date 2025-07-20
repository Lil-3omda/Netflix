namespace Netflix.API.DTOs.VideoDTOs
{
    public class VideoDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ThumbnailPath { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
