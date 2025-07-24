using Netflix.API.Models;
using Netflix.API.Repositories.Interfaces;

namespace Netflix.API.Repositories.MessageRepository
{
    public interface IMessageRepository : IGenericRepository<Message>
    {
        Task<IEnumerable<Message>> GetByConversationIdAsync(int conversationId);
        Task<IEnumerable<Message>> GetUnreadMessagesAsync(string userId);
        Task MarkAsReadAsync(int messageId);
        Task MarkConversationAsReadAsync(int conversationId, string userId);
    }
}