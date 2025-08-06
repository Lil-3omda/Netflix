using Netflix.API.DTOs;
using Netflix.API.Services.Interfaces;
using System.Text.Json;
using System.Text;

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
                var isDeveloperMode = _configuration.GetValue<bool>("Paymob:DeveloperMode");

                _logger.LogInformation("🚀 Starting Paymob payment initiation for amount: {Amount} (Developer Mode: {DevMode})", 
                    request.AmountCents, isDeveloperMode);

                // In developer mode, simulate successful payment
                if (isDeveloperMode)
                {
                    _logger.LogInformation("🔧 Developer mode: Simulating payment process");
                    
                    // Generate a fake iframe URL for testing
                    var fakeIframeUrl = $"https://accept.paymob.com/api/acceptance/iframes/{iframeId}?payment_token=fake_dev_token_{Guid.NewGuid()}";
                    
                    _logger.LogInformation("🎯 Developer mode iframe URL: {Url}", fakeIframeUrl);
                    return fakeIframeUrl;
                }

                // Step 1: Get auth token
                var authRequest = new { api_key = apiKey };
                var authJson = JsonSerializer.Serialize(authRequest);
                var authContent = new StringContent(authJson, Encoding.UTF8, "application/json");
                
                var authResponse = await _httpClient.PostAsync("https://accept.paymob.com/api/auth/tokens", authContent);
                var authResponseContent = await authResponse.Content.ReadAsStringAsync();
                
                _logger.LogInformation("📝 Auth response status: {Status}, Content: {Content}", authResponse.StatusCode, authResponseContent);
                
                if (!authResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("❌ Failed to get auth token from Paymob. Status: {Status}, Response: {Response}", 
                        authResponse.StatusCode, authResponseContent);
                    throw new Exception("Payment service unavailable");
                }

                var authResult = JsonSerializer.Deserialize<AuthResponse>(authResponseContent);
                if (authResult == null || string.IsNullOrEmpty(authResult.token))
                {
                    _logger.LogError("❌ Auth response was null or missing token. Response: {Response}", authResponseContent);
                    throw new Exception("Auth token missing from Paymob");
                }

                _logger.LogInformation("✅ Auth token received successfully");

                // Step 2: Create order
                var orderRequest = new
                {
                    auth_token = authResult.token,
                    delivery_needed = false,
                    amount_cents = request.AmountCents,
                    currency = "EGP",
                    items = new object[] { }
                };

                var orderJson = JsonSerializer.Serialize(orderRequest);
                var orderContent = new StringContent(orderJson, Encoding.UTF8, "application/json");

                var orderResponse = await _httpClient.PostAsync("https://accept.paymob.com/api/ecommerce/orders", orderContent);
                var orderResponseContent = await orderResponse.Content.ReadAsStringAsync();
                
                _logger.LogInformation("📦 Order response status: {Status}, Content: {Content}", orderResponse.StatusCode, orderResponseContent);
                
                if (!orderResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("❌ Failed to create order in Paymob. Status: {Status}, Response: {Response}", 
                        orderResponse.StatusCode, orderResponseContent);
                    throw new Exception("Failed to create payment order");
                }

                var orderResult = JsonSerializer.Deserialize<OrderResponse>(orderResponseContent);
                if (orderResult == null)
                {
                    _logger.LogError("❌ Order response was null. Response: {Response}", orderResponseContent);
                    throw new Exception("Invalid order response from Paymob");
                }

                _logger.LogInformation("✅ Order created successfully with ID: {OrderId}", orderResult.id);

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
                        email = request.Email ?? "test@example.com",
                        floor = "NA",
                        first_name = request.Name ?? "Netflix User",
                        street = "NA",
                        building = "NA",
                        phone_number = request.Phone ?? "+201000000000",
                        shipping_method = "NA",
                        postal_code = "NA",
                        city = "Cairo",
                        country = "EG",
                        last_name = "User",
                        state = "Cairo"
                    },
                    currency = "EGP",
                    integration_id = int.Parse(integrationId),
                    lock_order_when_paid = true
                };

                var paymentKeyJson = JsonSerializer.Serialize(paymentKeyRequest);
                var paymentKeyContent = new StringContent(paymentKeyJson, Encoding.UTF8, "application/json");

                _logger.LogInformation("🔑 Requesting payment key with integration ID: {IntegrationId}", integrationId);

                var keyResponse = await _httpClient.PostAsync("https://accept.paymob.com/api/acceptance/payment_keys", paymentKeyContent);
                var keyResponseContent = await keyResponse.Content.ReadAsStringAsync();
                
                _logger.LogInformation("🔑 Payment key response status: {Status}, Content: {Content}", keyResponse.StatusCode, keyResponseContent);
                
                if (!keyResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("❌ Failed to get payment key from Paymob. Status: {Status}, Response: {Response}", 
                        keyResponse.StatusCode, keyResponseContent);
                    throw new Exception("Failed to generate payment token");
                }

                var paymentKeyResult = JsonSerializer.Deserialize<PaymentKeyResponse>(keyResponseContent);
                if (paymentKeyResult == null || string.IsNullOrEmpty(paymentKeyResult.token))
                {
                    _logger.LogError("❌ Payment key response was null or missing token. Response: {Response}", keyResponseContent);
                    throw new Exception("Payment token missing from Paymob");
                }

                _logger.LogInformation("✅ Payment key generated successfully");

                // Return iframe URL
                var iframeUrl = $"https://accept.paymob.com/api/acceptance/iframes/{iframeId}?payment_token={paymentKeyResult.token}";
                _logger.LogInformation("🎯 Generated iframe URL: {Url}", iframeUrl);
                
                return iframeUrl;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "💥 Error initiating Paymob payment");
                throw;
            }
        }

        public async Task<bool> VerifyPaymentAsync(string transactionId)
        {
            try
            {
                var apiKey = _configuration["Paymob:ApiKey"];
                var isDeveloperMode = _configuration.GetValue<bool>("Paymob:DeveloperMode");

                // In developer mode, simulate successful verification
                if (isDeveloperMode)
                {
                    _logger.LogInformation("🔧 Developer mode: Simulating successful payment verification for transaction: {TransactionId}", transactionId);
                    return true;
                }
                
                // Get auth token
                var authRequest = new { api_key = apiKey };
                var authJson = JsonSerializer.Serialize(authRequest);
                var authContent = new StringContent(authJson, Encoding.UTF8, "application/json");
                
                var authResponse = await _httpClient.PostAsync("https://accept.paymob.com/api/auth/tokens", authContent);
                var authResult = await authResponse.Content.ReadFromJsonAsync<AuthResponse>();

                if (authResult == null || string.IsNullOrEmpty(authResult.token))
                {
                    _logger.LogError("Failed to get auth token for verification");
                    return false;
                }

                // Get transaction details
                var transactionResponse = await _httpClient.GetAsync($"https://accept.paymob.com/api/acceptance/transactions/{transactionId}?token={authResult.token}");
                
                if (!transactionResponse.IsSuccessStatusCode)
                {
                    _logger.LogError("Failed to get transaction details for ID: {TransactionId}", transactionId);
                    return false;
                }

                var transactionContent = await transactionResponse.Content.ReadAsStringAsync();
                var transaction = JsonSerializer.Deserialize<JsonElement>(transactionContent);
                
                var success = transaction.GetProperty("success").GetBoolean();
                
                _logger.LogInformation("Transaction {TransactionId} verification result: {Success}", transactionId, success);
                
                return success;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying Paymob payment for transaction: {TransactionId}", transactionId);
                return false;
            }
        }

        public async Task<PaymentStatusDTO> GetPaymentStatusAsync(string orderId)
        {
            try
            {
                var apiKey = _configuration["Paymob:ApiKey"];
                var isDeveloperMode = _configuration.GetValue<bool>("Paymob:DeveloperMode");

                // In developer mode, return fake successful status
                if (isDeveloperMode)
                {
                    _logger.LogInformation("🔧 Developer mode: Returning fake payment status for order: {OrderId}", orderId);
                    return new PaymentStatusDTO
                    {
                        Status = "Completed",
                        TransactionId = $"fake_txn_{orderId}",
                        Amount = 100, // Default amount for testing
                        Currency = "EGP",
                        CreatedAt = DateTime.UtcNow
                    };
                }
                
                // Get auth token
                var authRequest = new { api_key = apiKey };
                var authJson = JsonSerializer.Serialize(authRequest);
                var authContent = new StringContent(authJson, Encoding.UTF8, "application/json");
                
                var authResponse = await _httpClient.PostAsync("https://accept.paymob.com/api/auth/tokens", authContent);
                var authResult = await authResponse.Content.ReadFromJsonAsync<AuthResponse>();

                if (authResult == null || string.IsNullOrEmpty(authResult.token))
                {
                    throw new Exception("Failed to authenticate with Paymob");
                }

                // Get order details
                var orderResponse = await _httpClient.GetAsync($"https://accept.paymob.com/api/ecommerce/orders/{orderId}?token={authResult.token}");
                
                if (!orderResponse.IsSuccessStatusCode)
                {
                    throw new Exception("Order not found");
                }

                var orderContent = await orderResponse.Content.ReadAsStringAsync();
                var order = JsonSerializer.Deserialize<JsonElement>(orderContent);
                
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
                _logger.LogError(ex, "Error getting payment status for order: {OrderId}", orderId);
                throw;
            }
        }
    }
}