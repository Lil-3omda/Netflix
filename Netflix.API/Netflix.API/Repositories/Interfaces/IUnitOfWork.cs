using Netflix.API.Models;
using Netflix.API.Repositories.VideoRepository;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IVideoRepository Videos { get; }
        Task<int> SaveAsync();
    }
}
