using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.SubscriptionsRepository
{
    public interface ISubscriptionRepository:IGenericRepository<UserSubscription>
    {
        Task<IEnumerable<UserSubscription>> GetByUserIdAsync(int userId);
    }
}
