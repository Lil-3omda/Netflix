using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.ConversationRepository
{
    public interface IConversationRepository : IGenericRepository<Conversation>
    {
        Task<IEnumerable<Conversation>> GetByCustomerIdAsync(string customerId);
        Task<IEnumerable<Conversation>> GetAdminConversationsAsync(string? adminId = null);
        Task<Conversation?> GetWithMessagesAsync(int conversationId);
        Task AssignToAdminAsync(int conversationId, string adminId);
        Task UpdateStatusAsync(int conversationId, ConversationStatus status);
        Task<int> GetUnreadCountForAdminAsync(string adminId);
    }
}