using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext context { get; }
        IGenericRepository<Video> Videos { get; }
        Task<int> SaveAsync();
    }
}
