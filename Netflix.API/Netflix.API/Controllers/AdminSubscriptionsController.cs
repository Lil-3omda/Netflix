using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.SubscriptionDTOs;
using Netflix.API.Models;

namespace Netflix.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SubscriptionsController> _logger;

        public SubscriptionsController(ApplicationDbContext context, ILogger<SubscriptionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("plans")]
        public async Task<IActionResult> GetAllPlans()
        {
            try
            {
                var plans = await _context.SubscriptionPlans.ToListAsync();
                return Ok(plans);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting subscription plans");
                return StatusCode(500, new { message = "Failed to retrieve plans" });
            }
        }

        [HttpGet("plans/{id}")]
        public async Task<IActionResult> GetPlanById(int id)
        {
            try
            {
                var plan = await _context.SubscriptionPlans.FindAsync(id);
                if (plan == null)
                    return NotFound(new { message = "Plan not found" });

                return Ok(plan);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting plan {PlanId}", id);
                return StatusCode(500, new { message = "Failed to retrieve plan" });
            }
        }

        [HttpPost("plans")]
        public async Task<IActionResult> CreatePlan([FromBody] CreateSubscriptionPlanDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var plan = new SubscriptionPlan
                {
                    Name = dto.Name,
                    Price = dto.Price,
                    MaxProfiles = dto.MaxProfiles
                };

                _context.SubscriptionPlans.Add(plan);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPlanById), new { id = plan.Id }, plan);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating subscription plan");
                return StatusCode(500, new { message = "Failed to create plan" });
            }
        }

        [HttpPut("plans/{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] UpdateSubscriptionPlanDTO dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var plan = await _context.SubscriptionPlans.FindAsync(id);
                if (plan == null)
                    return NotFound(new { message = "Plan not found" });

                plan.Name = dto.Name;
                plan.Price = dto.Price;
                plan.MaxProfiles = dto.MaxProfiles;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Plan updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating plan {PlanId}", id);
                return StatusCode(500, new { message = "Failed to update plan" });
            }
        }

        [HttpDelete("plans/{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            try
            {
                var plan = await _context.SubscriptionPlans
                    .Include(p => p.UserSubscriptions)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (plan == null)
                    return NotFound(new { message = "Plan not found" });

                // Check if plan has active subscriptions
                var hasActiveSubscriptions = plan.UserSubscriptions?.Any(s => s.IsActive) ?? false;
                if (hasActiveSubscriptions)
                    return BadRequest(new { message = "Cannot delete plan with active subscriptions" });

                _context.SubscriptionPlans.Remove(plan);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Plan deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting plan {PlanId}", id);
                return StatusCode(500, new { message = "Failed to delete plan" });
            }
        }

        [HttpGet("planss")]
        public async Task<IActionResult> GetSubscriptionPlans()
        {
            var plans = await _context.SubscriptionPlans
                .Include(p => p.UserSubscriptions) 
                .ToListAsync();

            return Ok(plans);
        }


        [HttpGet("users")]
        public async Task<IActionResult> GetUserSubscriptions()
        {
            var subscriptions = await _context.UserSubscriptions
                .Include(us => us.User)
                .Include(us => us.Plan)
                .Select(us => new UserSubscriptionRow
                {
                    Id = us.Id,
                    UserId = us.UserId,
                    UserName = us.User.UserName,
                    UserEmail = us.User.Email,
                    PlanName = us.Plan.Name,
                    PlanPrice = us.Plan.Price,
                    StartDate = us.StartDate,
                    EndDate = us.EndDate,
                    IsActive = !us.IsDeleted && us.EndDate > DateTime.UtcNow,
                    DaysRemaining = us.IsDeleted ? 0 : (us.EndDate - DateTime.UtcNow).Days,
                    IsDeleted = us.IsDeleted
                })
                .ToListAsync();

            var response = new UserSubscriptionsResponse
            {
                Subscriptions = subscriptions,
                TotalCount = subscriptions.Count,
                CurrentPage = 1,
                PageSize = subscriptions.Count,
                TotalPages = 1
            };

            return Ok(response);
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetSubscriptionStatistics()
        {
            try
            {
                var allSubscriptions = await _context.UserSubscriptions
                    .Where(us => !us.IsDeleted)
                    .Include(us => us.Plan)
                    .ToListAsync();

                var activeSubscriptions = allSubscriptions
                    .Count(u => DateTime.UtcNow >= u.StartDate && DateTime.UtcNow <= u.EndDate);

                var monthlyRevenue = allSubscriptions
                    .Where(u => u.Plan != null &&
                               DateTime.UtcNow >= u.StartDate &&
                               DateTime.UtcNow <= u.EndDate)
                    .Sum(u => (decimal?)u.Plan.Price) ?? 0;

                var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
                var expiredSubscriptions = allSubscriptions
                    .Where(u => u.EndDate >= thirtyDaysAgo && u.EndDate < DateTime.UtcNow)
                    .ToList();

                var renewedSubscriptions = await Task.WhenAll(expiredSubscriptions.Select(async u =>
                    await _context.UserSubscriptions.AnyAsync(us =>
                        us.UserId == u.UserId &&
                        us.StartDate > u.EndDate &&
                        us.StartDate <= DateTime.UtcNow)));

                var renewalCount = renewedSubscriptions.Count(x => x);
                var renewalRate = expiredSubscriptions.Count > 0
                    ? Math.Round(((double)renewalCount / expiredSubscriptions.Count) * 100, 2)
                    : 0;

                var totalRevenue = allSubscriptions
                    .Where(u => u.Plan != null)
                    .Sum(u => u.Plan.Price);
                var uniqueUsers = allSubscriptions.Select(u => u.UserId).Distinct().Count();
                var clv = uniqueUsers > 0 ? Math.Round(totalRevenue / uniqueUsers, 2) : 0;

                var startOfMonth = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);
                var startOfLastMonth = startOfMonth.AddMonths(-1);

                var previousMonthActiveUsers = allSubscriptions
                    .Where(u => u.StartDate <= startOfMonth && u.EndDate >= startOfMonth)
                    .Select(u => u.UserId)
                    .Distinct()
                    .Count();

                var currentMonthActiveUsers = allSubscriptions
                    .Where(u => u.StartDate <= DateTime.UtcNow && u.EndDate >= DateTime.UtcNow)
                    .Select(u => u.UserId)
                    .Distinct()
                    .Count();

                var retentionRate = previousMonthActiveUsers > 0
                    ? Math.Round((double)currentMonthActiveUsers / previousMonthActiveUsers * 100, 2)
                    : 0;

                var newSubsThisMonth = allSubscriptions
                    .Count(u => u.StartDate >= startOfMonth && u.StartDate <= DateTime.UtcNow);

                var canceledSubsThisMonth = allSubscriptions
                    .Count(u => u.EndDate >= startOfMonth &&
                               u.EndDate <= DateTime.UtcNow &&
                               !_context.UserSubscriptions.Any(us =>
                                   us.UserId == u.UserId &&
                                   us.StartDate > u.EndDate));

                var growthRate = newSubsThisMonth - canceledSubsThisMonth;

                var arpu = currentMonthActiveUsers > 0
                    ? Math.Round((double)monthlyRevenue / currentMonthActiveUsers, 2)
                    : 0;

                var planDistribution = allSubscriptions
                    .Where(u => u.Plan != null)
                    .GroupBy(u => u.Plan.Name)
                    .Select(g => new
                    {
                        PlanName = g.Key,
                        Count = g.Count(),
                        Revenue = g.Sum(u => u.Plan.Price)
                    })
                    .ToList();

                return Ok(new
                {
                    TotalSubscriptions = allSubscriptions.Count,
                    ActiveSubscriptions = activeSubscriptions,
                    MonthlyRevenue = monthlyRevenue,
                    RenewalRate = renewalRate,
                    CustomerLifetimeValue = clv,
                    RetentionRate = retentionRate,
                    GrowthRate = growthRate,
                    ARPU = arpu,
                    PlanDistribution = planDistribution
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to load subscription statistics");
                return StatusCode(500, new { message = "An error occurred while loading statistics." });
            }
        }

        [HttpPost("users/{userId}/extend")]
        public async Task<IActionResult> ExtendSubscription(string userId, [FromBody] ExtendSubscriptionDTO dto)
        {
            try
            {
                var subscription = await _context.UserSubscriptions
                    .FirstOrDefaultAsync(s => s.UserId == userId && s.IsActive);

                if (subscription == null)
                    return NotFound(new { message = "Active subscription not found" });

                subscription.EndDate = subscription.EndDate.AddDays(dto.Days);
                await _context.SaveChangesAsync();

                return Ok(new { 
                    message = "Subscription extended successfully",
                    newEndDate = subscription.EndDate
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error extending subscription for user {UserId}", userId);
                return StatusCode(500, new { message = "Failed to extend subscription" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserSubscription(int id, [FromBody] UpdateUserSubscriptionDTO dto)
        {
            try
            {
                var subscription = await _context.UserSubscriptions.FindAsync(id);
                if (subscription == null)
                    return NotFound(new { message = "Subscription not found" });

                // Update plan
                var plan = await _context.SubscriptionPlans.FindAsync(dto.PlanId);
                if (plan == null)
                    return BadRequest(new { message = "Invalid plan ID" });

                subscription.PlanId = dto.PlanId;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Subscription updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating subscription {SubscriptionId}", id);
                return StatusCode(500, new { message = "Failed to update subscription" });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.UserSubscriptions.FindAsync(id);
            if (subscription == null)
                return NotFound();

            subscription.IsDeleted = true;

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }


    public class CreateSubscriptionPlanDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MaxProfiles { get; set; }
    }

    public class UpdateSubscriptionPlanDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MaxProfiles { get; set; }
    }

    public class ExtendSubscriptionDTO
    {
        public int Days { get; set; }
    }
}