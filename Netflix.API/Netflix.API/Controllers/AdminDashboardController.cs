using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.VideoDTO;
using Netflix.API.Models;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminDashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AdminDashboardController(ApplicationDbContext context, IWebHostEnvironment iwebHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = iwebHostEnvironment;
        }

        // GET: api/user
        [HttpGet("statistics")]
        public IActionResult GetUsers() { 
            var users = _context.Users.Count();
            var profiles = _context.Profiles.Count();
            var videos = _context.Videos.Count();
            var categories = _context.Categories.Count();
            var subscriptions = _context.UserSubscriptions.Count();
            var reviews = _context.Reviews.Count();
            return Ok(new { users = users, profiles=profiles,videos=videos, categories=categories, subscriptions=subscriptions, reviews=reviews});
        }

        // GET: api/videos
        [HttpGet("videos")]
        public IActionResult GetVideos()
        {
            var videos = _context.Videos
            .Include(v => v.Category)
            .Select(v => new
            {
                v.Id,
                v.Title,
                v.Description,
                v.VideoUrl,
                v.TrailerUrl,
                v.ImageUrl,
                v.CoverUrl,
                CategoryName = v.Category.Name,
                v.Type,
                v.Duration,
                v.Status,
                v.TotalView,
                v.IsDeleted,
                RatingsCount = v.Ratings.Count(),
                ReviewsCount = _context.Reviews.Count(r => r.VideoId == v.Id),
               
            })
            .ToList();


            return Ok(videos);
        }

        //get by id 
        [HttpGet("video/{id}")]
        public IActionResult GetVideoById([FromRoute] int id)
        {
            var video = _context.Videos.Include(v => v.Category)
            .Select(v => new
            {
                v.Id,
                v.Title,
                v.Description,
                v.VideoUrl,
                v.TrailerUrl,
                v.ImageUrl,
                v.CoverUrl,
                CategoryName = v.Category.Name,
                v.Type,
                v.Duration,
                v.Status,
                v.TotalView,
                v.IsDeleted,
                RatingsCount = v.Ratings.Count(),
                ReviewsCount = _context.Reviews.Count(r => r.VideoId == v.Id),
            })
            .FirstOrDefault(v => v.Id == id);
            if (video == null)
            {
                return NotFound(new { message = $"Video with ID: {id} not found." });
            }
            return Ok(video);
        }

        //get deleted videos
        [HttpGet("deleted-videos")]
        public IActionResult GetDeletedVideos()
        {

            var deletedVideos = _context.Videos.Include(v => v.Category)
            .Select(v => new
            {
                v.Id,
                v.Title,
                v.Description,
                v.VideoUrl,
                v.TrailerUrl,
                v.ImageUrl,
                v.CoverUrl,
                CategoryName = v.Category.Name,
                v.Type,
                v.Duration,
                v.Status,
                v.TotalView,
                v.IsDeleted,
                RatingsCount = v.Ratings.Count(),
                ReviewsCount = _context.Reviews.Count(r => r.VideoId == v.Id),

            }).Where(v => v.IsDeleted == true).ToList();
            if (deletedVideos.Count == 0)
            {
                return NotFound(new { message = "No deleted videos found." });
            }
            return Ok(deletedVideos);
        }


        //update video
        [HttpPut("video/{id}")]
        public IActionResult UpdateVideo([FromRoute] int id, [FromBody] AdminEditDTO model)
        {
            var video = _context.Videos.FirstOrDefault(v => v.Id == id);
            if (video == null)
            {
                return NotFound(new { message = $"Video with ID: {id} not found." });
            }
           
            video.Description = model.Description;
            video.TrailerUrl = model.TrailerUrl;
            video.CategoryId = model.CategoryId;
            _context.Videos.Update(video);
            _context.SaveChanges();
            return Ok(new { message = "Video updated successfully." });
        }

        //Delete video
        [HttpDelete("video/{id}")]
        public IActionResult DeleteVideo([FromRoute] int id)
        {
            var video = _context.Videos.FirstOrDefault(v => v.Id == id);
            if (video == null)
            {
                return NotFound(new { message = $"Video with ID: {id} not found." });
            }
            video.IsDeleted = true;
            _context.Videos.Update(video);
            _context.SaveChanges();
            return Ok(new { message = "Video deleted successfully." });
        }

        // Restore video
        [HttpPost("video/{id}/restore")]
        public IActionResult RestoreVideo([FromRoute] int id)
        {
            var video = _context.Videos.FirstOrDefault(v => v.Id == id);
            if (video == null)
            {
                return NotFound(new { message = $"Video with ID: {id} not found." });
            }
            video.IsDeleted = false;
            _context.Videos.Update(video);
            _context.SaveChanges();
            return Ok(new { message = "Video restored successfully." });
        }

        //Get: api/totalViews
        [HttpGet("movies/statistics")]
        public IActionResult GetTotalViews()
        {
            var videos = _context.Videos.Count();
            var ArchiveVideos=_context.Videos.Where(v=>v.IsDeleted==true).Count();
            var published=_context.Videos.Where(v => v.IsDeleted == false).Count();
            var totalViews = _context.Videos.Sum(v => v.TotalView);
            return Ok(new { totoalViews=totalViews,videosCount=videos, ArchiveVideos=ArchiveVideos, published=published } );
        }
        // GET: api/user/{id}
        [HttpGet("user/{id}")]
        public IActionResult GetUserById([FromRoute] string id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = $"User with ID: {id} not found." });
            }
            return Ok(user);
        }


        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] AdminUploadMovieDTO model)
        {
            if (model.VideoFile == null || model.ImageFile == null || model.CoverFile == null)
            {
                return BadRequest(new { message = "Video file and image file are required." });
            }

            string baseUrl = $"{Request.Scheme}://{Request.Host}";

            string videosPath = Path.Combine(_webHostEnvironment.WebRootPath, "videos");
            string imagesPath = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            string coversPath = Path.Combine(_webHostEnvironment.WebRootPath, "covers");

            Directory.CreateDirectory(videosPath);
            Directory.CreateDirectory(imagesPath);
            Directory.CreateDirectory(coversPath);

            string videoFileName = Guid.NewGuid() + Path.GetExtension(model.VideoFile.FileName);
            string imageFileName = Guid.NewGuid() + Path.GetExtension(model.ImageFile.FileName);
            string coverFileName = Guid.NewGuid() + Path.GetExtension(model.CoverFile.FileName);

            string videoFullPath = Path.Combine(videosPath, videoFileName);
            string imageFullPath = Path.Combine(imagesPath, imageFileName);
            string coverFullPath =  Path.Combine(coversPath, coverFileName);

            using (var videoStream = new FileStream(videoFullPath, FileMode.Create))
            {
                await model.VideoFile.CopyToAsync(videoStream);
            }

            using (var imageStream = new FileStream(imageFullPath, FileMode.Create))
            {
                await model.ImageFile.CopyToAsync(imageStream);
            }

            using (var coverStream = new FileStream(coverFullPath, FileMode.Create)) {
                await model.CoverFile.CopyToAsync(coverStream);
            }

            var video = new Video
            {
                Title = model.Title,
                Description = model.Description,
                VideoUrl = Path.Combine("videos", videoFileName).Replace("\\", "/"),
                TrailerUrl = model.TrailerUrl,
                ImageUrl = Path.Combine("images", imageFileName).Replace("\\", "/"),
                CoverUrl = Path.Combine("covers",coverFileName).Replace("\\", "/"),
                CategoryId = model.CategoryId,
                Type = VideoType.Movie,
                Duration = "",
                Status = "Published",
                TotalView = 0,
                IsDeleted = false,
                Ratings = new List<Rating>(),
            };

            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Video uploaded successfully",
                videoUrl = $"{baseUrl}/videos/{videoFileName}",
                imageUrl = $"{baseUrl}/images/{imageFileName}",
                coverUrl= $"{baseUrl}/covers/{coverFullPath}",
            });
        }

        //[HttpPost("upload-stream")]
        //[DisableRequestSizeLimit]
        //public async Task<IActionResult> UploadVideoStreamed(
        //    [FromQuery] string title,
        //    [FromQuery] string description,
        //    [FromQuery] string trailerUrl,
        //    [FromQuery] int categoryId,
        //    [FromQuery] string type,
        //    [FromQuery] string duration,
        //    [FromQuery] string status,
        //    [FromHeader(Name = "X-Video-File-Name")] string videoFileNameHeader,
        //    [FromHeader(Name = "X-Image-File-Name")] string imageFileNameHeader)
        //        {
        //            var form = await Request.ReadFormAsync();

        //            var video = form.Files["video"];
        //            var image = form.Files["image"];

        //            if (video == null || image == null)
        //                return BadRequest("Missing video or image file.");

        //            var videoPath = Path.Combine(_webHostEnvironment.WebRootPath, "videos");
        //            var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "images");

        //            Directory.CreateDirectory(videoPath);
        //            Directory.CreateDirectory(imagePath);

        //            var videoFileName = Guid.NewGuid() + Path.GetExtension(video.FileName);
        //            var imageFileName = Guid.NewGuid() + Path.GetExtension(image.FileName);

        //            using (var stream = new FileStream(Path.Combine(videoPath, videoFileName), FileMode.Create))
        //            {
        //                await video.CopyToAsync(stream);
        //            }

        //            using (var stream = new FileStream(Path.Combine(imagePath, imageFileName), FileMode.Create))
        //            {
        //                await image.CopyToAsync(stream);
        //            }

        //            var newVideo = new Video
        //            {
        //                Title = title,
        //                Description = description,
        //                TrailerUrl = trailerUrl,
        //                VideoUrl = Path.Combine("videos", videoFileName).Replace("\\", "/"),
        //                ImageUrl = Path.Combine("images", imageFileName).Replace("\\", "/"),
        //                CategoryId = categoryId,
        //                Type = VideoType.Movie,
        //                Duration = duration,
        //                Status = status,
        //                ViewCount = 0,
        //                TotalView = 0,
        //                IsDeleted = false
        //            };

        //            _context.Videos.Add(newVideo);
        //            await _context.SaveChangesAsync();

        //            return Ok(new
        //            {
        //                message = "Uploaded successfully",
        //                videoUrl = $"{Request.Scheme}://{Request.Host}/videos/{videoFileName}",
        //                imageUrl = $"{Request.Scheme}://{Request.Host}/images/{imageFileName}"
        //            });
        //        }


    }
}
