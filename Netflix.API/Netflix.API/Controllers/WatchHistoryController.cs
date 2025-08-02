using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netflix.API.DTOs;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Repositories.WatchHistoryRepository;

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
        public async Task<ActionResult<IEnumerable<WatchHistoryDTO>>> GetHistoryByProfile(int profileId)
        {
            var histories = await unitOfWork.WatchHistories.GetByProfileIdAsync(profileId);

            var result = histories.Select(h => new WatchHistoryDTO
            {
                VideoId = h.VideoId,
                Title = h.Video.Title,
                WatchedAt = h.WatchedAt,
                ImagerUrl = h.Video.ImageUrl,
                CoverUrl= h.Video.CoverUrl
            });

            return Ok(result);
        }

        [HttpGet("isWatched")]
        public async Task<IActionResult> IsMovieWatched(int profileId, int videoId)
        {
            var alreadyWatched = await unitOfWork.WatchHistories.IsWatchedAsync(profileId, videoId);
            return Ok(alreadyWatched);
        }

        [HttpPost]
        public async Task<IActionResult> AddToHistory([FromBody] AddWatchHistoryDTO dto)
        {
            if (dto == null || dto.ProfileId <= 0 || dto.VideoId <= 0)
                return BadRequest("Invalid watch history data.");

            var watchHistory = new WatchHistory
            {
                ProfileId = dto.ProfileId,
                VideoId = dto.VideoId,
                WatchedAt = dto.WatchedAt
            };

            await unitOfWork.WatchHistories.AddAsync(watchHistory);
            await unitOfWork.CompleteAsync();

            return Ok(new { message = "Watch history added successfully." });
        }

        [HttpGet("PersonalizedCategories/{userId}")]
        public async Task<IActionResult> GetPersonalizedCategories(string userId)
        {
            var watchedCategories = await unitOfWork.WatchHistories.GetWatchedCategoriesByUserIdAsync(userId);
            return Ok(watchedCategories);
        }

        [HttpGet("PersonalizedHomepage/{userId}")]
        public async Task<IActionResult> GetPersonalizedHomepage(string userId)
        {
            var watchedCategories = await unitOfWork.WatchHistories.GetWatchedCategoriesByUserIdAsync(userId);
            
            var personalizedSections = new List<object>();

            foreach (var category in watchedCategories)
            {
                var movies = await unitOfWork.WatchHistories.GetMoviesByCategoryOrderedByViewsAsync(category, 10);
                
                if (movies.Any())
                {
                    personalizedSections.Add(new
                    {
                        name = category,
                        videos = movies.Select(m => new
                        {
                            id = m.Id,
                            title = m.Title,
                            description = m.Description,
                            imageUrl = m.ImageUrl,
                            coverUrl = m.CoverUrl,
                            duration = m.Duration,
                            totalView = m.TotalView,
                            trailerUrl = m.TrailerUrl,
                            categoryName = m.Category?.Name
                        })
                    });
                }
            }

            return Ok(personalizedSections);
        }
    }
}
