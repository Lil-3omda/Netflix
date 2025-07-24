using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.FeedBack_rating_review_
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Task<IEnumerable<Review>> GetReviewsForVideoAsync(int videoId);
        Task<Review?> GetReviewByProfileAndVideoAsync(int profileId, int videoId);
    }
}
