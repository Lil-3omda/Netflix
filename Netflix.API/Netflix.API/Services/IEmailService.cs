namespace Netflix.API.Services
{
    public interface IEmailService
    {
        Task<bool> SendOtpEmailAsync(string email, string otpCode, string fullName);
    }
}