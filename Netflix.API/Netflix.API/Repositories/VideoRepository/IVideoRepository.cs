using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.VideoRepository
{
    public interface IVideoRepository : IGenericRepository<Video>
    {
        Task<List<Video>> GetPagedVideosAsync(int pageNumber, int pageSize);
        Task<List<Video>> SearchAsync(string keyword, int pageNumber, int pageSize);
        Task<List<Video>> GetByTypeAsync(VideoType type, int pageNumber, int pageSize);
        Task<int> GetTotalCountAsync();
    }
}
