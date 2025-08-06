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
using Netflix.API.Repositories.MessageRepository;
using Netflix.API.Repositories.ConversationRepository;
using Netflix.API.Repositories.Categories;
using Netflix.API.Repositories.MoviesRepository;
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
        public IMessageRepository Messages { get; private set; }
        public IConversationRepository Conversations { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IMovieRepository Movies { get; private set; }


        public UnitOfWork(
            ApplicationDbContext context,
            IVideoRepository videoRepo,
            IFavoriteRepository favoriteRepo,
            IWatchProgressRepository watchProgressRepo,
            IRatingRepository ratingRepo,
            IReviewRepository reviewRepo,
            ISubscriptionRepository subscriptionRepo,
            IWatchingHistoryRepository watchHistoryRepo,
            IMessageRepository messageRepo,
            IConversationRepository conversationRepo,
            ICategoryRepository categoryRepository,
            IMovieRepository movieRepository)
        {
            this.context = context;
            Videos = videoRepo;
            Favorites = favoriteRepo;
            WatchProgress = watchProgressRepo;
            Ratings = ratingRepo;
            reviews = reviewRepo;
            UserSubscriptions = subscriptionRepo;
            WatchHistories = watchHistoryRepo;
            Messages = messageRepo;
            Conversations = conversationRepo;
            Categories = categoryRepository;
            Movies = movieRepository;
        }




        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();

        public async Task<bool> CompleteAsync()  => await context.SaveChangesAsync() > 0;
        
    }
}
