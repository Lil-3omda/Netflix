namespace Netflix.API.Services.Interfaces
{
    public interface ISubscriptionNotificationService
    {
        Task SendExpirationNotificationAsync(string userId, string userEmail, string userName, DateTime expirationDate);
        Task CheckAndSendExpirationNotificationsAsync();
    }
}