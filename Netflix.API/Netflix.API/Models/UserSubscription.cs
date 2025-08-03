using System.ComponentModel.DataAnnotations.Schema;
namespace Netflix.API.Models
{
    public class UserSubscription
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("Plan")]
        public int PlanId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsActive => DateTime.UtcNow >= StartDate && DateTime.UtcNow <= EndDate;

        public ApplicationUser User { get; set; }
        public SubscriptionPlan Plan { get; set; }

        //[NotMapped]
        //public ICollection<UserSubscription> UserSubscriptions { get; set; }
    }
}
