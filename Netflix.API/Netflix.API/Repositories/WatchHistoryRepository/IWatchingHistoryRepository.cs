using Netflix.API.Models;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IWatchingHistoryRepository : IGenericRepository<WatchHistory>
    {
        Task<IEnumerable<WatchHistory>> GetByProfileIdAsync(int profileId);
        Task<bool> IsWatchedAsync(int profileId, int videoId);
        Task<IEnumerable<string>> GetWatchedCategoriesByUserIdAsync(string userId);
        Task<IEnumerable<Video>> GetMoviesByCategoryOrderedByViewsAsync(string categoryName, int count = 10);
    }
}
