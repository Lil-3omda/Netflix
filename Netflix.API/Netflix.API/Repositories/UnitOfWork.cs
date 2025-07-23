using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.FavoriteRepository;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Repositories.VideoRepository;
using Netflix.API.Repositories.WatchProgressRepository;
using Netflix.API.Repositories.FeedBack_rating_review_;
using Netflix.API.Repositories.SubscriptionsRepository;
using Netflix.API.Repositories.WatchHistoryRepository;
namespace Netflix.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }

        public IVideoRepository Videos { get; }
        public IFavoriteRepository Favorites { get; }
        public IWatchProgressRepository WatchProgress { get; }
        public IRatingRepository Ratings { get; }
        public IReviewRepository reviews { get; }
        public ISubscriptionRepository UserSubscriptions { get; private set; }
        public IWatchingHistoryRepository WatchHistories { get; private set; }

        public UnitOfWork(
            ApplicationDbContext context,
            IVideoRepository videoRepo,
            IFavoriteRepository favoriteRepo,
            IWatchProgressRepository watchProgressRepo,
            IRatingRepository ratingRepo,
            IReviewRepository reviewRepo,
            ISubscriptionRepository subscriptionRepo,
            IWatchingHistoryRepository watchHistoryRepo)
        {
            this.context = context;
            Videos = videoRepo;
            Favorites = favoriteRepo;
            WatchProgress = watchProgressRepo;
            Ratings = ratingRepo;
            reviews = reviewRepo;
            UserSubscriptions = subscriptionRepo;
            WatchHistories = watchHistoryRepo;
        }




        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();

        public async Task<bool> CompleteAsync()  => await context.SaveChangesAsync() > 0;
        
    }
}
