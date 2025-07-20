using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Netflix.API.DTOs.UserDtos;
using Netflix.API.Models;
using Netflix.API.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        private readonly IEmailService emailService;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, IMapper mapper, IEmailService emailService)
        {
            this.userManager = userManager;
            this.config = config;
            this.mapper = mapper;
            this.emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            // Check if user already exists
            var existingUser = await userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return BadRequest(new { message = "User with this email already exists" });
            }

            // Create user without confirming email yet
            var user = mapper.Map<ApplicationUser>(dto);
            user.UserName = dto.Email;
            
            // Generate OTP
            var otpCode = GenerateOtpCode();
            user.OtpCode = otpCode;
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10); // OTP expires in 10 minutes
            user.IsEmailVerified = false;

            var result = await userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) 
            {
                return BadRequest(new { message = "Registration failed", errors = result.Errors });
            }

            // Send OTP email
            var emailSent = await emailService.SendOtpEmailAsync(dto.Email, otpCode, dto.FullName);
            if (!emailSent)
            {
                // If email sending fails, we should still allow the user to proceed
                // but log the error
                return Ok(new { 
                    message = "Registration successful. OTP sent to your email.", 
                    requiresVerification = true,
                    emailSent = false 
                });
            }

            return Ok(new { 
                message = "Registration successful. Please check your email for the verification code.", 
                requiresVerification = true,
                emailSent = true 
            });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp(VerifyOtpDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found" });
            }

            // Check if OTP is valid and not expired
            if (user.OtpCode != dto.OtpCode || user.OtpExpiry < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Invalid or expired OTP code" });
            }

            // Mark email as verified and clear OTP
            user.IsEmailVerified = true;
            user.EmailConfirmed = true;
            user.OtpCode = null;
            user.OtpExpiry = null;

            await userManager.UpdateAsync(user);

            // Generate JWT token for the verified user
            var token = await GenerateJwtToken(user);
            
            return Ok(new { 
                message = "Email verified successfully", 
                token = token,
                user = new {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    isEmailVerified = user.IsEmailVerified
                }
            });
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp(ResendOtpDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "User not found" });
            }

            if (user.IsEmailVerified)
            {
                return BadRequest(new { message = "Email is already verified" });
            }

            // Generate new OTP
            var otpCode = GenerateOtpCode();
            user.OtpCode = otpCode;
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10);

            await userManager.UpdateAsync(user);

            // Send OTP email
            var emailSent = await emailService.SendOtpEmailAsync(dto.Email, otpCode, user.FullName);
            
            return Ok(new { 
                message = "OTP resent successfully", 
                emailSent = emailSent 
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, dto.Password))
                return Unauthorized("Invalid credentials");

            if (!user.IsEmailVerified)
            {
                return BadRequest(new { 
                    message = "Please verify your email before logging in",
                    requiresVerification = true 
                });
            }

            var token = await GenerateJwtToken(user);
            return Ok(new { 
                token = token,
                user = new {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    isEmailVerified = user.IsEmailVerified
                }
            });
        }

        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var roles = await userManager.GetRolesAsync(user);
            authClaims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var jwtSettings = config.GetSection("JWT");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),
                claims: authClaims,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateOtpCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString(); // 6-digit OTP
        }

        [HttpGet("email-exists")]
        public async Task<IActionResult> CheckEmailExists(string email)
        {
            var exists = await userManager.FindByEmailAsync(email) != null;
            return Ok(new { exists });
        }
    }
}
