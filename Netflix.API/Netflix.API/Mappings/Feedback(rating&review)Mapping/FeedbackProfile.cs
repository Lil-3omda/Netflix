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
                .ForMember(dest => dest.ProfileName, opt => opt.MapFrom(src => src.Profile.Name))
                .ForMember(dest => dest.VideoId, opt => opt.MapFrom(src => src.VideoId))
                .ForMember(dest => dest.VideoTitle, opt => opt.MapFrom(src => src.Video != null ? src.Video.Title : null));
            
            CreateMap<CreateReviewDTO, Review>();
        }
    }
}
