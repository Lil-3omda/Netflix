using Netflix.API.Models;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IWatchingHistoryRepository : IGenericRepository<WatchHistory>
    {
        Task<IEnumerable<WatchHistory>> GetByProfileIdAsync(int profileId);
    }
}
