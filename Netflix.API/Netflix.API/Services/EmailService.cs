using System.Net;
using System.Net.Mail;

namespace Netflix.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendOtpEmailAsync(string email, string otpCode, string fullName)
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

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration["Email:FromAddress"], "Netflix Team"),
                    Subject = "Your Netflix Verification Code",
                    Body = CreateOtpEmailBody(otpCode, fullName),
                    IsBodyHtml = true
                };

                mailMessage.To.Add(email);
                await smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation($"Email sent successfully to {email}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to send OTP email to {email}");
                return false;
            }
        }


        private string CreateOtpEmailBody(string otpCode, string fullName)
        {
            return $@"
                <html>
                <body style='font-family: Arial, sans-serif;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                        <h2 style='color: #e50914;'>Welcome to Netflix, {fullName}!</h2>
                        <p>Please use the following verification code to complete your registration:</p>
                        <div style='background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; margin: 20px 0;'>
                            {otpCode}
                        </div>
                        <p>This code will expire in 10 minutes.</p>
                        <p>If you didn't request this code, please ignore this email.</p>
                        <p>Thanks,<br>The Netflix Team</p>
                    </div>
                </body>
                </html>";
        }
    }
}