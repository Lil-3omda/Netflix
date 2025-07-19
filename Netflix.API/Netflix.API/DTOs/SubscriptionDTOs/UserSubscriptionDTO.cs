namespace Netflix.API.DTOs.SubscriptionDTOs
{
    public class UserSubscriptionDTO
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
