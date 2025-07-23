using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.ProfileDTOs;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/profile


        [HttpGet]
        public IActionResult GetProfiles()
        {
            var profiles = _context.Profiles.ToList();
            return Ok(profiles);
        }

        //Get : api/profile/{id}
        [HttpGet("id")]
        public IActionResult GetProfileById([FromQuery] int id)
        {
            var profile = _context.Profiles.FirstOrDefault(p => p.Id == id);
            if (profile == null)
            {
                return NotFound(new { message = $"Profile with ID: {id} not found." });
            }
            return Ok(profile);
        }

        // GET: api/profile/{id}
        [HttpGet("profile/{userId}")]
        public IActionResult GetProfilesToUser([FromRoute] string userId)
        {
            var profiles = _context.Profiles.Where(p => p.UserId == userId).ToList();

            if (!profiles.Any())
            {
                return NotFound(new { message = $"No profiles found for user ID: {userId}" });
            }

            return Ok(profiles);
        }

        // POST: api/profile
        [HttpPost]
        public IActionResult CreateProfile([FromBody] CreateProfileDTO ProDTO)
        {
            if (ProDTO == null)
                return BadRequest(new { message = "Profile data is required." });

            // Check if the profile name already exists for this user
            if (_context.Profiles.Any(p => p.UserId == ProDTO.UserId && p.Name == ProDTO.Name))
            {
                return BadRequest(new { message = "Profile with the same name already exists for this user." });
            }

            // Get active subscription
            var activeSubscription = _context.UserSubscriptions
                .Include(us => us.Plan)
                .FirstOrDefault(us => us.UserId == ProDTO.UserId && us.IsActive);

            if (activeSubscription == null)
            {
                return BadRequest(new { message = "No active subscription found for this user." });
            }

            // Check how many profiles the user already has
            int currentProfileCount = _context.Profiles.Count(p => p.UserId == ProDTO.UserId);

            if (currentProfileCount >= activeSubscription.Plan.MaxProfiles)
            {
                return BadRequest(new { message = $"Profile limit reached. Max allowed: {activeSubscription.Plan.MaxProfiles}" });
            }

            // Create and save the new profile
            var newProfile = new Models.Profile
            {
                UserId = ProDTO.UserId,
                Name = ProDTO.Name
            };

            _context.Profiles.Add(newProfile);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProfilesToUser), new { userId = ProDTO.UserId }, newProfile);
        }


    }
}
