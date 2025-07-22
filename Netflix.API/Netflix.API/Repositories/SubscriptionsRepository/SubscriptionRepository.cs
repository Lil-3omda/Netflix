using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.SubscriptionsRepository;

namespace Netflix.API.Repositories.SubscriptionsRepository
{
    public class SubscriptionRepository : GenericRepository<UserSubscription>, ISubscriptionRepository
    {
        private readonly ApplicationDbContext context;

        public SubscriptionRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<UserSubscription>> GetByUserIdAsync(int userId)
        {
            return await context.UserSubscriptions
                                 .Include(x => x.Plan)
                                 .Where(x => x.UserId == userId)
                                 .ToListAsync();
        }
    }
}
