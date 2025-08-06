namespace Netflix.API.DTOs.SubscriptionDTOs
{
    public class UserSubscriptionsResponse
    {
        public List<UserSubscriptionRow> Subscriptions { get; set; } = new();
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }

}
