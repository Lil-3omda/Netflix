using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.VideoRepository;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext context { get; }
        IGenericRepository<Video> Videos { get; }

        IVideoRepository Videos { get; }
        Task<int> SaveAsync();
    }
}
