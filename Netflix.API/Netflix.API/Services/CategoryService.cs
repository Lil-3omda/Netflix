using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.CategoryDtos;
using Netflix.API.Models;
using Netflix.API.Paginations;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly ApplicationDbContext context;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper, ApplicationDbContext context)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            var categories = await context.Categories
                .Include(c => c.Videos)
                .ToListAsync();

            return mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<PaginatedResult<CategoryDto>> GetAllPaginatedAsync(PaginationParams paginationParams)
        {
            var query = context.Categories
                .Include(c => c.Videos)
                .AsQueryable();

            var totalCount = await query.CountAsync();

            var categories = await query
                .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
                .Take(paginationParams.PageSize)
                .ToListAsync();

            var data = mapper.Map<IEnumerable<CategoryDto>>(categories);

            return new PaginatedResult<CategoryDto>(data, totalCount, paginationParams.PageSize, paginationParams.PageNumber);
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await context.Categories
                .Include(c => c.Videos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return null;

            return mapper.Map<CategoryDto>(category);
        }

        public async Task<List<string>> GetCategoryNamesAsync()
        {
            return await context.Categories
                .Select(c => c.Name)
                .ToListAsync();
        }

        public async Task AddAsync(CreateCategoryDto dto)
        {
            var category = mapper.Map<Category>(dto);
            await unitOfWork.context.Categories.AddAsync(category);
            await unitOfWork.SaveAsync();
        }

        public async Task<bool> UpdateAsync(int id, UpdateCategoryDto dto)
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
                return false;

            category.Name = dto.Name;
            unitOfWork.context.Categories.Update(category);
            await unitOfWork.SaveAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await context.Categories
                .Include(c => c.Videos)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return false;

            if (category.Videos.Any())
                return false;

            unitOfWork.context.Categories.Remove(category);
            await unitOfWork.SaveAsync();
            return true;
        }
    }
}
