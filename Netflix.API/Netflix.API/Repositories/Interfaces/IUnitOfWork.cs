using Netflix.API.Models;
using Netflix.API.Repositories.FeedBack_rating_review_;
﻿using Netflix.API.Data;
using Netflix.API.Repositories.FavoriteRepository;
using Netflix.API.Repositories.VideoRepository;
using Netflix.API.Repositories.WatchProgressRepository;
using Netflix.API.Repositories.SubscriptionsRepository;
using Netflix.API.Repositories.MessageRepository;
using Netflix.API.Repositories.ConversationRepository;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext context { get; }
        IVideoRepository Videos { get; }
        IFavoriteRepository Favorites { get; }
        IWatchProgressRepository WatchProgress { get; }
        IRatingRepository Ratings { get; }
        IReviewRepository reviews { get; }
        ISubscriptionRepository UserSubscriptions { get; }
        IWatchingHistoryRepository WatchHistories { get; }
        IMessageRepository Messages { get; }
        IConversationRepository Conversations { get; }
        Task<bool> CompleteAsync(); 
        Task<int> SaveAsync();
    }
}
