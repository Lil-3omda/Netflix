using Microsoft.AspNetCore.Mvc;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Subscribe([FromBody] UserSubscription subscription)
        {
            await unitOfWork.UserSubscriptions.AddAsync(subscription);
            await unitOfWork.CompleteAsync();
            return Ok(new { message = "Subscribed successfully." });
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
