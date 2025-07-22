using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.WatchProgressRepository
{
    public class WatchProgressRepository : GenericRepository<WatchProgress>, IWatchProgressRepository
    {
        private readonly ApplicationDbContext _context;
        public WatchProgressRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<WatchProgress> GetByProfileAndVideoAsync(int profileId, int videoId)
        {
            return await _context.WatchProgresses.FirstOrDefaultAsync(wp=>wp.ProfileId == profileId && wp.VideoId == videoId);
        }
    }
}
