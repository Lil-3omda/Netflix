namespace Netflix.API.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public List<Favorite> Favorites { get; set; }
        public List<WatchProgress> WatchProgresses { get; set; }
        public List<Rating> Ratings { get; set; }

    }
}
