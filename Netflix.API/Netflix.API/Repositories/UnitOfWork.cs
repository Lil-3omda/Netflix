using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }

        public IGenericRepository<Video> Videos { get; }

        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;
            Videos = new GenericRepository<Video>(context);
        }

        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();
    }
}
