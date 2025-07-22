using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.FeedBack_rating_review_
{
    public interface IRatingRepository : IGenericRepository<Rating>
    {
        Task<Rating> GetRatingByProfileAndVideoAsync(int profileId, int videoId);
        Task<IEnumerable<Rating>> GetRatingsForVideoAsync(int videoId);
    }
}
