namespace Netflix.API.Models
{
    public enum VideoType 
    { 
    Movie,
    Show
    }

    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public int ViewCount { get; set; }
        public int CategoryId { get; set; }
        public VideoType Type { get; set; }
        public Category Category { get; set; }

        public List<Rating> Ratings { get; set; }
        public List<Favorite> Favorites { get; set; }
        public List<WatchProgress> WatchProgresses { get; set; }

        public string UploadedByUserId { get; set; }
        public ApplicationUser UploadedByUser { get; set; }

    }
}
