using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.FavoriteRepository;
using Netflix.API.Repositories.VideoRepository;
using Netflix.API.Repositories.WatchProgressRepository;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext context { get; }
        IVideoRepository Videos { get; }
        IFavoriteRepository Favorites { get; }
        IWatchProgressRepository WatchProgress { get; }
        Task<int> SaveAsync();
    }
}
