using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.FeedBack_rating_review_
{
    public class RatingRepository : GenericRepository<Rating>,IRatingRepository
    {
        ApplicationDbContext _context;
        public RatingRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Rating> GetRatingByProfileAndVideoAsync(int profileId, int videoId)
        {
            return await _context.Ratings
                .FirstOrDefaultAsync(r => r.ProfileId == profileId && r.VideoId == videoId);
        }

        public async Task<IEnumerable<Rating>> GetRatingsForVideoAsync(int videoId)
        {
            return await _context.Ratings
                .Where(r => r.VideoId == videoId)
                .Include(r => r.Profile)
                .ToListAsync();
        }
    }
}
