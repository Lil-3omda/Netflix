namespace Netflix.API.Services
{
    using System.Security.Cryptography;
    using System.Text;

    public static class ProfileHashingService
    {
        private const string Salt = "S3cure&Static$Salt&ProfileID&101&#_#"; 
        public static string HashProfileId(int profileId)
        {
            var combined = $"{profileId}:{Salt}";
            using var sha256 = SHA256.Create();
            var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(combined));
            return Convert.ToBase64String(hash);
        }
    }

}
