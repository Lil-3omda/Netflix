namespace Netflix.API.Models
{
    public class Favorite
    {
        public int Id { get; set; }

        public int ProfileId { get; set; }
        public Profile Profile { get; set; }

        public int VideoId { get; set; }
        public Video Video { get; set; }

    }
}
