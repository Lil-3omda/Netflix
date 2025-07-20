namespace Netflix.API.DTOs.UserDtos
{
    public class VerifyOtpDTO
    {
        public string Email { get; set; }
        public string OtpCode { get; set; }
    }
}