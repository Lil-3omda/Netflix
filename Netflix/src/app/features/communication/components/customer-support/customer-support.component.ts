import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.service';
import { Conversation, CreateConversation, CreateMessage } from '../../models/conversation.model';

@Component({
  selector: 'app-customer-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="support-page">
      <header class="support-header">
        <div class="header-content">
          <div class="netflix-logo" (click)="goHome()">
            <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" fill="#e50914"></path>
              </g>
            </svg>
          </div>
          <h1>Customer Support</h1>
        </div>
      </header>

      <main class="support-content">
        <div class="container">
          <!-- Support Options -->
          <section class="support-options" *ngIf="!showConversations && !showNewTicket">
            <h2>How can we help you?</h2>

            <div class="options-grid">
              <div class="option-card" (click)="showNewTicket = true">
                <div class="option-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#e50914" stroke-width="2"/>
                  </svg>
                </div>
                <h3>Start New Conversation</h3>
                <p>Get help from our support team</p>
              </div>

              <div class="option-card" (click)="showConversations = true">
                <div class="option-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M8 6H21" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 12H21" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 18H21" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 6H3.01" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 12H3.01" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M3 18H3.01" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>My Conversations</h3>
                <p>View your support history</p>
              </div>

              <div class="option-card">
                <div class="option-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#e50914" stroke-width="2"/>
                    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                    <path d="M12 17H12.01" stroke="#e50914" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </div>
                <h3>FAQ</h3>
                <p>Find quick answers</p>
              </div>
            </div>
          </section>

          <!-- New Ticket Form -->
          <section class="new-ticket-form" *ngIf="showNewTicket">
            <div class="form-header">
              <button class="back-btn" (click)="showNewTicket = false">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Back
              </button>
              <h2>Start New Conversation</h2>
            </div>

            <form class="ticket-form" (ngSubmit)="createConversation()">
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  [(ngModel)]="newTicket.subject"
                  name="subject"
                  required
                  class="form-input"
                  placeholder="Brief description of your issue">
              </div>

              <div class="form-group">
                <label for="priority">Priority</label>
                <select
                  id="priority"
                  [(ngModel)]="newTicket.priority"
                  name="priority"
                  class="form-select">
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  [(ngModel)]="newTicket.initialMessage"
                  name="message"
                  required
                  class="form-textarea"
                  rows="5"
                  placeholder="Please describe your issue in detail..."></textarea>
              </div>

              <button type="submit" class="submit-btn" [disabled]="isLoading">
                <span *ngIf="!isLoading">Create Conversation</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>
            </form>
          </section>

          <!-- Conversations List -->
          <section class="conversations-section" *ngIf="showConversations">
            <div class="section-header">
              <button class="back-btn" (click)="showConversations = false">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Back
              </button>
              <h2>My Conversations</h2>
            </div>

            <div class="conversations-list">
              <div
                class="conversation-card"
                *ngFor="let conversation of customerConversations"
                (click)="selectConversation(conversation)">

                <div class="conversation-header">
                  <h3>{{ conversation.subject }}</h3>
                  <span class="conversation-date">{{ formatDate(conversation.createdAt) }}</span>
                </div>

                <p class="last-message" *ngIf="conversation.lastMessage">
                  {{ conversation.lastMessage.content }}
                </p>

                <div class="conversation-footer">
                  <span class="status-badge" [class]="'status-' + conversation.status.toLowerCase()">
                    {{ conversation.status }}
                  </span>
                  <span class="unread-count" *ngIf="conversation.unreadCount > 0">
                    {{ conversation.unreadCount }} new
                  </span>
                </div>
              </div>

              <div class="no-conversations" *ngIf="customerConversations.length === 0">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#666" stroke-width="2"/>
                </svg>
                <h3>No conversations yet</h3>
                <p>Start a new conversation to get help from our support team</p>
                <button class="start-conversation-btn" (click)="showNewTicket = true; showConversations = false">
                  Start Conversation
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .support-page {
      min-height: 100vh;
      background: #000;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .support-header {
      background: #111;
      padding: 20px 0;
      border-bottom: 1px solid #333;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      height: 35px;
      width: auto;
      fill: #e50914;
    }

    .header-content h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .support-content {
      padding: 40px 0;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .support-options h2 {
      text-align: center;
      margin-bottom: 40px;
      font-size: 32px;
      font-weight: 700;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .option-card {
      background: #111;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #333;
    }

    .option-card:hover {
      transform: translateY(-5px);
      border-color: #e50914;
      box-shadow: 0 10px 30px rgba(229, 9, 20, 0.2);
    }

    .option-icon {
      margin-bottom: 20px;
    }

    .option-card h3 {
      margin: 0 0 10px 0;
      font-size: 20px;
      font-weight: 600;
    }

    .option-card p {
      margin: 0;
      color: #999;
      font-size: 14px;
    }

    .form-header,
    .section-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .back-btn {
      background: #333;
      border: none;
      color: white;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }

    .back-btn:hover {
      background: #555;
    }

    .form-header h2,
    .section-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .ticket-form {
      background: #111;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #e50914;
    }

    .form-input,
    .form-select,
    .form-textarea {
      width: 100%;
      background: #333;
      border: 1px solid #555;
      border-radius: 8px;
      padding: 12px;
      color: white;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      border-color: #e50914;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      background: #e50914;
      border: none;
      color: white;
      padding: 15px 30px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .submit-btn:hover:not(:disabled) {
      background: #f40612;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff30;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .conversations-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .conversation-card {
      background: #111;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #333;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .conversation-card:hover {
      border-color: #e50914;
      transform: translateY(-2px);
    }

    .conversation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .conversation-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .conversation-date {
      font-size: 12px;
      color: #999;
    }

    .last-message {
      margin: 0 0 15px 0;
      color: #ccc;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .conversation-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status-badge {
      font-size: 12px;
      padding: 4px 12px;
      border-radius: 12px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .status-open { background: #28a745; }
    .status-inprogress { background: #ffc107; color: #000; }
    .status-resolved { background: #17a2b8; }
    .status-closed { background: #6c757d; }

    .unread-count {
      background: #e50914;
      color: white;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 10px;
      font-weight: 600;
    }

    .no-conversations {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .no-conversations h3 {
      margin: 20px 0 10px 0;
      color: #999;
    }

    .no-conversations p {
      margin: 0 0 30px 0;
      font-size: 14px;
    }

    .start-conversation-btn {
      background: #e50914;
      border: none;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .start-conversation-btn:hover {
      background: #f40612;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .options-grid {
        grid-template-columns: 1fr;
      }

      .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }

      .form-header,
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
  `]
})
export class CustomerSupportComponent implements OnInit {
  showConversations = false;
  showNewTicket = false;
  customerConversations: Conversation[] = [];
  isLoading = false;

  newTicket: CreateConversation = {
    subject: '',
    initialMessage: '',
    priority: 'Normal'
  };

  constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomerConversations();
  }

  loadCustomerConversations() {
    this.communicationService.getCustomerConversations().subscribe({
      next: (conversations) => {
        this.customerConversations = conversations;
      },
      error: (error) => {
        console.error('Error loading conversations:', error);
      }
    });
  }

  createConversation() {
    if (!this.newTicket.subject.trim() || !this.newTicket.initialMessage.trim()) {
      return;
    }

    this.isLoading = true;

    this.communicationService.createConversation(this.newTicket).subscribe({
      next: (conversation) => {
        this.isLoading = false;
        this.showNewTicket = false;
        this.showConversations = true;
        this.loadCustomerConversations();

        // Reset form
        this.newTicket = {
          subject: '',
          initialMessage: '',
          priority: 'Normal'
        };
      },
      error: (error) => {
        console.error('Error creating conversation:', error);
        this.isLoading = false;
      }
    });
  }

  selectConversation(conversation: Conversation) {
    console.log('Selected conversation:', conversation);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
