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
                .ForMember(dest => dest.VideoDescription, opt => opt.MapFrom(src => src.Video.Description));

            CreateMap<AddFavoriteDto, Favorite>();
        }
    }
}
