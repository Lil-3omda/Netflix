using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Netflix.API.Models;
using System.Reflection.Emit;

namespace Netflix.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // DbSets
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review>Reviews { get; set; }
        public DbSet<WatchProgress> WatchProgresses { get; set; }
        public DbSet<WatchHistory> WatchHistories { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<ChatConversation> ChatConversations { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }


        public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // User - Profile
            builder.Entity<Profile>()
                .HasOne(p => p.User)
                .WithMany(u => u.Profiles)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserSubscription - User
            builder.Entity<UserSubscription>()
                .HasOne(us => us.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(us => us.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserSubscription - Plan
            builder.Entity<UserSubscription>()
                .HasOne(us => us.Plan)
                .WithMany()
                .HasForeignKey(us => us.PlanId)
                .OnDelete(DeleteBehavior.Cascade);

            // Profile - Favorite
            builder.Entity<Favorite>()
                .HasOne(f => f.Profile)
                .WithMany(p => p.Favorites)
                .HasForeignKey(f => f.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            // Video - Favorite
            builder.Entity<Favorite>()
                .HasOne(f => f.Video)
                .WithMany(v => v.Favorites)
                .HasForeignKey(f => f.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Rating - Video
            builder.Entity<Rating>()
                .HasOne(r => r.Video)
                .WithMany(v => v.Ratings)
                .HasForeignKey(r => r.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Rating - Profile
            builder.Entity<Rating>()
                .HasOne(r => r.Profile)
                .WithMany(p => p.Ratings)
                .HasForeignKey(r => r.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            // WatchProgress - Profile
            builder.Entity<WatchProgress>()
                .HasOne(wp => wp.Profile)
                .WithMany(p => p.WatchProgresses)
                .HasForeignKey(wp => wp.ProfileId)
                .OnDelete(DeleteBehavior.Cascade);

            // WatchProgress - Video
            builder.Entity<WatchProgress>()
                .HasOne(wp => wp.Video)
                .WithMany(v => v.WatchProgresses)
                .HasForeignKey(wp => wp.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Video - Category
            builder.Entity<Video>()
                .HasOne(v => v.Category)
                .WithMany(c => c.Videos)
                .HasForeignKey(v => v.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // UploadedByUser - Video
            builder.Entity<Video>()
                .HasOne(v => v.UploadedByUser)
                .WithMany()
                .HasForeignKey(v => v.UploadedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<WatchHistory>()
            .HasOne(w => w.Profile)
            .WithMany(p => p.WatchHistories)
            .HasForeignKey(w => w.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<WatchHistory>()
                .HasOne(w => w.Video)
                .WithMany(v => v.WatchHistories)
                .HasForeignKey(w => w.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Conversation - Customer
            builder.Entity<Conversation>()
                .HasOne(c => c.Customer)
                .WithMany()
                .HasForeignKey(c => c.CustomerId)
                .OnDelete(DeleteBehavior.NoAction);

            // Conversation - AssignedAdmin
            builder.Entity<Conversation>()
                .HasOne(c => c.AssignedAdmin)
                .WithMany()
                .HasForeignKey(c => c.AssignedAdminId)
                .OnDelete(DeleteBehavior.NoAction);

            // Message - Conversation
            builder.Entity<Message>()
                .HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.NoAction);


            // Message - Sender
            builder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.NoAction);


            // Message - Receiver
            builder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);

            // ChatConversation - User
            builder.Entity<ChatConversation>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ChatMessage - Conversation
            builder.Entity<ChatMessage>()
                .HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);
            
        }
    }
}
