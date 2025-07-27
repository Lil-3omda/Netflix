using Netflix.API.Models;

namespace Netflix.API.DTOs.VideoDTO
{
    public class AdminUploadMovieDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }

        // These properties will be set by the controller after saving the files
        public string TrailerUrl { get; set; }
       
        public int CategoryId { get; set; }
        //public VideoType Type { get; set; }

        // Required for [FromForm] file uploads
        public IFormFile VideoFile { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
