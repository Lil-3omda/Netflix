using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.CategoryDtos;
using Netflix.API.Paginations;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoryService categoryService, ILogger<CategoriesController> logger)
        {
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategorieswithDeleted()
        {
            try
            {
                var result = await _categoryService.GetAllCatedoriesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting categories");
                return StatusCode(500, new { message = "Failed to retrieve categories" });
            }
        }

        //[HttpGet]
        //public async Task<IActionResult> GetAllCategories()
        //{
        //    try
        //    {
        //        var result = await _categoryService.GetAllAsync();
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error getting categories");
        //        return StatusCode(500, new { message = "Failed to retrieve categories" });
        //    }
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _categoryService.GetByIdAsync(id);
                if (category == null)
                    return NotFound(new { message = "Category not found" });

                return Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting category {CategoryId}", id);
                return StatusCode(500, new { message = "Failed to retrieve category" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _categoryService.AddAsync(dto);
                return CreatedAtAction(nameof(GetCategoryById), new { id = 0 }, new { message = "Category created successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating category");
                return StatusCode(500, new { message = "Failed to create category" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updated = await _categoryService.UpdateAsync(id, dto);
                if (!updated)
                    return NotFound(new { message = "Category not found" });

                return Ok(new { message = "Category updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating category {CategoryId}", id);
                return StatusCode(500, new { message = "Failed to update category" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var deleted = await _categoryService.SoftDeleteCategoryAsync(id);
                if (!deleted)
                    return BadRequest(new { message = "Cannot delete category that contains videos or category not found" });

                return Ok(new { message = "Category deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting category {CategoryId}", id);
                return StatusCode(500, new { message = "Failed to delete category" });
            }
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetCategoryStatistics()
        {
            try
            {
                var categories = await _categoryService.GetAllAsync();
                var totalCategories = categories.Count();
                var categoriesWithVideos = categories.Count(c => c.Videos.Any());
                var totalVideos = categories.SelectMany(c => c.Videos).Count();

                return Ok(new
                {
                    totalCategories,
                    categoriesWithVideos,
                    emptyCategories = totalCategories - categoriesWithVideos,
                    totalVideos,
                    averageVideosPerCategory = totalCategories > 0 ? (double)totalVideos / totalCategories : 0
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting category statistics");
                return StatusCode(500, new { message = "Failed to retrieve statistics" });
            }
        }

        [HttpPut("restore/{id}")]
        public async Task<IActionResult> RestoreCategory(int id)
        {
            try
            {
                var restored = await _categoryService.RestoreCategoryAsync(id);
                if (!restored)
                    return NotFound(new { message = "Category not found or already active" });
                return Ok(new { message = "Category restored successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error restoring category {CategoryId}", id);
                return StatusCode(500, new { message = "Failed to restore category" });
            }
        }
    }
}