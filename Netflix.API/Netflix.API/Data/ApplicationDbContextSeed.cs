using Microsoft.AspNetCore.Identity;
using Netflix.API.Models;

namespace Netflix.API.Data
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

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

            if (!context.UserSubscriptions.Any(s => s.UserId == adminUser.Id))
            {
                var defaultPlan = context.SubscriptionPlans.FirstOrDefault(p => p.Name == "Premium"); 

                if (defaultPlan != null)
                {
                    var adminSubscription = new UserSubscription
                    {
                        UserId = adminUser.Id,
                        PlanId = defaultPlan.Id,
                        StartDate = DateTime.UtcNow,
                        EndDate = DateTime.UtcNow.AddMonths(1),
                    };

                    context.UserSubscriptions.Add(adminSubscription);
                    await context.SaveChangesAsync();

                    try
                    {
                        Console.WriteLine("Attempting to create Admin profile...");

                        var profile = new Profile
                        {
                            UserId = adminUser.Id,
                            Name = "Admin",
                        };

                        context.Profiles.Add(profile);
                        await context.SaveChangesAsync();

                        Console.WriteLine("Admin profile created successfully.");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("❌ Failed to create profile: " + ex.Message);
                    }

                }
            }


            if (!context.SubscriptionPlans.Any())
            {
                var plans = new List<SubscriptionPlan>
                {
                    new SubscriptionPlan { Name = "Basic", Price = 100, MaxProfiles = 3 },
                    new SubscriptionPlan { Name = "Standard", Price = 170, MaxProfiles = 5 },
                    new SubscriptionPlan { Name = "Premium", Price = 240, MaxProfiles = 7 }
                };

                context.SubscriptionPlans.AddRange(plans);
                await context.SaveChangesAsync();
            }

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