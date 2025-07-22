using Netflix.API.DTOs;
using Netflix.API.DTOs.WatchProgressDtos;
using Netflix.API.Models;

namespace Netflix.API.Mappings
{
    public class WatchProgressMappingProfile : AutoMapper.Profile
    {
        public WatchProgressMappingProfile()
        {
            CreateMap<WatchProgress, WatchProgressDto>();
            CreateMap<CreateOrUpdateWatchProgressDto, WatchProgress>();
        }
    }
}
