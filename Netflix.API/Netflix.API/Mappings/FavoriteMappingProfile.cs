using AutoMapper;
using Netflix.API.DTOs.FavoriteDtos;
using Netflix.API.Models;

namespace Netflix.API.Mappings
{
    public class FavoriteMappingProfile : AutoMapper.Profile
    {
        public FavoriteMappingProfile()
        {
            CreateMap<Favorite, FavoriteDto>()
                .ForMember(dest => dest.VideoTitle, opt => opt.MapFrom(src => src.Video.Title))
                .ForMember(dest => dest.VideoDescription, opt => opt.MapFrom(src => src.Video.Description))
                .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src => src.Video.VideoUrl))    
                .ForMember(dest => dest.TrailerUrl, opt => opt.MapFrom(src => src.Video.TrailerUrl))   
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Video.ImageUrl));

            CreateMap<AddFavoriteDto, Favorite>();
        }
    }
}
