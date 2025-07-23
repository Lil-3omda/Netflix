using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;


namespace Netflix.API.Repositories.VideoRepository
{
    public class VideoRepository:GenericRepository<Video>,IVideoRepository
    {
         ApplicationDbContext _context;
        public VideoRepository(ApplicationDbContext context):base(context)
        {
            _context = context;
        }
        //  GetPagedVideosAsync
        public async Task<List<Video>> GetPagedVideosAsync(int pageNumber, int pageSize)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .OrderByDescending(v => v.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        //  SearchAsync
        public async Task<List<Video>> SearchAsync(string keyword, int pageNumber, int pageSize)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => v.Title.Contains(keyword))
                .OrderByDescending(v => v.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        //  GetByTypeAsync
        public async Task<List<Video>> GetByTypeAsync(VideoType type, int pageNumber, int pageSize)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => v.Type == type)
                .OrderByDescending(v => v.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        //  GetTotalCountAsync
        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Videos.CountAsync();
        }
        // GetTopViewVideos
        public async Task<List<Video>> GetTopVideosByViewsAsync(int count)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .OrderByDescending(v => v.ViewCount)
                .Take(count).ToListAsync();
        }
    }
}
