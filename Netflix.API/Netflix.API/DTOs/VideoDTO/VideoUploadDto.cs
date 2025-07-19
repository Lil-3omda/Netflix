using Netflix.API.Models;

namespace Netflix.API.DTOs.VideoDTO
{
    public class VideoUploadDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int CategoryId { get; set; }
        public VideoType Type { get; set; }
    }
}
