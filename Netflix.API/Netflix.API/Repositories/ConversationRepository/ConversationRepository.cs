using Microsoft.EntityFrameworkCore;
using Netflix.API.Data;
using Netflix.API.Models;

namespace Netflix.API.Repositories.ConversationRepository
{
    public class ConversationRepository : GenericRepository<Conversation>, IConversationRepository
    {
        private readonly ApplicationDbContext _context;

        public ConversationRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Conversation>> GetByCustomerIdAsync(string customerId)
        {
            return await _context.Conversations
                .Include(c => c.Customer)
                .Include(c => c.AssignedAdmin)
                .Include(c => c.Messages.OrderByDescending(m => m.CreatedAt).Take(1))
                .Where(c => c.CustomerId == customerId)
                .OrderByDescending(c => c.LastMessageAt ?? c.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Conversation>> GetAdminConversationsAsync(string? adminId = null)
        {
            var query = _context.Conversations
                .Include(c => c.Customer)
                .Include(c => c.AssignedAdmin)
                .Include(c => c.Messages.OrderByDescending(m => m.CreatedAt).Take(1))
                .AsQueryable();

            if (!string.IsNullOrEmpty(adminId))
            {
                query = query.Where(c => c.AssignedAdminId == adminId);
            }

            return await query
                .OrderByDescending(c => c.LastMessageAt ?? c.CreatedAt)
                .ToListAsync();
        }

        public async Task<Conversation?> GetWithMessagesAsync(int conversationId)
        {
            return await _context.Conversations
                .Include(c => c.Customer)
                .Include(c => c.AssignedAdmin)
                .Include(c => c.Messages)
                    .ThenInclude(m => m.Sender)
                .FirstOrDefaultAsync(c => c.Id == conversationId);
        }

        public async Task AssignToAdminAsync(int conversationId, string adminId)
        {
            var conversation = await _context.Conversations.FindAsync(conversationId);
            if (conversation != null)
            {
                conversation.AssignedAdminId = adminId;
                conversation.Status = ConversationStatus.InProgress;
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateStatusAsync(int conversationId, ConversationStatus status)
        {
            var conversation = await _context.Conversations.FindAsync(conversationId);
            if (conversation != null)
            {
                conversation.Status = status;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetUnreadCountForAdminAsync(string adminId)
        {
            return await _context.Messages
                .Where(m => m.ReceiverId == adminId && m.Status != MessageStatus.Read)
                .CountAsync();
        }
    }
}