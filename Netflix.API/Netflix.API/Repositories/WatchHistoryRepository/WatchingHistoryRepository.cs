using Netflix.API.Data;
using Netflix.API.Models;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.WatchHistoryRepository
{
    public class WatchingHistoryRepository : GenericRepository<WatchHistory>, IWatchingHistoryRepository
    {
        private readonly ApplicationDbContext context;

        public WatchingHistoryRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<WatchHistory>> GetByProfileIdAsync(int profileId)
        {
            return await context.WatchHistories
                                 .Include(w => w.Video)
                                 .Where(w => w.ProfileId == profileId)
                                 .OrderByDescending(w => w.WatchedAt)
                                 .ToListAsync();
        }
        public async Task<bool> IsWatchedAsync(int profileId, int videoId)
        {
            return await context.WatchHistories
                                .AnyAsync(h => h.ProfileId == profileId && h.VideoId == videoId);
        }
    }
}
