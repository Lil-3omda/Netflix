using AutoMapper;
using Netflix.API.DTOs.UserDtos;
using Netflix.API.Models;

public class UserProfile : AutoMapper.Profile
{
    public UserProfile()
    {
        CreateMap<RegisterDTO, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
    }
}
