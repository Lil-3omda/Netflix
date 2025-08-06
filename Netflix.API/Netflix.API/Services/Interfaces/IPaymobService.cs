using Netflix.API.DTOs;

namespace Netflix.API.Services.Interfaces
{
    public interface IPaymobService
    {
        Task<string> InitiatePaymentAsync(PaymobRequestDTO request);
        Task<bool> VerifyPaymentAsync(string transactionId);
        Task<PaymentStatusDTO> GetPaymentStatusAsync(string orderId);
    }

    public class PaymentStatusDTO
    {
        public string Status { get; set; }
        public string TransactionId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}