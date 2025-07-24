namespace Netflix.API.DTOs.FavoriteDtos
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        public int VideoId { get; set; }
        public string VideoTitle { get; set; }
        public string VideoDescription { get; set; }
        public string VideoUrl { get; set; } 
        public string TrailerUrl { get; set; }
        public string ImageUrl { get; set; }
    }
}
