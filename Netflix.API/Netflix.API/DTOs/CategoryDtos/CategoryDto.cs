namespace Netflix.API.DTOs.CategoryDtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<VideoInCategoryDto> Videos { get; set; }
    }
}
