import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatMessage } from '../../models/movie.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <div class="chat-header">
        <h1>Multi-Platform Chat Support</h1>
        <div class="platform-badges">
          <span class="platform-badge whatsapp">WhatsApp</span>
          <span class="platform-badge telegram">Telegram</span>
          <span class="platform-badge webchat">Web Chat</span>
          <span class="platform-badge facebook">Facebook</span>
        </div>
      </div>

      <div class="chat-layout">
        <div class="chat-sidebar">
          <h3>Active Conversations ({{chatMessages.length}})</h3>
          <div class="conversation-list">
            <div *ngFor="let message of chatMessages"
                 class="conversation-item"
                 [class.selected]="selectedMessage?.id === message.id"
                 (click)="selectMessage(message)">
              <div class="conversation-header">
                <span class="user-name">{{message.userName}}</span>
                <span class="platform-icon" [class]="'platform-' + message.platform">
                  {{getPlatformIcon(message.platform)}}
                </span>
              </div>
              <div class="conversation-preview">{{message.message | slice:0:50}}...</div>
              <div class="conversation-meta">
                <span class="time">{{message.timestamp | date:'short'}}</span>
                <span class="status" [class]="'status-' + message.status">{{message.status}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-main">
          <div *ngIf="selectedMessage" class="chat-window">
            <div class="chat-window-header">
              <div class="user-info">
                <h3>{{selectedMessage.userName}}</h3>
                <span class="platform">via {{selectedMessage.platform}}</span>
              </div>
              <div class="chat-actions">
                <button (click)="escalateToAdmin()" class="escalate-btn">Escalate to Admin</button>
                <button (click)="markResolved()" class="resolve-btn">Mark Resolved</button>
              </div>
            </div>

            <div class="chat-messages">
              <div class="message user-message">
                <div class="message-content">{{selectedMessage.message}}</div>
                <div class="message-time">{{selectedMessage.timestamp | date:'short'}}</div>
              </div>

              <div *ngIf="botResponse" class="message bot-message">
                <div class="message-content">{{botResponse}}</div>
                <div class="message-time">Now</div>
              </div>
            </div>

            <div class="chat-input">
              <textarea [(ngModel)]="responseMessage"
                        placeholder="Type your response..."
                        (keydown.enter)="sendResponse($event)"></textarea>
              <button (click)="sendResponse()" class="send-btn">Send</button>
            </div>
          </div>

          <div *ngIf="!selectedMessage" class="no-selection">
            <div class="no-selection-content">
              <h3>Select a conversation to start chatting</h3>
              <p>Choose from the active conversations on the left to view and respond to customer messages.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="chatbot-panel">
        <h3>AI Chatbot Integration</h3>
        <div class="chatbot-settings">
          <div class="setting-item">
            <label>
              <input type="checkbox" [(ngModel)]="autoBotResponse" />
              Enable automatic bot responses
            </label>
          </div>

          <div class="setting-item">
            <label>
              <input type="checkbox" [(ngModel)]="movieSearchEnabled" />
              Enable movie search functionality
            </label>
          </div>

          <div class="platform-integrations">
            <h4>Platform Integrations</h4>
            <div class="integration-buttons">
              <button (click)="integratePlatform('whatsapp')" class="integration-btn whatsapp">
                Connect WhatsApp Business
              </button>
              <button (click)="integratePlatform('telegram')" class="integration-btn telegram">
                Connect Telegram Bot
              </button>
              <button (click)="integratePlatform('facebook')" class="integration-btn facebook">
                Connect Facebook Messenger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .chat-header h1 {
      margin: 0;
      color: #E50914;
    }

    .platform-badges {
      display: flex;
      gap: 10px;
    }

    .platform-badge {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .platform-badge.whatsapp {
      background: #25D366;
      color: white;
    }

    .platform-badge.telegram {
      background: #0088cc;
      color: white;
    }

    .platform-badge.webchat {
      background: #E50914;
      color: white;
    }

    .platform-badge.facebook {
      background: #1877f2;
      color: white;
    }

    .chat-layout {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 20px;
      height: 600px;
    }

    .chat-sidebar {
      background: #1a1a1a;
      border-radius: 12px;
      border: 1px solid #333;
      overflow: hidden;
    }

    .chat-sidebar h3 {
      padding: 20px;
      margin: 0;
      background: #2a2a2a;
      color: #E50914;
      font-size: 1rem;
    }

    .conversation-list {
      max-height: 550px;
      overflow-y: auto;
    }

    .conversation-item {
      padding: 15px 20px;
      border-bottom: 1px solid #333;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .conversation-item:hover {
      background: rgba(229, 9, 20, 0.1);
    }

    .conversation-item.selected {
      background: rgba(229, 9, 20, 0.2);
      border-left: 3px solid #E50914;
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .platform-icon {
      font-size: 1.2rem;
    }

    .conversation-preview {
      color: #ccc;
      font-size: 0.8rem;
      margin-bottom: 8px;
    }

    .conversation-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
    }

    .time {
      color: #999;
    }

    .status {
      padding: 2px 6px;
      border-radius: 8px;
      font-weight: 500;
    }

    .status-pending {
      background: #f59e0b;
      color: white;
    }

    .status-responded {
      background: #22c55e;
      color: white;
    }

    .status-escalated {
      background: #ef4444;
      color: white;
    }

    .chat-main {
      background: #1a1a1a;
      border-radius: 12px;
      border: 1px solid #333;
      overflow: hidden;
    }

    .chat-window {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .chat-window-header {
      padding: 20px;
      background: #2a2a2a;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user-info h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    .platform {
      color: #ccc;
      font-size: 0.8rem;
    }

    .chat-actions {
      display: flex;
      gap: 10px;
    }

    .escalate-btn, .resolve-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .escalate-btn {
      background: #ef4444;
      color: white;
    }

    .resolve-btn {
      background: #22c55e;
      color: white;
    }

    .chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }

    .message {
      margin-bottom: 15px;
    }

    .user-message .message-content {
      background: #3a3a3a;
      padding: 12px 16px;
      border-radius: 12px;
      max-width: 70%;
    }

    .bot-message .message-content {
      background: #E50914;
      color: white;
      padding: 12px 16px;
      border-radius: 12px;
      max-width: 70%;
      margin-left: auto;
    }

    .message-time {
      font-size: 0.75rem;
      color: #999;
      margin-top: 5px;
    }

    .chat-input {
      padding: 20px;
      border-top: 1px solid #333;
      display: flex;
      gap: 10px;
    }

    .chat-input textarea {
      flex: 1;
      padding: 12px;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      resize: none;
      height: 60px;
    }

    .send-btn {
      background: #E50914;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .no-selection {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .no-selection-content {
      text-align: center;
      color: #666;
    }

    .chatbot-panel {
      margin-top: 30px;
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
    }

    .chatbot-panel h3 {
      margin: 0 0 20px 0;
      color: #E50914;
    }

    .chatbot-settings {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .setting-item label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .platform-integrations h4 {
      margin: 0 0 15px 0;
      color: #fff;
    }

    .integration-buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .integration-btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: transform 0.3s ease;
    }

    .integration-btn:hover {
      transform: translateY(-2px);
    }

    .integration-btn.whatsapp {
      background: #25D366;
      color: white;
    }

    .integration-btn.telegram {
      background: #0088cc;
      color: white;
    }

    .integration-btn.facebook {
      background: #1877f2;
      color: white;
    }

    @media (max-width: 768px) {
      .chat-layout {
        grid-template-columns: 1fr;
        height: auto;
      }

      .chat-sidebar {
        height: 300px;
      }

      .chat-main {
        height: 500px;
      }

      .integration-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class ChatComponent implements OnInit {
  chatMessages: ChatMessage[] = [];
  selectedMessage: ChatMessage | null = null;
  responseMessage = '';
  botResponse = '';
  autoBotResponse = true;
  movieSearchEnabled = true;

  constructor(
    private adminService: AdminService,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit(): void {
    this.adminService.getChatMessages().subscribe(messages => {
      this.chatMessages = messages;
    });
  }

  selectMessage(message: ChatMessage): void {
    this.selectedMessage = message;
    this.generateBotResponse(message.message);
  }

  generateBotResponse(userMessage: string): void {
    if (this.autoBotResponse && this.selectedMessage) {
      this.chatbotService.processUserQuery(userMessage, this.selectedMessage.userId)
        .subscribe(response => {
          this.botResponse = response;
        });
    }
  }

  sendResponse(event?: Event): void {
  const keyboardEvent = event as KeyboardEvent;

  if (keyboardEvent && !keyboardEvent.shiftKey) {
    keyboardEvent.preventDefault();
  }

  if (this.responseMessage.trim() && this.selectedMessage) {
    console.log('Sending response:', this.responseMessage);
    this.adminService.respondToMessage(this.selectedMessage.id, this.responseMessage, 'admin-1')
      .subscribe(() => {
        this.responseMessage = '';
      });
  }
}


  escalateToAdmin(): void {
    if (this.selectedMessage) {
      console.log('Escalating to admin:', this.selectedMessage.id);
    }
  }

  markResolved(): void {
    if (this.selectedMessage) {
      console.log('Marking as resolved:', this.selectedMessage.id);
    }
  }

  integratePlatform(platform: 'whatsapp' | 'telegram' | 'facebook'): void {
    this.chatbotService.integrateWithPlatform(platform).subscribe(() => {
      console.log(`${platform} integration initiated`);
    });
  }

  getPlatformIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      whatsapp: '📱',
      telegram: '✈️',
      webchat: '💬',
      facebook: '📘'
    };
    return icons[platform] || '💬';
  }
}
