using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Netflix.API.DTOs.ConversationDtos;
using Netflix.API.DTOs.MessageDtos;
using Netflix.API.Services.Interfaces;
using System.Security.Claims;

namespace Netflix.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationController : ControllerBase
    {
        private readonly ICommunicationService _communicationService;

        public CommunicationController(ICommunicationService communicationService)
        {
            _communicationService = communicationService;
        }

        // Conversation endpoints
        [HttpPost("conversations")]
        [Authorize]
        public async Task<IActionResult> CreateConversation([FromBody] CreateConversationDto dto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var conversation = await _communicationService.CreateConversationAsync(userId, dto);
                return Ok(conversation);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("conversations/customer")]
        [Authorize]
        public async Task<IActionResult> GetCustomerConversations()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var conversations = await _communicationService.GetCustomerConversationsAsync(userId);
            return Ok(conversations);
        }

        [HttpGet("conversations/admin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAdminConversations([FromQuery] string? adminId = null)
        {
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            

            var targetAdminId = adminId ?? currentUserId;

            var conversations = await _communicationService.GetAdminConversationsAsync(targetAdminId);
            Console.WriteLine($"Found {conversations?.Count()} conversations for admin ID: {targetAdminId}");

            return Ok(conversations);
        }

        [HttpGet("conversations/{conversationId}")]
        [Authorize]
        public async Task<IActionResult> GetConversation(int conversationId)
        {
            var conversation = await _communicationService.GetConversationWithMessagesAsync(conversationId);
            if (conversation == null)
                return NotFound(new { message = "Conversation not found" });

            return Ok(conversation);
        }

        [HttpPut("conversations/{conversationId}/assign")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignConversation(int conversationId, [FromBody] string adminId)
        {
            var success = await _communicationService.AssignConversationToAdminAsync(conversationId, adminId);
            if (!success)
                return BadRequest(new { message = "Failed to assign conversation" });

            return Ok(new { message = "Conversation assigned successfully" });
        }

        [HttpPut("conversations/{conversationId}/status")]
        [Authorize]
        public async Task<IActionResult> UpdateConversationStatus(int conversationId, [FromBody] string status)
        {
            var success = await _communicationService.UpdateConversationStatusAsync(conversationId, status);
            if (!success)
                return BadRequest(new { message = "Failed to update conversation status" });

            return Ok(new { message = "Conversation status updated successfully" });
        }

        // Message endpoints
        [HttpPost("messages")]
        [Authorize]
        public async Task<IActionResult> SendMessage([FromBody] CreateMessageDto dto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var message = await _communicationService.SendMessageAsync(userId, dto);
                return Ok(message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("conversations/{conversationId}/messages")]
        [Authorize]
        public async Task<IActionResult> GetConversationMessages(int conversationId)
        {
            var messages = await _communicationService.GetConversationMessagesAsync(conversationId);
            return Ok(messages);
        }

        [HttpPut("messages/{messageId}/read")]
        [Authorize]
        public async Task<IActionResult> MarkMessageAsRead(int messageId)
        {
            var success = await _communicationService.MarkMessageAsReadAsync(messageId);
            if (!success)
                return BadRequest(new { message = "Failed to mark message as read" });

            return Ok(new { message = "Message marked as read" });
        }

        [HttpPut("conversations/{conversationId}/read")]
        [Authorize]
        public async Task<IActionResult> MarkConversationAsRead(int conversationId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var success = await _communicationService.MarkConversationAsReadAsync(conversationId, userId);
            if (!success)
                return BadRequest(new { message = "Failed to mark conversation as read" });

            return Ok(new { message = "Conversation marked as read" });
        }

        [HttpGet("unread-count")]
        [Authorize]
        public async Task<IActionResult> GetUnreadCount()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var count = await _communicationService.GetUnreadCountAsync(userId);
            return Ok(new { unreadCount = count });
        }

        // Chatbot endpoints
        [HttpPost("chatbot")]
        [Authorize]
        public async Task<IActionResult> SendChatbotMessage([FromBody] string message)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var response = await _communicationService.ProcessChatbotMessageAsync(userId, message);
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("chatbot/response")]
        public async Task<IActionResult> GetChatbotResponse([FromBody] string message)
        {
            var response = await _communicationService.GenerateChatbotResponseAsync(message);
            return Ok(new { response });
        }
    }
}