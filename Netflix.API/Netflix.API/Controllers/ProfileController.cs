using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.DTOs.ProfileDTOs;
using Netflix.API.Services;

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



        [HttpGet]
        public IActionResult GetProfiles()
        {
            var profiles = _context.Profiles.ToList();
            return Ok(profiles);
        }

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

            var newProfile = new Models.Profile
            {
                UserId = ProDTO.UserId,
                Name = ProDTO.Name
            };

            _context.Profiles.Add(newProfile);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetProfilesToUser), new { userId = ProDTO.UserId }, newProfile);
        }

        [HttpPost("create-default/{userId}")]
        public IActionResult CreateDefaultProfile([FromRoute] string userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return BadRequest(new { message = "User ID is required." });

            if (_context.Profiles.Any(p => p.UserId == userId))
            {
                return BadRequest(new { message = "User already has profiles." });
            }

            var subscription = _context.UserSubscriptions
                .Include(us => us.Plan)
                .FirstOrDefault(us => us.UserId == userId);

            if (subscription == null)
            {
                return BadRequest(new { message = "No active subscription found for this user." });
            }

            var kidsProfile = new Models.Profile
            {
                UserId = userId,
                Name = "Kids",
            };

            _context.Profiles.Add(kidsProfile);
            _context.SaveChanges();

            return Ok(new { message = "Default Kids profile created successfully." });
        }

        [HttpGet("resolve/{hash}")]
        public IActionResult ResolveProfileByHash(string hash)
        {
            var profiles = _context.Profiles.ToList();

            var matchedProfile = profiles.FirstOrDefault(p =>
                ProfileHashingService.HashProfileId(p.Id) == hash);

            if (matchedProfile == null)
                return NotFound(new { message = "Profile not found for given hash." });

            return Ok(matchedProfile);
        }

        [HttpGet("hash/{id}")]
        public IActionResult GetHashedProfileId(int id)
        {
            var profile = _context.Profiles.FirstOrDefault(p => p.Id == id);
            if (profile == null)
            {
                return NotFound(new { message = "Profile not found." });
            }

            var hashedId = ProfileHashingService.HashProfileId(profile.Id);
            return Ok(new { hashedId });
        }

    }
}
