using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.WatchProgressRepository
{
    public interface IWatchProgressRepository : IGenericRepository<WatchProgress>
    {
        Task <WatchProgress?> GetByProfileAndVideoAsync (int profileId,int videoId);  
    }
}
