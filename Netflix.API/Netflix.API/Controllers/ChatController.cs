using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Netflix.API.DTOs.ChatDtos;
using Netflix.API.Services.Interfaces;
using System.Security.Claims;
using Netflix.API.Exceptions;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [EnableRateLimiting("ChatPolicy")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IAiService _aiService;
        private readonly ILogger<ChatController> _logger;

        public ChatController(IChatService chatService, IAiService aiService, ILogger<ChatController> logger)
        {
            _chatService = chatService;
            _aiService = aiService;
            _logger = logger;
        }

        /// <summary>
        /// Send a message to the AI chatbot
        /// </summary>
        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody] ChatRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                if (string.IsNullOrWhiteSpace(request.Message))
                    return BadRequest(new { message = "Message cannot be empty" });

                var response = await _chatService.ProcessMessageAsync(userId, request);
                return Ok(response);
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing chat message");
                return StatusCode(500, new { message = "An error occurred while processing your message" });
            }
        }

        /// <summary>
        /// Get movie recommendations based on user's watch history
        /// </summary>
        [HttpPost("recommend")]
        public async Task<IActionResult> GetRecommendations([FromBody] RecommendationRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var recommendations = await _aiService.GenerateMovieRecommendationsAsync(userId, request.Message ?? "Recommend me some movies");
                
                return Ok(new
                {
                    recommendations = recommendations,
                    timestamp = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating recommendations");
                return StatusCode(500, new { message = "An error occurred while generating recommendations" });
            }
        }

        /// <summary>
        /// Get user's chat conversations
        /// </summary>
        [HttpGet("conversations")]
        public async Task<IActionResult> GetConversations()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var conversations = await _chatService.GetUserConversationsAsync(userId);
                return Ok(conversations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving conversations");
                return StatusCode(500, new { message = "An error occurred while retrieving conversations" });
            }
        }

        /// <summary>
        /// Get a specific conversation with messages
        /// </summary>
        [HttpGet("conversations/{conversationId}")]
        public async Task<IActionResult> GetConversation(int conversationId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var conversation = await _chatService.GetConversationAsync(userId, conversationId);
                return Ok(conversation);
            }
            catch (NotFoundException)
            {
                return NotFound(new { message = "Conversation not found" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving conversation {ConversationId}", conversationId);
                return StatusCode(500, new { message = "An error occurred while retrieving the conversation" });
            }
        }

        /// <summary>
        /// Create a new conversation
        /// </summary>
        [HttpPost("conversations")]
        public async Task<IActionResult> CreateConversation([FromBody] CreateConversationRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                if (string.IsNullOrWhiteSpace(request.InitialMessage))
                    return BadRequest(new { message = "Initial message cannot be empty" });

                var conversationId = await _chatService.CreateConversationAsync(userId, request.InitialMessage);
                
                return Ok(new { conversationId = conversationId });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating conversation");
                return StatusCode(500, new { message = "An error occurred while creating the conversation" });
            }
        }
    }

    public class RecommendationRequest
    {
        public string? Message { get; set; }
    }

    public class CreateConversationRequest
    {
        public string InitialMessage { get; set; }
    }
}