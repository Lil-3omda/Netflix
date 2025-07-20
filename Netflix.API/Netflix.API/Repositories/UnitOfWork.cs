using Netflix.API.Data;
using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;
using Netflix.API.Repositories.VideoRepository;

namespace Netflix.API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }

        public IVideoRepository Videos { get; }

        public UnitOfWork(ApplicationDbContext context,IVideoRepository videorepo)
        {
            this.context = context;
            Videos = videorepo;
        }

        public async Task<int> SaveAsync() => await context.SaveChangesAsync();

        public void Dispose() => context.Dispose();
    }
}
