using Netflix.API.DTOs.ReviewsDTOs;

namespace Netflix.API.DTOs.VideoDTOs
{
    public class VideoDetailDTO:VideoDTO
    {
        public string FilePath { get; set; } // only when playing
        public List<ReviewDTO> Reviews { get; set; }

    }
}
