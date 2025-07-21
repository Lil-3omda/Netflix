using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.WatchProgressDtos;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchProgressController : ControllerBase
    {
        private IWatchProgressService _watchProgressService;

        public WatchProgressController(IWatchProgressService service)
        {
            _watchProgressService = service;
        }

        [HttpGet("{profileId}/{videoId}")]
        public async Task <IActionResult> GetProgress (int profileId , int videoId)
        {
            var progress = await _watchProgressService.GetProgressAsync(profileId, videoId);
            if (progress == null)
                return NotFound(new { message = "Progress not found" });
            return Ok(new { data = progress });
        }

        [HttpPost]
        public async Task <IActionResult> UpdateProgress([FromBody] CreateOrUpdateWatchProgressDto dto)
        {
            var result = await _watchProgressService.UpdateProgressAsync(dto);
            if (result)
                return Ok(new { message = "Progress saved successfully." });
            return BadRequest(new { message = "Failed to update progress." });
        }
    }
}
