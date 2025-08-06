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
using Microsoft.AspNetCore.Authorization;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        private readonly IEmailService emailService;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration config, IMapper mapper, IEmailService emailService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
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

            // Assign default "User" role
            await EnsureRoleExists("User");
            await userManager.AddToRoleAsync(user, "User");

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
                    isEmailVerified = user.IsEmailVerified,
                    isAdmin = user.IsAdmin
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
            return random.Next(100000, 999999).ToString(); 
        }

        [HttpGet("email-exists")]
        public async Task<IActionResult> CheckEmailExists(string email)
        {
            var exists = await userManager.FindByEmailAsync(email) != null;
            return Ok(new { exists });
        }

        [HttpPost("change-role")]
        [Authorize]
        public async Task<IActionResult> ChangeUserRole(ChangeRoleDTO dto)
        {
            // Only admins can change roles
            var currentUser = await userManager.GetUserAsync(User);
            if (currentUser == null || !currentUser.IsAdmin)
            {
                return Forbid("Only administrators can change user roles");
            }

            var targetUser = await userManager.FindByIdAsync(dto.UserId);
            if (targetUser == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Ensure the target role exists
            await EnsureRoleExists(dto.NewRole);

            // Remove from current roles
            var currentRoles = await userManager.GetRolesAsync(targetUser);
            if (currentRoles.Any())
            {
                await userManager.RemoveFromRolesAsync(targetUser, currentRoles);
            }

            // Add to new role
            await userManager.AddToRoleAsync(targetUser, dto.NewRole);

            // Update IsAdmin property based on role
            targetUser.IsAdmin = dto.NewRole.Equals("Admin", StringComparison.OrdinalIgnoreCase);
            await userManager.UpdateAsync(targetUser);

            return Ok(new { 
                message = $"User role changed to {dto.NewRole} successfully",
                user = new {
                    id = targetUser.Id,
                    email = targetUser.Email,
                    fullName = targetUser.FullName,
                    role = dto.NewRole,
                    isAdmin = targetUser.IsAdmin
                }
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null || !user.IsEmailVerified)
            {
                // Don't reveal that the user doesn't exist
                return Ok(new { message = "If your email is registered, you will receive a password reset code." });
            }

            // Generate OTP for password reset
            var otpCode = GenerateOtpCode();
            user.OtpCode = otpCode;
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10);
            await userManager.UpdateAsync(user);

            // Send OTP email for password reset
            var emailSent = await emailService.SendPasswordResetOtpAsync(dto.Email, otpCode, user.FullName);
            
            return Ok(new { 
                message = "If your email is registered, you will receive a password reset code.",
                emailSent = emailSent 
            });
        }

        [HttpPost("verify-reset-otp")]
        public async Task<IActionResult> VerifyResetOtp(VerifyResetOtpDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid request" });
            }

            // Check if OTP is valid and not expired
            if (user.OtpCode != dto.OtpCode || user.OtpExpiry < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Invalid or expired OTP code" });
            }

            // Generate a temporary token for password reset
            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
            
            return Ok(new { 
                message = "OTP verified successfully",
                resetToken = resetToken,
                email = dto.Email
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid request" });
            }

            var result = await userManager.ResetPasswordAsync(user, dto.ResetToken, dto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to reset password", errors = result.Errors });
            }

            user.OtpCode = null;
            user.OtpExpiry = null;
            await userManager.UpdateAsync(user);

            return Ok(new { message = "Password reset successfully" });
        }

        private async Task EnsureRoleExists(string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        [HttpPost("make-admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> MakeUserAdmin([FromBody] MakeAdminDTO dto)
        {
            var user = await userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            if (user.IsAdmin)
            {
                return BadRequest(new { message = "User is already an admin" });
            }

            var currentRoles = await userManager.GetRolesAsync(user);
            if (currentRoles.Any())
            {
                await userManager.RemoveFromRolesAsync(user, currentRoles);
            }

            await userManager.AddToRoleAsync(user, "Admin");

            user.IsAdmin = true;
            await userManager.UpdateAsync(user);

            return Ok(new
            {
                message = "User successfully converted to admin",
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    isAdmin = user.IsAdmin
                }
            });
        }

        [HttpPost("remove-admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveAdminRole([FromBody] MakeAdminDTO dto)
        {
            var user = await userManager.FindByIdAsync(dto.UserId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            if (!user.IsAdmin)
            {
                return BadRequest(new { message = "User is not an admin" });
            }

            await userManager.RemoveFromRoleAsync(user, "Admin");

            await userManager.AddToRoleAsync(user, "User");

            user.IsAdmin = false;
            await userManager.UpdateAsync(user);

            return Ok(new
            {
                message = "Admin role removed successfully",
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.FullName,
                    isAdmin = user.IsAdmin
                }
            });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to delete user", errors = result.Errors });
            }

            return Ok(new { message = "User deleted successfully" });
        }
    }
}

public class MakeAdminDTO
{
    public string UserId { get; set; }
}


