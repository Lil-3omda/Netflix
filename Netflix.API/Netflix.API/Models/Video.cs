namespace Netflix.API.Models
{
    public enum VideoType 
    { 
    Movie=1,
    Show
    }

    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string VideoUrl { get; set; }    
        public string TrailerUrl { get; set; }  
        public string ImageUrl { get; set; }    

        public int ViewCount { get; set; }
        public int TotalView { get; set; }

        public bool IsDeleted { get; set; }
        public string Duration { get; set; }
        public string Status { get; set; }
        public int CategoryId { get; set; }
        public VideoType Type { get; set; }
        public Category Category { get; set; }

        public List<Rating> Ratings { get; set; }
        public List<Favorite> Favorites { get; set; }
        public List<WatchProgress> WatchProgresses { get; set; }
        public ICollection<WatchHistory> WatchHistories { get; set; }


        public string UploadedByUserId { get; set; }
        public ApplicationUser UploadedByUser { get; set; }

    }
}
