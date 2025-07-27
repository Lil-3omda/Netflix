using Microsoft.AspNetCore.Identity;
using Netflix.API.Models;

namespace Netflix.API.Data
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed Roles
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            // Seed Admin User
            var adminEmail = "admin@netflix.com";
            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            
            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    FullName = "Netflix Admin",
                    IsAdmin = true,
                    IsEmailVerified = true,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(adminUser, "Admin123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            // Seed Subscription Plans
            if (!context.SubscriptionPlans.Any())
            {
                var plans = new List<SubscriptionPlan>
                {
                    new SubscriptionPlan { Name = "Basic", Price = 100, MaxProfiles = 1 },
                    new SubscriptionPlan { Name = "Standard", Price = 170, MaxProfiles = 2 },
                    new SubscriptionPlan { Name = "Premium", Price = 240, MaxProfiles = 4 }
                };

                context.SubscriptionPlans.AddRange(plans);
                await context.SaveChangesAsync();
            }

            // Seed Categories
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category { Name = "Action" },
                    new Category { Name = "Comedy" },
                    new Category { Name = "Drama" },
                    new Category { Name = "Horror" },
                    new Category { Name = "Romance" },
                    new Category { Name = "Sci-Fi" },
                    new Category { Name = "Documentary" },
                    new Category { Name = "Kids" }
                };

                context.Categories.AddRange(categories);
                await context.SaveChangesAsync();
            }
        }
    }
}