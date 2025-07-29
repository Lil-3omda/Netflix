using Microsoft.AspNetCore.Mvc;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.API.DTOs.SubscriptionDTOs;
using Netflix.API.DTOs.ProfileDTOs;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ApplicationDbContext context;

        public SubscriptionController(IUnitOfWork unitOfWork, ApplicationDbContext context)
        {
            this.unitOfWork = unitOfWork;
            this.context = context;
        }

        [HttpGet("plans")]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetPlans()
        {
            var plans = await context.SubscriptionPlans.ToListAsync();
            return Ok(plans);
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] CreateUserSubscriptionDTO dto)
        {
            var subscription = new UserSubscription
            {
                UserId = dto.UserId, 
                PlanId = dto.PlanId,
                StartDate = DateTime.UtcNow, 
                EndDate = DateTime.UtcNow.AddMonths(1) 
            };

            await unitOfWork.UserSubscriptions.AddAsync(subscription);
            await unitOfWork.CompleteAsync();
            return Ok(new { message = "Subscribed successfully." });
        }
        [HttpPost("subscribe-and-bootstrap")]
        public async Task<IActionResult> SubscribeAndBootstrap([FromBody] CreateUserSubscriptionDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.UserId) || dto.PlanId <= 0)
                return BadRequest("Invalid subscription data.");

            // Step 1: Create subscription
            var subscription = new UserSubscription
            {
                UserId = dto.UserId,
                PlanId = dto.PlanId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddMonths(1)
            };

            await unitOfWork.UserSubscriptions.AddAsync(subscription);

            // Step 2: Create default profile
            var defaultProfile = new Profile
            {
                Name = "Default",
                UserId = dto.UserId
            };
            await unitOfWork.context.Profiles.AddAsync(defaultProfile);

            // Final step: Save to database
            await unitOfWork.CompleteAsync();

            return Ok(new { message = "Subscription and default profile created." });
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<UserSubscription>> GetUserSubscription(string userId)
        {
            var subscription = await unitOfWork.UserSubscriptions.GetByUserIdAsync(userId);

            if (subscription == null)
                return NotFound();

            return Ok(subscription);
        }

        [HttpGet("user-subscription/{userId}")]
        public async Task<IActionResult> GetUserSubscriptionDetails(string userId)
        {
            var subscription = await context.UserSubscriptions
                .Include(us => us.Plan)
                .FirstOrDefaultAsync(us => us.UserId == userId);

            if (subscription == null)
                return NotFound(new { message = "No subscription found for user" });

            var profileCount = await context.Profiles.CountAsync(p => p.UserId == userId);

            return Ok(new
            {
                planName = subscription.Plan.Name,
                price = subscription.Plan.Price,
                maxProfiles = subscription.Plan.MaxProfiles,
                currentProfiles = profileCount,
                nextBillingDate = subscription.EndDate,
                status = subscription.EndDate > DateTime.UtcNow ? "Active" : "Expired"
            });
        }

        [HttpPost("change-plan")]
        public async Task<IActionResult> ChangePlan([FromBody] ChangePlanDTO dto)
        {
            var subscription = await context.UserSubscriptions
                .FirstOrDefaultAsync(us => us.UserId == dto.UserId);

            if (subscription == null)
                return NotFound(new { message = "No subscription found for user" });

            var newPlan = await context.SubscriptionPlans
                .FirstOrDefaultAsync(p => p.Id == dto.NewPlanId);

            if (newPlan == null)
                return NotFound(new { message = "Plan not found" });

            // Check if downgrading and user has too many profiles
            var profileCount = await context.Profiles.CountAsync(p => p.UserId == dto.UserId);
            if (profileCount > newPlan.MaxProfiles)
            {
                return BadRequest(new { 
                    message = $"Cannot downgrade to {newPlan.Name} plan. You have {profileCount} profiles but this plan only allows {newPlan.MaxProfiles}. Please delete some profiles first." 
                });
            }

            // Update subscription
            subscription.PlanId = dto.NewPlanId;
            // Extend subscription by one month from current end date or now, whichever is later
            var baseDate = subscription.EndDate > DateTime.UtcNow ? subscription.EndDate : DateTime.UtcNow;
            subscription.EndDate = baseDate.AddMonths(1);

            await context.SaveChangesAsync();

            return Ok(new { message = "Plan changed successfully" });
        }

        [HttpPost("cancel/{userId}")]
        public async Task<IActionResult> CancelSubscription(string userId)
        {
            var subscription = await context.UserSubscriptions
                .FirstOrDefaultAsync(us => us.UserId == userId);

            if (subscription == null)
                return NotFound(new { message = "No subscription found for user" });

            // Don't delete subscription, just mark it as cancelled by not extending it
            // The subscription will remain active until the end date
            
            return Ok(new { 
                message = "Subscription cancelled successfully. Your access will remain active until " + subscription.EndDate.ToString("yyyy-MM-dd") 
            });
        }
    }
}
