using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Models;


namespace Netflix.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<WatchProgress> WatchProgresses { get; set; }
        public DbSet<SubscriptionPlan> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Profile>()
                .HasOne(p => p.User)
                .WithMany(u => u.Profiles)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<SubscriptionPlan>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Favorite>()
                .HasOne(f => f.Profile)
                .WithMany(p => p.Favorites)
                .HasForeignKey(f => f.ProfileId);

            builder.Entity<Favorite>()
                .HasOne(f => f.Video)
                .WithMany(v => v.Favorites)
                .HasForeignKey(f => f.VideoId);

            builder.Entity<Rating>()
                .HasOne(r => r.Video)
                .WithMany(v => v.Ratings)
                .HasForeignKey(r => r.VideoId);

            builder.Entity<Rating>()
                .HasOne(r => r.Profile)
                .WithMany(p => p.Ratings)
                .HasForeignKey(r => r.ProfileId);

            builder.Entity<WatchProgress>()
                .HasOne(wp => wp.Profile)
                .WithMany(p => p.WatchProgresses)
                .HasForeignKey(wp => wp.ProfileId);

            builder.Entity<WatchProgress>()
                .HasOne(wp => wp.Video)
                .WithMany(v => v.WatchProgresses)
                .HasForeignKey(wp => wp.VideoId);

            builder.Entity<Video>()
                .HasOne(v => v.Category)
                .WithMany(c => c.Videos)
                .HasForeignKey(v => v.CategoryId);

            builder.Entity<Video>()
                .HasOne(v => v.UploadedByUser)
                .WithMany()
                .HasForeignKey(v => v.UploadedByUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
