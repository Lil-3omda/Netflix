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
        // overRide to endpoint Getall from GenericRepository
        public override async Task<IEnumerable<Video>> GetAllAsync()
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => !v.IsDeleted)
                .ToListAsync();
        }// overRide to endpoint Getid from GenericRepository
        public override async Task<Video?> GetByIdAsync(int id)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .FirstOrDefaultAsync(v => v.Id == id );
        }


        //  GetPagedVideosAsync
        public async Task<List<Video>> GetPagedVideosAsync(int pageNumber, int pageSize)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => !v.IsDeleted)
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
                .Where(v => !v.IsDeleted && v.Title.Contains(keyword))
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
                .Where(v => !v.IsDeleted && v.Type == type)
                .OrderByDescending(v => v.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        //  GetTotalCountAsync
        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Videos.CountAsync(v => !v.IsDeleted);
        }
        // GetTopViewVideos
        public async Task<List<Video>> GetTopVideosByViewsAsync(int count)
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => !v.IsDeleted)
                .OrderByDescending(v => v.TotalView)
                .Take(count).ToListAsync();
        }
        //softDeleted
        public async Task SoftDeleteAsync(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video == null) return;

            video.IsDeleted = true;
            _context.Videos.Update(video);
        }
        // Restore Video From Delete 
        public async Task RestoreAsync(int id)
        {
            var video = await _context.Videos.FindAsync(id);
            if (video != null && video.IsDeleted)
            {
                video.IsDeleted = false;
                _context.Videos.Update(video);
            }
        }
        // Get ALL Videos Deleted 
        public async Task<List<Video>> GetDeletedVideosAsync()
        {
            return await _context.Videos
                .Include(v => v.Category)
                .Where(v => v.IsDeleted)
                .OrderByDescending(v => v.Id)
                .ToListAsync();
        }

    }
}
