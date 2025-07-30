namespace Netflix.API.DTOs.SubscriptionDTOs
{
    public class ChangePlanDTO
    {
        public string UserId { get; set; }
        public int NewPlanId { get; set; }
    }
}