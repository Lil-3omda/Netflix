using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.RatingDTOs;
using Netflix.API.DTOs.ReviewsDTOs;
using Netflix.API.Models;
using Netflix.API.Repositories;
using Netflix.API.Repositories.Interfaces;
using System.Net.WebSockets;

namespace Netflix.API.Controllers.Review_RatingController
{
    [Route("api/Feedbacks")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        IUnitOfWork _unitofwork;
        IMapper _mapper;
        public FeedbackController(IUnitOfWork unitofwork,IMapper mapper)
        {
            _unitofwork = unitofwork;
            _mapper = mapper;
        }
        // Rating => Add & Update 
        [Authorize]
        [HttpPost("rate")]
        public async Task<IActionResult> AddorUpdateRating([FromBody] RateUserDto dto)
        {
            var RateExist = await _unitofwork.Ratings.GetRatingByProfileAndVideoAsync(dto.ProfileId, dto.VideoId);

            if(RateExist==null)
            {
                var rating = _mapper.Map<Rating>(dto);
                await _unitofwork.Ratings.AddAsync(rating);
            }
            else
            {
                RateExist.Stars = dto.Stars;
                _unitofwork.Ratings.Update(RateExist);
            }

            var success = await _unitofwork.CompleteAsync();
            if (!success)
                return BadRequest("rating failed to save ");

            return Ok("rating submit successfully");
        }

        // Get rating 
        [HttpGet("video/{videoid}/ratings")]
        public async Task<IActionResult> GetRating(int videoid)
        {
            var ratings = await _unitofwork.Ratings.GetRatingsForVideoAsync(videoid);

            var ratingsdto=_mapper.Map<IEnumerable<RatingResponseDto>>(ratings);

            double avgrating = ratings.Any() ? ratings.Average(r => r.Stars) : 0;

            return Ok(new
            {
                AverageRating = avgrating,
                Count=ratings.Count(),
                Ratings=ratingsdto

            });

        }

        // delete rating by profileid & videoid
        [Authorize]
        [HttpDelete("rating/{profileId}/{videoId}")]
        public async Task<IActionResult> DeleteRating(int profileId ,int videoId)
        {
            var rating = await _unitofwork.Ratings.GetRatingByProfileAndVideoAsync(profileId, videoId);
            if (rating == null)
                return NotFound("rating not found");

            _unitofwork.Ratings.Delete(rating);

            var success = await _unitofwork.CompleteAsync();
            if (!success)
                return BadRequest("faild of delete rating ");

            return Ok("rating deleted successfully");
        }
        //--------------------Rview----------------

        // Reviewing => Add & Update 
        [Authorize]
        [HttpPost("review")]
        public async Task<IActionResult> AddorUpdateReview([FromBody]CreateReviewDTO dto)
        {
            var ReviewExist = await _unitofwork.reviews.GetReviewByProfileAndVideoAsync(dto.ProfileId, dto.VideoId);
            if(ReviewExist==null)
            {
                var review = _mapper.Map<Review>(dto);
                await _unitofwork.reviews.AddAsync(review);
            }
            else
            {
                ReviewExist.Comment = dto.Comment;
                _unitofwork.reviews.Update(ReviewExist);
            }
            var success = await _unitofwork.CompleteAsync();
            if (!success)
                return BadRequest("reviewing failed to save ");

            return Ok("reviewing submit successfully");
        }

        //Get reviews
        [HttpGet("video/{videoid}/reviews")]
        public async Task<IActionResult> GetReview(int videoid)
        {
            var reviews = await _unitofwork.reviews.GetReviewsForVideoAsync(videoid);
           var result= _mapper.Map<IEnumerable<ReviewDTO>>(reviews);
            return Ok(result);
        }
        // Delete review by id
        [Authorize]
        [HttpDelete("review/{reviewid}")]
        public async Task<IActionResult> DeleteReview(int reviewid)
        {
            var review = await _unitofwork.reviews.GetByIdAsync(reviewid);
            if (review == null)
                return NotFound("review not found");

            _unitofwork.reviews.Delete(review);

            var success = await _unitofwork.CompleteAsync();
            if (!success)
                return BadRequest("faild deleted review ");
            return Ok("review deleted successfully");
        }





        // fullfeedback => rating&review
        [HttpGet("video/{videoid}/Feedback")]
        public async Task<IActionResult> GetFullFeedBack(int videoid)
        {
            var rating = await _unitofwork.Ratings.GetRatingsForVideoAsync(videoid);
            var review = await _unitofwork.reviews.GetReviewsForVideoAsync(videoid);

            var ratingdto = _mapper.Map<IEnumerable<RatingResponseDto>>(rating);
            var reviewdto = _mapper.Map<IEnumerable<ReviewDTO>>(review);

            double avgrate = rating.Any() ? rating.Average(r => r.Stars) : 0;

            return Ok(new
            { 
            AverageRating=avgrate,
            Ratings=ratingdto,
            Reviews=reviewdto
            });

        }
    }
}
