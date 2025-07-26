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
                return NotFound(new { message = $"No profiles found for user ID: {userId} omda" });
            }

            return Ok(profiles);
        }

        [HttpPost]
        public IActionResult CreateProfile([FromBody] CreateProfileDTO ProDTO)
        {
            if (ProDTO == null)
                return BadRequest(new { message = "Profile data is required." });

            if (_context.Profiles.Any(p => p.UserId == ProDTO.UserId && p.Name == ProDTO.Name))
            {
                return BadRequest(new { message = "Profile with the same name already exists for this user." });
            }

            var activeSubscription = _context.UserSubscriptions
                .Include(us => us.Plan)
                .FirstOrDefault(us => us.UserId == ProDTO.UserId);

            if (activeSubscription == null)
            {
                return BadRequest(new { message = "No active subscription found for this user." });
            }

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

        [HttpPost("create-default-profiles")]
        public IActionResult CreateDefaultProfiles([FromBody] CreateDefaultProfilesDTO dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.UserId))
                return BadRequest(new { message = "User ID is required." });

            // Check if user already has profiles
            if (_context.Profiles.Any(p => p.UserId == dto.UserId))
            {
                return BadRequest(new { message = "User already has profiles." });
            }

            // Get active subscription
            var activeSubscription = _context.UserSubscriptions
                .Include(us => us.Plan)
                .FirstOrDefault(us => us.UserId == dto.UserId);

            if (activeSubscription == null)
            {
                return BadRequest(new { message = "No active subscription found for this user." });
            }

            // Create default profiles
            var defaultProfiles = new List<Models.Profile>
            {
                new Models.Profile { UserId = dto.UserId, Name = "Main Profile" },
                new Models.Profile { UserId = dto.UserId, Name = "Kids" }
            };

            // Only add profiles up to the subscription limit
            var profilesToAdd = defaultProfiles.Take(activeSubscription.Plan.MaxProfiles).ToList();

            _context.Profiles.AddRange(profilesToAdd);
            _context.SaveChanges();

            return Ok(new { message = "Default profiles created successfully.", profiles = profilesToAdd });
        }


    }
}
