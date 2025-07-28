using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.DTOs.UserDtos;
using System.Security.Claims;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string search = "")
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(u => u.FullName.Contains(search) || u.Email.Contains(search));
            }

            var totalUsers = await query.CountAsync();

            var users = await query
                .Include(u => u.Profiles)
                .Include(u => u.Subscriptions)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.IsEmailVerified,
                    u.IsAdmin,
                    ProfileCount = u.Profiles.Count(),
                    SubscriptionStatus = u.Subscriptions.Any(s =>
                        s.StartDate <= DateTime.UtcNow && s.EndDate >= DateTime.UtcNow
                    ) ? "Active" : "Inactive",
                    JoinDate = u.Profiles.Any() ? u.Profiles.Min(p => p.Id) : 0 // You may want to use CreatedAt if available
                })
                .ToListAsync();

            return Ok(new
            {
                users,
                totalUsers,
                currentPage = page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)totalUsers / pageSize)
            });
        }


        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _context.Users
                .Include(u => u.Profiles)
                .Include(u => u.Subscriptions)
                    .ThenInclude(s => s.Plan)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.IsEmailVerified,
                user.IsAdmin,
                Profiles = user.Profiles.Select(p => new { p.Id, p.Name }),
                Subscriptions = user.Subscriptions.Select(s => new
                {
                    s.Id,
                    PlanName = s.Plan.Name,
                    s.StartDate,
                    s.EndDate,
                    s.IsActive
                })
            });
        }

        [HttpPut("users/{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(string id, [FromBody] UpdateUserStatusDto dto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Update user status (you can add more fields as needed)
            if (dto.IsAdmin.HasValue)
            {
                user.IsAdmin = dto.IsAdmin.Value;
                
                if (dto.IsAdmin.Value)
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
                else
                {
                    await _userManager.RemoveFromRoleAsync(user, "Admin");
                }
            }

            await _userManager.UpdateAsync(user);
            return Ok(new { message = "User status updated successfully" });
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
                return Ok(new { message = "User deleted successfully" });

            return BadRequest(new { message = "Failed to delete user", errors = result.Errors });
        }

        [HttpGet("content/statistics")]
        public async Task<IActionResult> GetContentStatistics()
        {
            var totalContent = await _context.Videos.CountAsync();
            var publishedContent = await _context.Videos.CountAsync(v => !v.IsDeleted && v.Status == "Published");
            var draftContent = await _context.Videos.CountAsync(v => !v.IsDeleted && v.Status == "Draft");
            var totalViews = await _context.Videos.SumAsync(v => v.TotalView);

            return Ok(new
            {
                totalContent,
                publishedContent,
                draftContent,
                totalViews
            });
        }

        [HttpGet("analytics/overview")]
        public async Task<IActionResult> GetAnalyticsOverview()
        {
            var totalUsers = await _context.Users.CountAsync();
            var activeUsers = await _context.Users.CountAsync(u => u.IsEmailVerified);
            var totalContent = await _context.Videos.CountAsync(v => !v.IsDeleted);
            var totalViews = await _context.Videos.SumAsync(v => v.TotalView);

            var topContent = await _context.Videos
                .Where(v => !v.IsDeleted)
                .OrderByDescending(v => v.TotalView)
                .Take(5)
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.TotalView,
                    CategoryName = v.Category.Name,
                    v.Type
                })
                .ToListAsync();

            return Ok(new
            {
                totalUsers,
                activeUsers,
                totalContent,
                totalViews,
                topContent
            });
        }

        [HttpGet("conversations/stats")]
        public async Task<IActionResult> GetConversationStats()
        {
            var totalConversations = await _context.Conversations.CountAsync();
            var openConversations = await _context.Conversations.CountAsync(c => c.Status == ConversationStatus.Open);
            var resolvedToday = await _context.Conversations
                .CountAsync(c => c.Status == ConversationStatus.Resolved && 
                                c.LastMessageAt.HasValue && 
                                c.LastMessageAt.Value.Date == DateTime.Today);

            return Ok(new
            {
                totalConversations,
                openConversations,
                resolvedToday,
                avgResponseTime = "2.3m", // You can calculate this based on actual data
                satisfactionRate = 94 // You can calculate this based on actual data
            });
        }
    }

    public class UpdateUserStatusDto
    {
        public bool? IsAdmin { get; set; }
        public bool? IsEmailVerified { get; set; }
    }
}