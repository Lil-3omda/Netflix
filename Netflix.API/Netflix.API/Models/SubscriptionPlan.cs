namespace Netflix.API.Models
{
    public class SubscriptionPlan
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public bool IsActive => EndDate >= DateTime.UtcNow;

    }
}
