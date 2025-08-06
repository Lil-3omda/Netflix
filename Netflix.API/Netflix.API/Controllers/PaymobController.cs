using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs;
using Netflix.API.Services.Interfaces;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymobController : ControllerBase
    {
        private readonly IPaymobService _paymobService;
        private readonly ILogger<PaymobController> _logger;
        private readonly IConfiguration _configuration;


        public PaymobController(IPaymobService paymobService, ILogger<PaymobController> logger, IConfiguration configuration)
        {
            _paymobService = paymobService;
            _logger = logger;
            _configuration = configuration;
        }


        [HttpPost("initiate")]
        public async Task<IActionResult> InitiatePayment([FromBody] PaymobRequestDTO request)
        {
            try
            {
                _logger.LogInformation("Netflix Payment Request - Amount: {Amount}, Email: {Email}", 
                    request?.AmountCents, request?.Email);

                if (request == null || request.AmountCents <= 0)
                {
                    _logger.LogWarning("Invalid payment request received");
                    return BadRequest(new { message = "Invalid payment request" });
                }

                // Validate required fields
                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest(new { message = "Email is required" });
                }

                if (string.IsNullOrEmpty(request.Name))
                {
                    return BadRequest(new { message = "Name is required" });
                }

                var redirectUrl = await _paymobService.InitiatePaymentAsync(request);
                
                _logger.LogInformation("Payment initiated successfully, redirect URL generated");
                
                return Ok(new { 
                    success = true,
                    redirectUrl = redirectUrl,
                    message = "Payment initiated successfully",
                    orderId = Guid.NewGuid().ToString(),
                    amount = request.AmountCents,
                    currency = "EGP"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "💥 Netflix Payment Error - Failed to initiate payment for amount: {Amount}", 
                    request?.AmountCents);
                return StatusCode(500, new { 
                    success = false,
                    message = "Payment initiation failed",
                    error = ex.Message
                });
            }
        }

        [HttpPost("simulate-success")]
        public async Task<IActionResult> SimulatePaymentSuccess([FromBody] SimulatePaymentDTO request)
        {
            try
            {
                var isDeveloperMode = _configuration.GetValue<bool>("Paymob:DeveloperMode");
                
                if (!isDeveloperMode)
                {
                    return BadRequest(new { message = "This endpoint is only available in developer mode" });
                }

                _logger.LogInformation("Developer mode: Simulating payment success for user: {Email}", request.Email);

                
                return Ok(new {
                    success = true,
                    message = "Payment simulation successful",
                    transactionId = $"dev_txn_{Guid.NewGuid()}",
                    amount = request.AmountCents,
                    status = "Completed",
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error simulating payment success");
                return StatusCode(500, new { 
                    success = false,
                    message = "Payment simulation failed"
                });
            }
        }

        [HttpPost("verify/{transactionId}")]
        public async Task<IActionResult> VerifyPayment(string transactionId)
        {
            try
            {
                var isValid = await _paymobService.VerifyPaymentAsync(transactionId);
                
                return Ok(new { 
                    success = isValid,
                    verified = isValid,
                    message = isValid ? "Payment verified successfully" : "Payment verification failed",
                    transactionId = transactionId,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error verifying payment");
                return StatusCode(500, new { 
                    success = false,
                    message = "Payment verification failed"
                });
            }
        }

        [HttpGet("status/{orderId}")]
        public async Task<IActionResult> GetPaymentStatus(string orderId)
        {
            try
            {
                var status = await _paymobService.GetPaymentStatusAsync(orderId);
                
                return Ok(new { 
                    success = true,
                    status = status,
                    orderId = orderId,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting payment status");
                return StatusCode(500, new { 
                    success = false,
                    message = "Failed to get payment status"
                });
            }
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> PaymobWebhook([FromBody] object webhookData)
        {
            try
            {
                // Log webhook data for debugging
                _logger.LogInformation("Paymob webhook received: {WebhookData}", webhookData);
                
                // Parse webhook data
                var webhookJson = System.Text.Json.JsonSerializer.Serialize(webhookData);
                var webhookObj = System.Text.Json.JsonSerializer.Deserialize<PaymobWebhookData>(webhookJson);

                if (webhookObj?.obj?.success == true)
                {
                    _logger.LogInformation("✅ Payment successful - Order ID: {OrderId}, Amount: {Amount}", 
                        webhookObj.obj.order?.id, webhookObj.obj.amount_cents);

                    // TODO: Process successful payment
                    // 1. Find user by order details
                    // 2. Create/update subscription
                    // 3. Create default profile
                    // 4. Send confirmation email
                }
                else
                {
                    _logger.LogWarning("❌ Payment failed - Order ID: {OrderId}", webhookObj?.obj?.order?.id);
                }
                
                return Ok(new { message = "Webhook processed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing Paymob webhook");
                return StatusCode(500, new { message = "Webhook processing failed" });
            }
        }
    }

    public class SimulatePaymentDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public int AmountCents { get; set; }
        public string UserId { get; set; }
        public int PlanId { get; set; }
    }

    public class PaymobWebhookData
    {
        public string type { get; set; }
        public PaymobWebhookObj obj { get; set; }
    }

    public class PaymobWebhookObj
    {
        public int id { get; set; }
        public bool success { get; set; }
        public int amount_cents { get; set; }
        public string currency { get; set; }
        public PaymobOrder order { get; set; }
    }

    public class PaymobOrder
    {
        public int id { get; set; }
        public string merchant_order_id { get; set; }
        public int amount_cents { get; set; }
    }
}
