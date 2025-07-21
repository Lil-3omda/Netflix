namespace Netflix.API.DTOs.RatingDTOs
{
    public class RatingResponseDto
    {
        public int Id { get; set; }
        public int Stars { get; set; }
        public int ProfileId { get; set; }
        public string ProfileName { get; set; }
    }
}
