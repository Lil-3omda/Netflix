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

        public PaymobController(IPaymobService paymobService, ILogger<PaymobController> logger)
        {
            _paymobService = paymobService;
            _logger = logger;
        }

        [HttpPost("initiate")]
        public async Task<IActionResult> InitiatePayment([FromBody] PaymobRequestDTO request)
        {
            try
            {
                _logger.LogInformation("🎬 Netflix Payment Request - Amount: {Amount}, Email: {Email}", 
                    request?.AmountCents, request?.Email);

                if (request == null || request.AmountCents <= 0)
                {
                    _logger.LogWarning("❌ Invalid payment request received");
                    return BadRequest(new { message = "Invalid payment request" });
                }

                var redirectUrl = await _paymobService.InitiatePaymentAsync(request);
                
                _logger.LogInformation("✅ Payment initiated successfully, redirect URL generated");
                
                return Ok(new { 
                    success = true,
                    redirectUrl = redirectUrl,
                    message = "Payment initiated successfully"
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

        [HttpPost("verify/{transactionId}")]
        public async Task<IActionResult> VerifyPayment(string transactionId)
        {
            try
            {
                var isValid = await _paymobService.VerifyPaymentAsync(transactionId);
                
                return Ok(new { 
                    success = isValid,
                    verified = isValid,
                    message = isValid ? "Payment verified successfully" : "Payment verification failed"
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
                    status = status
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
                
                // Process webhook data here
                // Update subscription status, send confirmation emails, etc.
                
                return Ok(new { message = "Webhook processed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing Paymob webhook");
                return StatusCode(500, new { message = "Webhook processing failed" });
            }
        }
    }
}
