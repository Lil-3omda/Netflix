export interface Message {
  id: number;
  content: string;
  type: 'CustomerToAdmin' | 'AdminToCustomer' | 'SystemMessage';
  status: 'Sent' | 'Delivered' | 'Read';
  createdAt: string;
  readAt?: string;
  senderName?: string;
  senderId?: string;
  attachmentUrl?: string;
  attachmentType?: string;
  conversationId: number;
}

export interface Conversation {
  id: number;
  subject: string;
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastMessageAt?: string;
  customerName: string;
  customerEmail: string;
  assignedAdminId?: string;
  assignedAdminName?: string;
  priority: string;
  unreadCount: number;
  lastMessage?: Message;
  messages: Message[];
}

export interface CreateConversation {
  subject: string;
  initialMessage: string;
  priority?: string;
}

export interface CreateMessage {
  content: string;
  conversationId?: number;
  subject?: string;
  attachmentUrl?: string;
  attachmentType?: string;
}
