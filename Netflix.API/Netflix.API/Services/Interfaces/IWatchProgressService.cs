using Netflix.API.DTOs.WatchProgressDtos;

namespace Netflix.API.Services.Interfaces
{
    public interface IWatchProgressService
    {
        Task<WatchProgressDto?> GetProgressAsync(int profileId, int videoId);
        Task<bool> UpdateProgressAsync(CreateOrUpdateWatchProgressDto dto);
    }
}
