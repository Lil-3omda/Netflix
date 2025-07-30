namespace Netflix.API.DTOs.UserDtos
{
    public class VerifyResetOtpDTO
    {
        public string Email { get; set; }
        public string OtpCode { get; set; }
    }
}