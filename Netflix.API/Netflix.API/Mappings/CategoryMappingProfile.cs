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

            CreateMap<Video, VideoInCategoryDto>();

            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();
        }
    }
}
