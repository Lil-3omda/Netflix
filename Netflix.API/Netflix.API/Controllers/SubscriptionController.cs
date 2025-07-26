using Microsoft.AspNetCore.Mvc;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Netflix.API.DTOs.SubscriptionDTOs;
using Netflix.API.DTOs.ProfileDTOs;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;

        public SubscriptionController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("plans")]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetPlans()
        {
            var plans = await unitOfWork.UserSubscriptions.GetAllAsync();
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
    }
}
