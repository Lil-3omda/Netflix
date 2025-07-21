using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.FavoriteDtos;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetByProfileId (int profileId)
        {
            var favorites = await _favoriteService.GetFavoritesByProfileIdAsync(profileId);
            return Ok(new { data = favorites });
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody]AddFavoriteDto dto)
        {
            var added = await _favoriteService.AddFavoriteAsync(dto);
            if (!added)
                return BadRequest(new { message = "Already in favorites." });
            return Ok(new { message = "Added to favorites." });
        }

        [HttpDelete("{profileId}/{videoId}")]
        public async Task<IActionResult> RemoveFavorite(int profileId, int videoId)
        {
            var removed = await _favoriteService.RemoveFavoriteAsync(profileId, videoId);
            if (!removed)
                return NotFound(new { message = "Favorite not found." });

            return Ok(new { message = "Removed from favorites." });
        }
    }
}
