using Netflix.API.Models;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Video> Videos { get; }
        Task<int> SaveAsync();
    }
}
