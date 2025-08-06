using Netflix.API.Data;
using Netflix.API.Models;
using Microsoft.EntityFrameworkCore;


namespace Netflix.API.Repositories.MoviesRepository
{
    public class MovieRepository : GenericRepository<Video>, IMovieRepository
    {
        private readonly ApplicationDbContext _context;

        public MovieRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Video>> GetMoviesByCategoryAsync(string categoryName, int count)
        {
            return await _context.Videos
                .Where(v => v.Category.Name == categoryName)
                .Take(count)
                .ToListAsync();
        }


    }
}
