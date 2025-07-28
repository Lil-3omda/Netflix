namespace Netflix.API.DTOs.SubscriptionDTOs
{
    public class UserSubscriptionRow
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }

        public string UserEmail { get; set; }
        public string PlanName { get; set; }
        public decimal PlanPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public int DaysRemaining { get; set; }
    }

}
