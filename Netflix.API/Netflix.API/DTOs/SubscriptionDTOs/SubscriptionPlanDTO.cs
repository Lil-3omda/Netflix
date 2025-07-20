namespace Netflix.API.DTOs.SubscriptionDTOs
{
    public class SubscriptionPlanDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int MaxProfiles { get; set; }
    }
}
