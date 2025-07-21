using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.FeedBack_rating_review_;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Repositories.VideoRepository;
namespace Netflix.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }

        public IVideoRepository Videos { get; }

        public IRatingRepository Ratings { get; }
        public IReviewRepository reviews { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
            Videos = new VideoRepository.VideoRepository(context);
            Ratings = new RatingRepository(context);
            reviews = new ReviewRepository(context);
        }

        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();

        public async Task<bool> CompleteAsync()  => await context.SaveChangesAsync() > 0;
        
    }
}
