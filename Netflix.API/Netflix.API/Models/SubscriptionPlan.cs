namespace Netflix.API.Models
{
    public class SubscriptionPlan
    {
        public int Id { get; set; }
        public string Name { get; set; } // Basic, Premium, etc.
        public decimal Price { get; set; }
        public int MaxProfiles { get; set; }

        public ICollection<UserSubscription> UserSubscriptions { get; set; }
    }
}
