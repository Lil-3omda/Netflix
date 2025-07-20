using AutoMapper;
using Netflix.API.DTOs.VideoDTO;
using Netflix.API.Models;

namespace Netflix.API.Mappings.VideoMapping
{
    public class Videomappingprofile:AutoMapper.Profile
    {
        public Videomappingprofile()
        {
            // from DTO to Model
            CreateMap<VideoUploadDto, Video>();

            // from Model to  DTO
            CreateMap<Video, VideoResponseDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));
        }
    }
}
