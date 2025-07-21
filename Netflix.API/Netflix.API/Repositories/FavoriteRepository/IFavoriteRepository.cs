using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.FavoriteRepository
{
    public interface IFavoriteRepository : IGenericRepository<Favorite>
    {
        Task<IEnumerable<Favorite>> GetByProfileIdAsync(int profileId);
        Task <Favorite?> GetByProfileAndVideoAsync(int profileId,int videoId);
    }
}
