namespace Netflix.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool IsDeleted { get; set; }
        public List<Video> Videos { get; set; }

    }
}
