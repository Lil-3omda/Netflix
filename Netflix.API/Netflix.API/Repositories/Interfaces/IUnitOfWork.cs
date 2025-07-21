using Netflix.API.Models;
using Netflix.API.Repositories.FeedBack_rating_review_;
﻿using Netflix.API.Data;
using Netflix.API.Repositories.VideoRepository;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext context { get; }
        IVideoRepository Videos { get; }
        IRatingRepository Ratings { get; }
        IReviewRepository reviews { get; }
        Task<bool> CompleteAsync(); 
        Task<int> SaveAsync();
    }
}
