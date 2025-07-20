namespace Netflix.API.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<WatchHistory> WatchHistories { get; set; }
        public ICollection<Favorite> Favorites { get; set; }
        public ICollection<WatchProgress> WatchProgresses { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }

}
