using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace Netflix.API.Models
{
    public class ApplicationUser:IdentityUser
    {
        public bool IsAdmin { get; set; }
        public List<Profile> Profiles { get; set; }
        public string FullName { get; set; }
        public List<Subscription> Subscriptions { get; set; }

    }
}
