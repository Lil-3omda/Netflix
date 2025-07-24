using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Repositories.Interfaces;
using System.Collections.Generic;

namespace Netflix.API.Repositories
{
    public class GenericRepository<T>:IGenericRepository<T> where T : class
    {
        private readonly ApplicationDbContext context;
        private readonly DbSet<T> dbset;

        public GenericRepository(ApplicationDbContext context)
        {
            this.context = context;
            this.dbset = context.Set<T>();
        }

        public  virtual async Task<IEnumerable<T>> GetAllAsync() => await dbset.ToListAsync();

        public virtual async Task<T?> GetByIdAsync(int id) => await dbset.FindAsync(id);


        public async Task AddAsync(T entity) => await dbset.AddAsync(entity);

        public void Update(T entity) => dbset.Update(entity);

        public void Delete(T entity) => dbset.Remove(entity);
    }
}
