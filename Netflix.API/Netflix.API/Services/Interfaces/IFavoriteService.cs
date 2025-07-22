using Netflix.API.DTOs.FavoriteDtos;

namespace Netflix.API.Services.Interfaces
{
    public interface IFavoriteService
    {
        Task<IEnumerable<FavoriteDto>> GetFavoritesByProfileIdAsync(int profileId);
        Task<bool> AddFavoriteAsync(AddFavoriteDto dto);
        Task<bool> RemoveFavoriteAsync(int profileId, int videoId);
    }
}
