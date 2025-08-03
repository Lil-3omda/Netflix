using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.MoviesRepository
{
    public interface IMovieRepository : IGenericRepository<Video>
    {
        Task<IEnumerable<Video>> GetMoviesByCategoryAsync(string categoryName, int count);

    }
}
