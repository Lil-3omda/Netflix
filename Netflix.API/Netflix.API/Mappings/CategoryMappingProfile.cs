using AutoMapper;
using Netflix.API.DTOs.CategoryDtos;
using Netflix.API.Models;

namespace Netflix.API.Mappings
{
    public class CategoryMappingProfile : AutoMapper.Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<Category, CategoryDto>()
                .ForMember(dest => dest.Videos, opt => opt.MapFrom(src => src.Videos));

            CreateMap<Video, VideoInCategoryDto>()
                .ForMember(dest => dest.VideoUrl, opt => opt.MapFrom(src => src.VideoUrl))
                .ForMember(dest => dest.TrailerUrl, opt => opt.MapFrom(src => src.TrailerUrl))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
                .ForMember(dest => dest.CoverUrl, opt => opt.MapFrom(src => src.CoverUrl));


            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
        }
    }
}
