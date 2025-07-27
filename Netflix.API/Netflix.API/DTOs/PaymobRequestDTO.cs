namespace Netflix.API.DTOs
{
    public class PaymobRequestDTO
    {
        public int AmountCents { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
    }

    public class AuthResponse
    {
        public string token { get; set; }
    }

    public class OrderResponse
    {
        public int id { get; set; }
    }

    public class PaymentKeyResponse
    {
        public string token { get; set; }
    }
}
