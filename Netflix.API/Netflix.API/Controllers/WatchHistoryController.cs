using Microsoft.AspNetCore.Mvc;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchHistoryController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;

        public WatchHistoryController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet("Profile/{profileId}")]
        public async Task<ActionResult<IEnumerable<WatchHistory>>> GetHistoryByProfile(int profileId)
        {
            var history = await unitOfWork.WatchHistories.GetByProfileIdAsync(profileId);
            return Ok(history);
        }

        [HttpPost]
        public async Task<IActionResult> AddToHistory([FromBody] WatchHistory history)
        {
            if (history == null || history.ProfileId <= 0 || history.VideoId <= 0)
                return BadRequest("Invalid watch history data.");

            await unitOfWork.WatchHistories.AddAsync(history);
            await unitOfWork.CompleteAsync();
            return Ok(history);
        }


    }
}
