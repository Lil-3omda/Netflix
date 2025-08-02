using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Services.Interfaces;
using System.Net;
using System.Net.Mail;

namespace Netflix.API.Services
{
    public class SubscriptionNotificationService : ISubscriptionNotificationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<SubscriptionNotificationService> _logger;

        public SubscriptionNotificationService(
            ApplicationDbContext context,
            IConfiguration configuration,
            ILogger<SubscriptionNotificationService> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendExpirationNotificationAsync(string userId, string userEmail, string userName, DateTime expirationDate)
        {
            try
            {
                var smtpClient = new SmtpClient(_configuration["Email:SmtpHost"])
                {
                    Port = int.Parse(_configuration["Email:SmtpPort"]),
                    Credentials = new NetworkCredential(
                        _configuration["Email:Username"],
                        _configuration["Email:Password"]),
                    EnableSsl = true
                };

                var renewalLink = $"{_configuration["Frontend:BaseUrl"]}/signup?step=4&userId={userId}&renewal=true";

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Email:FromAddress"], "Netflix Team"),
                    Subject = "Your Netflix Subscription is Expiring Soon",
                    Body = CreateExpirationEmailBody(userName, expirationDate, renewalLink),
                    IsBodyHtml = true
                };

                mailMessage.To.Add(userEmail);
                await smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Expiration notification sent successfully to {userEmail}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send expiration notification to {userEmail}");
            }
        }

        public async Task CheckAndSendExpirationNotificationsAsync()
        {
            try
            {
                // Get subscriptions expiring in 3 days
                var threeDaysFromNow = DateTime.UtcNow.AddDays(3);
                var startOfDay = threeDaysFromNow.Date;
                var endOfDay = startOfDay.AddDays(1).AddTicks(-1);

                var expiringSubscriptions = await _context.UserSubscriptions
                    .Include(us => us.User)
                    .Include(us => us.Plan)
                    .Where(us => !us.IsDeleted && 
                                us.EndDate >= startOfDay && 
                                us.EndDate <= endOfDay)
                    .ToListAsync();

                foreach (var subscription in expiringSubscriptions)
                {
                    await SendExpirationNotificationAsync(
                        subscription.UserId,
                        subscription.User.Email,
                        subscription.User.FullName,
                        subscription.EndDate);
                }

                _logger.LogInformation($"Processed {expiringSubscriptions.Count} expiration notifications");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking and sending expiration notifications");
            }
        }

        private string CreateExpirationEmailBody(string userName, DateTime expirationDate, string renewalLink)
        {
            return $@"
                <html>
                <body style='font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 20px;'>
                    <div style='max-width: 600px; margin: 0 auto; background-color: #141414; padding: 40px; border-radius: 8px;'>
                        <div style='text-align: center; margin-bottom: 30px;'>
                            <h1 style='color: #e50914; font-size: 28px; margin-bottom: 10px;'>NETFLIX</h1>
                            <h2 style='color: #fff; font-size: 24px; margin: 0;'>Your subscription is expiring soon</h2>
                        </div>
                        
                        <div style='margin-bottom: 30px;'>
                            <p style='font-size: 18px; margin-bottom: 20px;'>Hi {userName},</p>
                            <p style='font-size: 16px; line-height: 1.6; margin-bottom: 20px;'>
                                Your Netflix subscription will expire on <strong>{expirationDate:MMMM dd, yyyy}</strong>. 
                                Don't miss out on your favorite shows and movies!
                            </p>
                            <p style='font-size: 16px; line-height: 1.6; margin-bottom: 30px;'>
                                Renew your subscription now to continue enjoying unlimited streaming.
                            </p>
                        </div>

                        <div style='text-align: center; margin-bottom: 30px;'>
                            <a href='{renewalLink}' 
                               style='background-color: #e50914; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-size: 18px; font-weight: bold; display: inline-block;'>
                                Renew Subscription
                            </a>
                        </div>

                        <div style='background-color: #222; padding: 20px; border-radius: 8px; margin-bottom: 20px;'>
                            <h3 style='color: #e50914; margin-bottom: 15px;'>Why continue with Netflix?</h3>
                            <ul style='list-style: none; padding: 0; margin: 0;'>
                                <li style='margin-bottom: 10px;'>✓ Unlimited movies and TV shows</li>
                                <li style='margin-bottom: 10px;'>✓ Watch on any device</li>
                                <li style='margin-bottom: 10px;'>✓ No ads, no commitments</li>
                                <li style='margin-bottom: 10px;'>✓ New content added regularly</li>
                            </ul>
                        </div>

                        <div style='text-align: center; font-size: 14px; color: #999;'>
                            <p>If you have any questions, visit our <a href='#' style='color: #e50914;'>Help Center</a></p>
                            <p>Thanks,<br>The Netflix Team</p>
                        </div>
                    </div>
                </body>
                </html>";
        }
    }
}