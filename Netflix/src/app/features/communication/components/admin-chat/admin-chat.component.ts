import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';
import { Conversation, Message, CreateMessage } from '../../models/conversation.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-chat-container">
      <!-- Sidebar with conversations -->
      <div class="conversations-sidebar">
        <div class="sidebar-header">
          <h3>Customer Support</h3>
          <div class="stats">
            <span class="stat-item">
              <span class="stat-number">{{ conversations.length }}</span>
              <span class="stat-label">Total</span>
            </span>
            <span class="stat-item">
              <span class="stat-number">{{ getOpenConversations() }}</span>
              <span class="stat-label">Open</span>
            </span>
          </div>
        </div>

        <div class="conversation-filters">
          <button
            class="filter-btn"
            [class.active]="selectedFilter === 'all'"
            (click)="setFilter('all')">
            All
          </button>
          <button
            class="filter-btn"
            [class.active]="selectedFilter === 'open'"
            (click)="setFilter('open')">
            Open
          </button>
          <button
            class="filter-btn"
            [class.active]="selectedFilter === 'assigned'"
            (click)="setFilter('assigned')">
            Assigned to Me
          </button>
        </div>

        <div class="conversations-list">
          <div
            class="conversation-item"
            *ngFor="let conversation of filteredConversations"
            [class.active]="selectedConversation?.id === conversation.id"
            [class.unread]="conversation.unreadCount > 0"
            (click)="selectConversation(conversation)">

            <div class="conversation-header">
              <h4>{{ conversation.customerName }}</h4>
              <span class="conversation-time">{{ formatTime(conversation.lastMessageAt || conversation.createdAt) }}</span>
            </div>

            <p class="conversation-subject">{{ conversation.subject }}</p>

            <div class="conversation-meta">
              <span class="status-badge" [class]="'status-' + conversation.status.toLowerCase()">
                {{ conversation.status }}
              </span>
              <span class="priority-badge" [class]="'priority-' + conversation.priority.toLowerCase()">
                {{ conversation.priority }}
              </span>
              <span class="unread-count" *ngIf="conversation.unreadCount > 0">
                {{ conversation.unreadCount }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat area -->
      <div class="chat-area">
        <div class="chat-header" *ngIf="selectedConversation">
          <div class="customer-info">
            <h3>{{ selectedConversation.customerName }}</h3>
            <p>{{ selectedConversation.customerEmail }}</p>
          </div>

          <div class="chat-actions">
            <select
              class="status-select"
              [value]="selectedConversation.status"
              (change)="updateStatus($event)">
              <option value="Open">Open</option>
              <option value="InProgress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <button class="action-btn" (click)="assignToMe()" *ngIf="!selectedConversation.assignedAdminName">
              Assign to Me
            </button>
          </div>
        </div>

        <div class="messages-area" *ngIf="selectedConversation">
          <div class="messages-container" #messagesContainer>
            <div
              class="message"
              *ngFor="let message of selectedConversation.messages"
              [class.customer-message]="message.type === 'CustomerToAdmin'"
              [class.admin-message]="message.type === 'AdminToCustomer'"
              [class.system-message]="message.type === 'SystemMessage'">

              <div class="message-content">
                <div class="message-header">
                  <span class="sender-name">{{ getSenderName(message) }}</span>
                  <span class="message-time">{{ formatTime(message.createdAt) }}</span>
                </div>
                <p>{{ message.content }}</p>
              </div>
            </div>
          </div>

          <div class="message-input-area">
            <div class="input-container">
              <textarea
                [(ngModel)]="replyMessage"
                placeholder="Type your reply..."
                class="reply-input"
                rows="3"
                (keydown.ctrl.enter)="sendReply()"></textarea>
              <button
                class="send-reply-btn"
                (click)="sendReply()"
                [disabled]="!replyMessage.trim() || isLoading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>

        <div class="no-conversation" *ngIf="!selectedConversation">
          <div class="no-conversation-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#666" stroke-width="2"/>
            </svg>
            <h3>Select a conversation</h3>
            <p>Choose a conversation from the sidebar to start helping customers</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-chat-container {
      display: flex;
      height: 100vh;
      background: #000;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .conversations-sidebar {
      width: 350px;
      background: #111;
      border-right: 1px solid #333;
      display: flex;
      flex-direction: column;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #333;
    }

    .sidebar-header h3 {
      margin: 0 0 15px 0;
      color: #e50914;
      font-size: 20px;
    }

    .stats {
      display: flex;
      gap: 20px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #e50914;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
    }

    .conversation-filters {
      display: flex;
      padding: 15px;
      gap: 10px;
      border-bottom: 1px solid #333;
    }

    .filter-btn {
      background: transparent;
      border: 1px solid #555;
      color: #ccc;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .filter-btn.active {
      background: #e50914;
      border-color: #e50914;
      color: white;
    }

    .conversations-list {
      flex: 1;
      overflow-y: auto;
    }

    .conversation-item {
      padding: 15px;
      border-bottom: 1px solid #222;
      cursor: pointer;
      transition: background 0.2s;
      position: relative;
    }

    .conversation-item:hover {
      background: #1a1a1a;
    }

    .conversation-item.active {
      background: #222;
      border-left: 3px solid #e50914;
    }

    .conversation-item.unread {
      background: rgba(229, 9, 20, 0.05);
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }

    .conversation-header h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }

    .conversation-time {
      font-size: 11px;
      color: #999;
    }

    .conversation-subject {
      margin: 0 0 10px 0;
      font-size: 13px;
      color: #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .conversation-meta {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .status-badge {
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 10px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .status-open { background: #28a745; }
    .status-inprogress { background: #ffc107; color: #000; }
    .status-resolved { background: #17a2b8; }
    .status-closed { background: #6c757d; }

    .priority-badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 8px;
      border: 1px solid;
    }

    .priority-low { border-color: #28a745; color: #28a745; }
    .priority-normal { border-color: #6c757d; color: #6c757d; }
    .priority-high { border-color: #ffc107; color: #ffc107; }
    .priority-urgent { border-color: #dc3545; color: #dc3545; }

    .unread-count {
      background: #e50914;
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 10px;
      font-weight: bold;
      margin-left: auto;
    }

    .chat-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .chat-header {
      padding: 20px;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #111;
    }

    .customer-info h3 {
      margin: 0;
      font-size: 18px;
    }

    .customer-info p {
      margin: 5px 0 0 0;
      color: #999;
      font-size: 14px;
    }

    .chat-actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .status-select {
      background: #333;
      border: 1px solid #555;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
    }

    .action-btn {
      background: #e50914;
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .action-btn:hover {
      background: #f40612;
    }

    .messages-area {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .messages-container {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #141414;
    }

    .message {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }

    .customer-message {
      align-items: flex-end;
    }

    .admin-message,
    .system-message {
      align-items: flex-start;
    }

    .message-content {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 12px;
      position: relative;
    }

    .customer-message .message-content {
      background: #e50914;
      color: white;
    }

    .admin-message .message-content {
      background: #333;
      color: white;
    }

    .system-message .message-content {
      background: #444;
      color: #ccc;
      font-style: italic;
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }

    .sender-name {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.8;
    }

    .message-time {
      font-size: 11px;
      opacity: 0.6;
    }

    .message-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .message-input-area {
      padding: 20px;
      background: #111;
      border-top: 1px solid #333;
    }

    .input-container {
      display: flex;
      gap: 10px;
      align-items: flex-end;
    }

    .reply-input {
      flex: 1;
      background: #333;
      border: 1px solid #555;
      border-radius: 8px;
      padding: 12px;
      color: white;
      font-size: 14px;
      resize: none;
      outline: none;
      font-family: inherit;
    }

    .reply-input::placeholder {
      color: #999;
    }

    .send-reply-btn {
      background: #e50914;
      border: none;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .send-reply-btn:hover:not(:disabled) {
      background: #f40612;
    }

    .send-reply-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .no-conversation {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #141414;
    }

    .no-conversation-content {
      text-align: center;
      color: #666;
    }

    .no-conversation-content h3 {
      margin: 20px 0 10px 0;
      color: #999;
    }

    .no-conversation-content p {
      margin: 0;
      font-size: 14px;
    }

    /* Scrollbar */
    .conversations-list::-webkit-scrollbar,
    .messages-container::-webkit-scrollbar {
      width: 4px;
    }

    .conversations-list::-webkit-scrollbar-track,
    .messages-container::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .conversations-list::-webkit-scrollbar-thumb,
    .messages-container::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 2px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .conversations-sidebar {
        width: 100%;
        position: absolute;
        z-index: 10;
        height: 100%;
      }

      .chat-area {
        display: none;
      }

      .admin-chat-container.conversation-selected .conversations-sidebar {
        display: none;
      }

      .admin-chat-container.conversation-selected .chat-area {
        display: flex;
      }
    }
  `]
})
export class AdminChatComponent implements OnInit {
  conversations: Conversation[] = [];
  filteredConversations: Conversation[] = [];
  selectedConversation: Conversation | null = null;
  selectedFilter = 'all';
  replyMessage = '';
  isLoading = false;

  constructor(
    private communicationService: CommunicationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadConversations();

    // Refresh conversations every 30 seconds
    setInterval(() => {
      this.loadConversations();
    }, 30000);
  }

  loadConversations() {
    this.communicationService.getAdminConversations().subscribe({
      next: (conversations) => {
        this.conversations = conversations;
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
      }
    });
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    switch (this.selectedFilter) {
      case 'open':
        this.filteredConversations = this.conversations.filter(c => c.status === 'Open');
        break;
      case 'assigned':
        this.filteredConversations = this.conversations.filter(c => c.assignedAdminName);
        break;
      default:
        this.filteredConversations = this.conversations;
    }
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;

    // Load full conversation with messages
    this.communicationService.getConversation(conversation.id).subscribe({
      next: (fullConversation) => {
        this.selectedConversation = fullConversation;

        // Mark as read
        this.communicationService.markConversationAsRead(conversation.id).subscribe();
      },
      error: (error) => {
        console.error('Error loading conversation:', error);
      }
    });
  }

  sendReply() {
    if (!this.replyMessage.trim() || !this.selectedConversation || this.isLoading) return;

    this.isLoading = true;
    const messageContent = this.replyMessage.trim();
    this.replyMessage = '';

    const message: CreateMessage = {
      content: messageContent,
      conversationId: this.selectedConversation.id
    };

    this.communicationService.sendMessage(message).subscribe({
      next: (newMessage) => {
        if (this.selectedConversation) {
          this.selectedConversation.messages.push(newMessage);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.replyMessage = messageContent; // Restore message on error
        this.isLoading = false;
      }
    });
  }

assignToMe() {
  if (!this.selectedConversation) return;

  const currentAdminId = this.authService.getCurrentUser()?.id;
  console.log('Assigning conversation to admin:', currentAdminId);
  if (!currentAdminId) return;

  this.communicationService.assignConversation(this.selectedConversation.id, currentAdminId).subscribe({
    next: () => {
      if (this.selectedConversation) {
        this.selectedConversation.assignedAdminName = 'You';
      }
      this.loadConversations();
    },
    error: (error) => {
      console.error('Error assigning conversation:', error);
    }
  });
}


  updateStatus(event: any) {
    if (!this.selectedConversation) return;

    const newStatus = event.target.value;

    this.communicationService.updateConversationStatus(this.selectedConversation.id, newStatus).subscribe({
      next: () => {
        if (this.selectedConversation) {
          this.selectedConversation.status = newStatus as any;
        }
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }

  getOpenConversations(): number {
    return this.conversations.filter(c => c.status === 'Open').length;
  }

  getSenderName(message: Message): string {
    if (message.type === 'SystemMessage') return 'Chatbot';
    if (message.type === 'AdminToCustomer') return message.senderName || 'Admin';
    return message.senderName || 'Customer';
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  }
}
