using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.CategoryDtos;
using Netflix.API.Paginations;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryService.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetAllPaginated([FromQuery] PaginationParams paginationParams)
        {
            var result = await categoryService.GetAllPaginatedAsync(paginationParams);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await categoryService.GetByIdAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await categoryService.AddAsync(dto);
            return StatusCode(201);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await categoryService.UpdateAsync(id, dto);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await categoryService.DeleteAsync(id);
            if (!deleted)
                return BadRequest("Cannot delete category that contains videos or category not found.");

            return NoContent();
        }
    }
}
