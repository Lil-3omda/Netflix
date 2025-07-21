using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.FavoriteRepository;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Repositories.VideoRepository;
using Netflix.API.Repositories.WatchProgressRepository;

namespace Netflix.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }

        public IVideoRepository Videos { get; }
        public IFavoriteRepository Favorites { get; }
        public IWatchProgressRepository WatchProgress { get; }

        public UnitOfWork(
            ApplicationDbContext context,
            IVideoRepository videorepo,
            IFavoriteRepository favoriteRepo,
            IWatchProgressRepository watchProgressRepo
            )
        {
            this.context = context;
            Videos = videorepo;
            Favorites = favoriteRepo;
            WatchProgress = watchProgressRepo;
        }

        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();
    }
}
