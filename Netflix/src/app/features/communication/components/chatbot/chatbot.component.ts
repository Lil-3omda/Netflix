import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { Message } from '../../models/conversation.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chatbot-container" [class.open]="isOpen">
      <!-- Chatbot Toggle Button -->
      <button class="chatbot-toggle" (click)="toggleChatbot()" [class.has-unread]="hasUnreadMessages">
        <svg *ngIf="!isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg *ngIf="isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="unread-badge" *ngIf="hasUnreadMessages && !isOpen">{{ unreadCount }}</span>
      </button>

      <!-- Chatbot Window -->
      <div class="chatbot-window" *ngIf="isOpen">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="header-info">
            <div class="avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="header-text">
              <h4>Netflix Support</h4>
              <span class="status">{{ isTyping ? 'Typing...' : 'Online' }}</span>
            </div>
          </div>
          <button class="close-btn" (click)="toggleChatbot()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" #messagesContainer>
          <div class="welcome-message" *ngIf="messages.length === 0">
            <div class="bot-avatar">🤖</div>
            <div class="message-content" *ngIf="isAuthenticated">
              <p>Hi! I'm the Netflix support chatbot. How can I help you today?</p>
              <div class="quick-actions">
                <button class="quick-action" (click)="sendQuickMessage('I need help with login')">
                  Login Issues
                </button>
                <button class="quick-action" (click)="sendQuickMessage('I have a billing question')">
                  Billing
                </button>
                <button class="quick-action" (click)="sendQuickMessage('Video playback problems')">
                  Playback Issues
                </button>
                <button class="quick-action" (click)="sendQuickMessage('I want to speak with a human agent')">
                  Human Agent
                </button>
              </div>
            </div>
            <div class="message-content" *ngIf="!isAuthenticated">
              <p>Welcome to Netflix! 🎬</p>
              <p>Discover unlimited movies, TV shows, and more. Join millions of viewers worldwide!</p>
              <div class="visitor-features">
                <div class="feature">✓ Thousands of movies and TV shows</div>
                <div class="feature">✓ Watch on any device</div>
                <div class="feature">✓ Cancel anytime</div>
                <div class="feature">✓ New content added regularly</div>
              </div>
              <div class="visitor-actions">
                <button class="signup-action" (click)="goToSignup()">
                  Get Started - Sign Up Now
                </button>
                <button class="login-action" (click)="goToLogin()">
                  Already have an account? Sign In
                </button>
              </div>
              <p class="visitor-note">Have questions? Feel free to ask me anything about Netflix!</p>
            </div>
          </div>

          <div class="message"
               *ngFor="let message of messages"
               [class.user-message]="message.type === 'CustomerToAdmin'"
               [class.bot-message]="message.type === 'SystemMessage'"
               [class.admin-message]="message.type === 'AdminToCustomer'">

            <div class="message-avatar" *ngIf="message.type !== 'CustomerToAdmin'">
              <span *ngIf="message.type === 'SystemMessage'">🤖</span>
              <span *ngIf="message.type === 'AdminToCustomer'">👨‍💼</span>
            </div>

            <div class="message-content">
              <p>{{ message.content }}</p>
              <span class="message-time">{{ formatTime(message.createdAt) }}</span>
            </div>
          </div>

          <div class="typing-indicator" *ngIf="isTyping">
            <div class="bot-avatar">🤖</div>
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chatbot-input">
          <div class="input-container">
            <input
              type="text"
              [(ngModel)]="currentMessage"
              (keyup.enter)="sendMessage()"
              placeholder="Type your message..."
              class="message-input"
              [disabled]="isLoading">
            <button
              class="send-btn"
              (click)="sendMessage()"
              [disabled]="!currentMessage.trim() || isLoading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .chatbot-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e50914, #f40612);
      border: none;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(229, 9, 20, 0.3);
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(229, 9, 20, 0.4);
    }

    .chatbot-toggle.has-unread {
      animation: pulse 2s infinite;
    }

    .unread-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ff4757;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 500px;
      background: #141414;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #333;
    }

    .chatbot-header {
      background: linear-gradient(135deg, #e50914, #f40612);
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .avatar {
      width: 35px;
      height: 35px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-text h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    .status {
      font-size: 12px;
      opacity: 0.9;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .chatbot-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      background: #141414;
    }

    .welcome-message {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .bot-avatar {
      font-size: 20px;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #333;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .message {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .user-message {
      flex-direction: row-reverse;
    }

    .user-message .message-content {
      background: #e50914;
      color: white;
      margin-left: 50px;
    }

    .bot-message .message-content,
    .admin-message .message-content {
      background: #333;
      color: white;
      margin-right: 50px;
    }

    .message-avatar {
      width: 35px;
      height: 35px;
      background: #333;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .message-content {
      max-width: 70%;
      padding: 10px 15px;
      border-radius: 18px;
      position: relative;
    }

    .message-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .message-time {
      font-size: 11px;
      opacity: 0.7;
      display: block;
      margin-top: 5px;
    }

    .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
    }

    .quick-action {
      background: rgba(229, 9, 20, 0.1);
      border: 1px solid #e50914;
      color: #e50914;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .quick-action:hover {
      background: #e50914;
      color: white;
    }

    .visitor-features {
      margin: 16px 0;
    }

    .feature {
      color: #46d369;
      font-size: 14px;
      margin: 8px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .visitor-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 20px 0;
    }

    .signup-action, .login-action {
      padding: 12px 16px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }

    .signup-action {
      background: #e50914;
      color: white;
    }

    .signup-action:hover {
      background: #f40612;
      transform: scale(1.02);
    }

    .login-action {
      background: transparent;
      color: #999;
      border: 1px solid #333;
    }

    .login-action:hover {
      background: #333;
      color: white;
    }

    .visitor-note {
      font-size: 12px;
      color: #666;
      margin-top: 16px;
      font-style: italic;
    }

    .typing-indicator {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 10px 15px;
      background: #333;
      border-radius: 18px;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #999;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }

    .chatbot-input {
      padding: 15px;
      background: #1a1a1a;
      border-top: 1px solid #333;
    }

    .input-container {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .message-input {
      flex: 1;
      background: #333;
      border: none;
      border-radius: 20px;
      padding: 10px 15px;
      color: white;
      font-size: 14px;
      outline: none;
    }

    .message-input::placeholder {
      color: #999;
    }

    .send-btn {
      width: 40px;
      height: 40px;
      background: #e50914;
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .send-btn:hover:not(:disabled) {
      background: #f40612;
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Scrollbar */
    .chatbot-messages::-webkit-scrollbar {
      width: 4px;
    }

    .chatbot-messages::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .chatbot-messages::-webkit-scrollbar-thumb {
      background: #555;
      border-radius: 2px;
    }

    /* Animations */
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-10px); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .chatbot-window {
        width: 300px;
        height: 400px;
      }

      .chatbot-container {
        bottom: 15px;
        right: 15px;
      }
    }
  `]
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  isOpen = false;
  messages: Message[] = [];
  currentMessage = '';
  isLoading = false;
  isTyping = false;
  hasUnreadMessages = false;
  unreadCount = 0;
  isAuthenticated = false;

  constructor(
    private communicationService: CommunicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check authentication status
    this.isAuthenticated = this.authService.isAuthenticated();

    // Subscribe to authentication changes
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    // Subscribe to unread count changes
    this.communicationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
      this.hasUnreadMessages = count > 0;
    });
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.hasUnreadMessages) {
      this.hasUnreadMessages = false;
      this.communicationService.updateUnreadCount(0);
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading) return;

    const messageText = this.currentMessage.trim();
    this.currentMessage = '';
    this.isLoading = true;

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now(),
      content: messageText,
      type: 'CustomerToAdmin',
      status: 'Sent',
      createdAt: new Date().toISOString(),
      conversationId: 0,
      senderName: 'You'
    };

    this.messages.push(userMessage);
    this.scrollToBottom();

    try {
      // Show typing indicator
      this.isTyping = true;

      let response;

      if (this.isAuthenticated) {
        // Send to chatbot service for authenticated users
        response = await this.communicationService.sendChatbotMessage(messageText).toPromise();
      } else {
        // Handle visitor messages with Netflix info
        response = this.generateVisitorResponse(messageText);
      }

      // Hide typing indicator
      this.isTyping = false;

      if (response) {
        this.messages.push(response);
      }
    } catch (error) {
      this.isTyping = false;
      console.error('Error sending message:', error);

      // Add error message
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: 'Sorry, I encountered an error. Please try again or contact support.',
        type: 'SystemMessage',
        status: 'Sent',
        createdAt: new Date().toISOString(),
        conversationId: 0,
        senderName: 'System'
      };

      this.messages.push(errorMessage);
    } finally {
      this.isLoading = false;
      this.scrollToBottom();
    }
  }

  generateVisitorResponse(message: string): Message {
    const lowerMessage = message.toLowerCase();
    let responseContent = '';

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
      responseContent = `Netflix offers flexible plans starting from EGP 100/month:

📺 Basic (EGP 100/month) - Good quality, 1 screen
📺 Standard (EGP 170/month) - Great quality, 2 screens
📺 Premium (EGP 240/month) - Best quality, 4 screens, 4K

Ready to start your Netflix journey? Click "Get Started" above!`;
    } else if (lowerMessage.includes('device') || lowerMessage.includes('watch')) {
      responseContent = `You can watch Netflix on:

📱 Smartphones & Tablets
💻 Computers & Laptops
📺 Smart TVs
🎮 Gaming Consoles
📡 Streaming Devices

Watch anywhere, anytime! Sign up to get started.`;
    } else if (lowerMessage.includes('content') || lowerMessage.includes('movie') || lowerMessage.includes('show')) {
      responseContent = `Netflix has thousands of:

🎬 Movies (Action, Comedy, Drama, Horror & more)
📺 TV Shows (Series, Documentaries, Kids content)
🌍 International content from around the world
🆕 Netflix Originals you can't find anywhere else

New content added every week! Join now to explore.`;
    } else if (lowerMessage.includes('cancel') || lowerMessage.includes('subscription')) {
      responseContent = `Netflix subscriptions are flexible:

✅ Cancel anytime online
✅ No long-term contracts
✅ No cancellation fees
✅ Watch until your billing period ends

Try Netflix risk-free! Sign up now.`;
    } else {
      responseContent = `Thanks for your interest in Netflix! 🎬

We offer unlimited streaming of movies and TV shows with:
• Multiple subscription plans to fit your needs
• Watch on any device, anywhere
• Cancel anytime with no fees
• New content added regularly

Ready to start watching? Click "Get Started" above to sign up, or ask me about our plans, content, or features!`;
    }

    return {
      id: Date.now() + 1,
      content: responseContent,
      type: 'SystemMessage',
      status: 'Sent',
      createdAt: new Date().toISOString(),
      conversationId: 0,
      senderName: 'Netflix Bot'
    };
  }

  sendQuickMessage(message: string) {
    this.currentMessage = message;
    this.sendMessage();
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }
}
