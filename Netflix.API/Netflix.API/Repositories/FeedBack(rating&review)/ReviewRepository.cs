using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.FeedBack_rating_review_
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<IEnumerable<Review>> GetAllAsync()
        {
            return await _context.Reviews
                .Include(r => r.Profile)
                .Include(r => r.Video)
                .ToListAsync();
        }

        public async Task<Review> GetReviewByProfileAndVideoAsync(int profileId, int videoId)
        {
            return await _context.Reviews
                .FirstOrDefaultAsync(r => r.ProfileId == profileId && r.VideoId == videoId);
        }


        public async Task<IEnumerable<Review>> GetReviewsForVideoAsync(int videoId)
        {
            return await _context.Reviews
                .Where(r => r.VideoId == videoId)
                .Include(r => r.Profile).ToListAsync();
        }
    }
}
