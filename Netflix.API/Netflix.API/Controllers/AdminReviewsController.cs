using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.DTOs.ReviewsDTOs;
using AutoMapper;

namespace Netflix.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ReviewsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<ReviewsController> _logger;

        public ReviewsController(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ReviewsController> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var allReviews = await _unitOfWork.reviews.GetAllAsync();
                var totalCount = allReviews.Count();
                
                var pagedReviews = allReviews
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var reviewDtos = _mapper.Map<IEnumerable<ReviewDTO>>(pagedReviews);

                return Ok(new
                {
                    reviews = reviewDtos,
                    totalCount,
                    currentPage = page,
                    pageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting reviews");
                return StatusCode(500, new { message = "Failed to retrieve reviews" });
            }
        }

        [HttpGet("video/{videoId}")]
        public async Task<IActionResult> GetReviewsByVideo(int videoId)
        {
            try
            {
                var reviews = await _unitOfWork.reviews.GetReviewsForVideoAsync(videoId);
                var reviewDtos = _mapper.Map<IEnumerable<ReviewDTO>>(reviews);
                
                return Ok(reviewDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting reviews for video {VideoId}", videoId);
                return StatusCode(500, new { message = "Failed to retrieve reviews" });
            }
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            try
            {
                var review = await _unitOfWork.reviews.GetByIdAsync(reviewId);
                if (review == null)
                    return NotFound(new { message = "Review not found" });

                _unitOfWork.reviews.Delete(review);
                var success = await _unitOfWork.CompleteAsync();
                
                if (!success)
                    return BadRequest(new { message = "Failed to delete review" });

                return Ok(new { message = "Review deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting review {ReviewId}", reviewId);
                return StatusCode(500, new { message = "Failed to delete review" });
            }
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetReviewStatistics()
        {
            try
            {
                var allReviews = await _unitOfWork.reviews.GetAllAsync();
                var totalReviews = allReviews.Count();
                
                var ratingDistribution = allReviews
                    .GroupBy(r => r.Rating)
                    .ToDictionary(g => g.Key, g => g.Count());

                var averageRating = allReviews.Any() ? allReviews.Average(r => r.Rating) : 0;

                var recentReviews = allReviews
                    .OrderByDescending(r => r.CreatedAt)
                    .Take(10)
                    .ToList();

                var recentReviewDtos = _mapper.Map<IEnumerable<ReviewDTO>>(recentReviews);

                return Ok(new
                {
                    totalReviews,
                    averageRating = Math.Round(averageRating, 2),
                    ratingDistribution,
                    recentReviews = recentReviewDtos
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting review statistics");
                return StatusCode(500, new { message = "Failed to retrieve statistics" });
            }
        }

        [HttpGet("flagged")]
        public async Task<IActionResult> GetFlaggedReviews()
        {
            try
            {
                var allReviews = await _unitOfWork.reviews.GetAllAsync();
                
                // Simple content filtering - you can enhance this
                var flaggedKeywords = new[] { "spam", "fake", "terrible", "worst", "hate" };
                
                var flaggedReviews = allReviews
                    .Where(r => flaggedKeywords.Any(keyword => 
                        r.Comment.ToLower().Contains(keyword.ToLower())))
                    .ToList();

                var flaggedReviewDtos = _mapper.Map<IEnumerable<ReviewDTO>>(flaggedReviews);

                return Ok(new
                {
                    flaggedReviews = flaggedReviewDtos,
                    totalFlagged = flaggedReviews.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting flagged reviews");
                return StatusCode(500, new { message = "Failed to retrieve flagged reviews" });
            }
        }
    }
}