using Netflix.API.Services.Interfaces;

namespace Netflix.API.Services.BackgroundServices
{
    public class SubscriptionExpirationService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<SubscriptionExpirationService> _logger;

        public SubscriptionExpirationService(
            IServiceProvider serviceProvider,
            ILogger<SubscriptionExpirationService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    var notificationService = scope.ServiceProvider.GetRequiredService<ISubscriptionNotificationService>();
                    
                    await notificationService.CheckAndSendExpirationNotificationsAsync();
                    
                    // Run once per day at 9 AM
                    var now = DateTime.UtcNow;
                    var nextRun = now.Date.AddDays(1).AddHours(9);
                    var delay = nextRun - now;
                    
                    if (delay.TotalMilliseconds > 0)
                    {
                        await Task.Delay(delay, stoppingToken);
                    }
                    else
                    {
                        await Task.Delay(TimeSpan.FromHours(1), stoppingToken); // Fallback delay
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in subscription expiration service");
                    await Task.Delay(TimeSpan.FromHours(1), stoppingToken); // Wait before retrying
                }
            }
        }
    }
}