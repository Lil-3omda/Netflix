using Netflix.API.DTOs.RatingDTOs;
using Netflix.API.DTOs.ReviewsDTOs;
using Netflix.API.Models;

namespace Netflix.API.Mappings.Feedback_rating_review_Mapping
{
    public class FeedbackProfile:AutoMapper.Profile
    {
        public FeedbackProfile()
        {
            // Rating Mapping
            CreateMap<Rating, RatingResponseDto>()
                .ForMember(dest => dest.ProfileName, opt => opt.MapFrom(src => src.Profile.Name));

            CreateMap<RateUserDto, Rating>();

            // Review Mapping
            CreateMap<Review, ReviewDTO>()
                .ForMember(dest => dest.ProfileName, opt => opt.MapFrom(src => src.Profile.Name));
            
            CreateMap<CreateReviewDTO, Review>();
        }
    }
}
