using Netflix.API.DTOs;
using Netflix.API.Services.Interfaces;
using System.Text.Json;

namespace Netflix.API.Services
{
    public class PaymobService : IPaymobService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PaymobService> _logger;

        public PaymobService(HttpClient httpClient, IConfiguration configuration, ILogger<PaymobService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<string> InitiatePaymentAsync(PaymobRequestDTO request)
        {
            try
            {
                var apiKey = _configuration["Paymob:ApiKey"];
                var integrationId = _configuration["Paymob:IntegrationId"];
                var iframeId = _configuration["Paymob:IframeId"];

                // Step 1: Get auth token
                var authRequest = new { api_key = apiKey };
                var authResponse = await _httpClient.PostAsJsonAsync("https://accept.paymob.com/api/auth/tokens", authRequest);
                
                if (!authResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("Failed to get auth token from Paymob");
                    throw new Exception("Payment service unavailable");
                }

                var authResult = await authResponse.Content.ReadFromJsonAsync<AuthResponse>();

                // Step 2: Create order
                var orderRequest = new
                {
                    auth_token = authResult.token,
                    delivery_needed = false,
                    amount_cents = request.AmountCents,
                    currency = "EGP",
                    items = new object[] { }
                };

                var orderResponse = await _httpClient.PostAsJsonAsync("https://accept.paymob.com/api/ecommerce/orders", orderRequest);
                
                if (!orderResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("Failed to create order in Paymob");
                    throw new Exception("Failed to create payment order");
                }

                var orderResult = await orderResponse.Content.ReadFromJsonAsync<OrderResponse>();

                // Step 3: Get payment token
                var paymentKeyRequest = new
                {
                    auth_token = authResult.token,
                    amount_cents = request.AmountCents,
                    expiration = 3600,
                    order_id = orderResult.id,
                    billing_data = new
                    {
                        apartment = "NA",
                        email = request.Email,
                        floor = "NA",
                        first_name = request.Name,
                        street = "NA",
                        building = "NA",
                        phone_number = request.Phone,
                        shipping_method = "NA",
                        postal_code = "NA",
                        city = "Cairo",
                        country = "EG",
                        last_name = "User",
                        state = "Cairo"
                    },
                    currency = "EGP",
                    integration_id = int.Parse(integrationId)
                };

                var keyResponse = await _httpClient.PostAsJsonAsync("https://accept.paymob.com/api/acceptance/payment_keys", paymentKeyRequest);
                
                if (!keyResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("Failed to get payment key from Paymob");
                    throw new Exception("Failed to generate payment token");
                }

                var paymentKeyResult = await keyResponse.Content.ReadFromJsonAsync<PaymentKeyResponse>();

                // Return iframe URL
                return $"https://accept.paymob.com/api/acceptance/iframes/{iframeId}?payment_token={paymentKeyResult.token}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error initiating Paymob payment");
                throw;
            }
        }

        public async Task<bool> VerifyPaymentAsync(string transactionId)
        {
            try
            {
                var apiKey = _configuration["Paymob:ApiKey"];
                
                // Get auth token
                var authRequest = new { api_key = apiKey };
                var authResponse = await _httpClient.PostAsJsonAsync("https://accept.paymob.com/api/auth/tokens", authRequest);
                var authResult = await authResponse.Content.ReadFromJsonAsync<AuthResponse>();

                // Get transaction details
                var transactionResponse = await _httpClient.GetAsync($"https://accept.paymob.com/api/acceptance/transactions/{transactionId}?token={authResult.token}");
                
                if (!transactionResponse.IsSuccessStatusCode)
                {
                    return false;
                }

                var transaction = await transactionResponse.Content.ReadFromJsonAsync<JsonElement>();
                var success = transaction.GetProperty("success").GetBoolean();
                
                return success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying Paymob payment");
                return false;
            }
        }

        public async Task<PaymentStatusDTO> GetPaymentStatusAsync(string orderId)
        {
            try
            {
                var apiKey = _configuration["Paymob:ApiKey"];
                
                // Get auth token
                var authRequest = new { api_key = apiKey };
                var authResponse = await _httpClient.PostAsJsonAsync("https://accept.paymob.com/api/auth/tokens", authRequest);
                var authResult = await authResponse.Content.ReadFromJsonAsync<AuthResponse>();

                // Get order details
                var orderResponse = await _httpClient.GetAsync($"https://accept.paymob.com/api/ecommerce/orders/{orderId}?token={authResult.token}");
                
                if (!orderResponse.IsSuccessStatusCode)
                {
                    throw new Exception("Order not found");
                }

                var order = await orderResponse.Content.ReadFromJsonAsync<JsonElement>();
                
                return new PaymentStatusDTO
                {
                    Status = order.GetProperty("paid_amount_cents").GetInt32() > 0 ? "Completed" : "Pending",
                    TransactionId = order.TryGetProperty("transaction_id", out var txId) ? txId.GetString() : "",
                    Amount = order.GetProperty("amount_cents").GetDecimal() / 100,
                    Currency = order.GetProperty("currency").GetString(),
                    CreatedAt = DateTime.Parse(order.GetProperty("created_at").GetString())
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting payment status");
                throw;
            }
        }
    }
}