namespace Netflix.API.DTOs.VideoDTOs
{
    public class CreateVideoDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string FilePath { get; set; }
        public string ThumbnailPath { get; set; }
        public int CategoryId { get; set; }
    }
}
