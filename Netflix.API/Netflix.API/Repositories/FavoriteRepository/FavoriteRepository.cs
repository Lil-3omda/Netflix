using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.FavoriteRepository
{
    public class FavoriteRepository : GenericRepository<Favorite>, IFavoriteRepository
    {
        private readonly ApplicationDbContext _context;

        public FavoriteRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Favorite>> GetByProfileIdAsync(int profileId)
        {
            return await _context.Favorites
                .Include(f => f.Video)
                .Where(f => f.ProfileId == profileId)
                .ToListAsync();
        }
        public async Task<Favorite?> GetByProfileAndVideoAsync(int profileId, int videoId)
        {
            return await _context.Favorites
                .FirstOrDefaultAsync(f => f.ProfileId == profileId && f.VideoId == videoId);
        }
    }
}
