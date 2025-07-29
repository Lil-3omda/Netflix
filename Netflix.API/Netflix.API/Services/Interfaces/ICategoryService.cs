using Netflix.API.DTOs.CategoryDtos;
using Netflix.API.Paginations;

namespace Netflix.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        
        Task<IEnumerable<CategoryDto>> GetAllCatedoriesAsync();
        Task<PaginatedResult<CategoryDto>> GetAllPaginatedAsync(PaginationParams paginationParams);
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto?> GetByNameAsync(string name);
        Task<List<string>> GetCategoryNamesAsync();
        Task AddAsync(CreateCategoryDto dto);
        Task<bool> UpdateAsync(int id, UpdateCategoryDto dto);
        Task<bool> SoftDeleteCategoryAsync(int id);
        Task<bool> RestoreCategoryAsync(int id);
    }
}
