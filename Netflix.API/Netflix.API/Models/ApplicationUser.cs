using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Netflix.API.Models
{
    public class ApplicationUser:IdentityUser
    {
        public bool IsAdmin { get; set; }
        public List<Profile> Profiles { get; set; }
        public string FullName { get; set; }
        public List<SubscriptionPlan> Subscriptions { get; set; }
        public string? OtpCode { get; set; }
        public DateTime? OtpExpiry { get; set; }
        public bool IsEmailVerified { get; set; } = false;
    }
}
