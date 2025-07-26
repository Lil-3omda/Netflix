using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.Data;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminDashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminDashboardController(ApplicationDbContext context)
        {
            _context = context;
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
            var videos = _context.Videos;
            
            return Ok(videos);
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


    }
}
