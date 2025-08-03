import { Router, RouterLink } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatApiService, ChatRequest, ChatResponse, MovieRecommendation, Conversation, ChatMessageDto } from '../../services/chat-api.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="ai-chatbot-container" [class.open]="isOpen">
      <button class="chatbot-toggle" (click)="toggleChatbot()" [class.pulsing]="hasNewRecommendations">
        <div class="toggle-icon">
          <!-- Netflix N Logo -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
          <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
        </svg>

          <!-- <svg *ngIf="isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg> -->
        </div>
        <span class="ai-badge">AI</span>
      </button>

      <!-- Chatbot Window -->
      <div class="chatbot-window" *ngIf="isOpen">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="header-info">
            <div class="ai-avatar">
              <!-- Netflix N Logo -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
            </div>
            <div class="header-text">
              <h4>Netflix AI Assistant</h4>
              <span class="status">{{ isTyping ? 'Thinking...' : 'Online' }}</span>
            </div>
          </div>

          <div class="header-actions">
            <button class="conversation-btn" (click)="showConversations = !showConversations" [class.active]="showConversations">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
            </button>
            <button class="close-btn" (click)="toggleChatbot()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Conversations List -->
        <div class="conversations-panel" *ngIf="showConversations">
          <div class="conversations-header">
            <h5>Recent Conversations</h5>
            <button class="new-chat-btn" (click)="startNewConversation()">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
              New Chat
            </button>
          </div>
          <div class="conversations-list">
            <div
              class="conversation-item"
              *ngFor="let conv of conversations"
              [class.active]="currentConversationId === conv.id"
              (click)="loadConversation(conv.id)">
              <h6>{{ conv.title }}</h6>
              <span class="conversation-time">{{ formatTime(conv.lastMessageAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" #messagesContainer [class.with-conversations]="showConversations">
          <!-- Welcome Message -->
          <div class="welcome-message" *ngIf="messages.length === 0">
            <div class="ai-avatar-large">
              <!-- Netflix N Logo -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
            </div>
            <div class="welcome-content">
              <h4>Hi! I'm your Netflix AI Assistant</h4>
              <p>I can help you with account questions, technical issues, and personalized movie recommendations based on your viewing history!</p>
              <div class="quick-actions">
                <button class="quick-action" (click)="sendQuickMessage('I need help with my account')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Account Help
                </button>
                <button class="quick-action" (click)="sendQuickMessage(&quot;I'm having playback issues&quot;)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  Playback Issues
                </button>
                <button class="quick-action" (click)="goToSupport()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                  Support Center
                </button>
                <button class="quick-action recommendation-btn" (click)="getRecommendations()">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                  Recommend Movies
                </button>
              </div>
            </div>
          </div>

          <!-- Chat Messages -->
          <div class="message"
               *ngFor="let message of messages"
               [class.user-message]="message.role === 'User'"
               [class.assistant-message]="message.role === 'Assistant'">

            <div class="message-avatar" *ngIf="message.role === 'Assistant'">
              <!-- Netflix N Logo -->
              <svg width="20" height="20" viewBox="0 0 54 54" fill="#E50914" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 0H12V54H16.5V5.14286L42 54H47.5V0H42Z"/>
              </svg>
            </div>

            <div class="message-content">
              <p>{{ message.content }}</p>
              <span class="message-time">{{ formatTime(message.createdAt) }}</span>
            </div>
          </div>

          <!-- Movie Recommendations -->
          <div class="recommendations-section" *ngIf="currentRecommendations.length > 0">
            <h5>🎬 Recommended for You</h5>
            <div class="recommendations-grid">
              <div class="recommendation-card" *ngFor="let rec of currentRecommendations" [routerLink]="['/moviedetails', rec.id]">
                <div class="movie-poster" >
                  <img [src]="'https://localhost:7140/'+rec.imageUrl || getDefaultPoster()" [alt]="rec.title"  />
                  <div class="movie-overlay">
                    <button class="play-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="movie-info">
                  <h6>{{ rec.title }}</h6>
                  <div class="movie-meta">
                    <span class="category">{{ rec.category }}</span>
                  </div>
                  <p class="recommendation-reason">{{ rec.reason }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div class="typing-indicator" *ngIf="isTyping">
            <div class="ai-avatar">
              <!-- Netflix N Logo -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.359-.004-14.849-.004-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/>
              </svg>
            </div>
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
              placeholder="Ask me anything about Netflix..."
              class="message-input"
              [disabled]="isLoading">

            <button class="recommend-btn" (click)="getRecommendations()" [disabled]="isLoading" title="Get movie recommendations">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </button>

            <button
              class="send-btn"
              (click)="sendMessage()"
              [disabled]="!currentMessage.trim() || isLoading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ai-chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .chatbot-toggle {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #141414;
      border: 2px solid #E50914;
      color: white;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
      background: #E50914;
    }

    .chatbot-toggle:hover svg {
      fill: white;
    }

    .chatbot-toggle.pulsing {
      animation: pulse 2s infinite;
    }

    .toggle-icon {
      position: relative;
      z-index: 2;
    }

    .ai-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #E50914;
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: bold;
      z-index: 3;
      border: 1px solid white;
    }

    .chatbot-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 380px;
      height: 600px;
      background: #141414;
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #333;
    }

    .chatbot-header {
      background: #141414;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      border-bottom: 1px solid #333;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ai-avatar {
      width: 36px;
      height: 36px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #E50914;
    }

    .header-text h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #E50914;
    }

    .status {
      font-size: 12px;
      opacity: 0.9;
      color: #999;
    }

    .header-actions {
      display: flex;
      gap: 8px;
    }

    .conversation-btn,
    .close-btn {
      background: #333;
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .conversation-btn:hover,
    .close-btn:hover {
      background: #E50914;
    }

    .conversation-btn.active {
      background: #E50914;
    }

    .conversations-panel {
      background: #1a1a1a;
      border-bottom: 1px solid #333;
      max-height: 200px;
      overflow-y: auto;
    }

    .conversations-header {
      padding: 12px 16px;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .conversations-header h5 {
      margin: 0;
      font-size: 14px;
      color: #E50914;
    }

    .new-chat-btn {
      background: #E50914;
      border: none;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;
    }

    .new-chat-btn:hover {
      background: #f40612;
    }

    .conversations-list {
      max-height: 140px;
      overflow-y: auto;
    }

    .conversation-item {
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid #2a2a2a;
      transition: background 0.2s;
    }

    .conversation-item:hover {
      background: #2a2a2a;
    }

    .conversation-item.active {
      background: #333;
      border-left: 3px solid #E50914;
    }

    .conversation-item h6 {
      margin: 0 0 4px 0;
      font-size: 13px;
      color: white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .conversation-time {
      font-size: 11px;
      color: #999;
    }

    .chatbot-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #141414;
      min-height: 100px;
    }

    .chatbot-messages.with-conversations {
      max-height: calc(100% - 300px);
    }

    .welcome-message {
      text-align: center;
      padding: 20px;
    }

    .ai-avatar-large {
      width: 60px;
      height: 60px;
      background: #141414;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: white;
      border: 2px solid #E50914;
    }

    .welcome-content h4 {
      margin: 0 0 8px 0;
      color: #E50914;
      font-size: 18px;
    }

    .welcome-content p {
      margin: 0 0 20px 0;
      color: #ccc;
      font-size: 14px;
      line-height: 1.4;
    }

    .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .quick-action {
      background: rgba(229, 9, 20, 0.1);
      border: 1px solid #E50914;
      color: #E50914;
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: center;
    }

    .quick-action:hover {
      background: #E50914;
      color: white;
    }

    .recommendation-btn {
      background: #E50914;
      color: white;
      border: none;
    }

    .recommendation-btn:hover {
      background: #f40612;
    }

    .message {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      align-items: flex-start;
    }

    .user-message {
      flex-direction: row-reverse;
    }

    .user-message .message-content {
      background: #E50914;
      color: white;
      margin-left: 40px;
    }

    .assistant-message .message-content {
      background: #333;
      color: white;
      margin-right: 40px;
      border-left: 2px solid #E50914;
    }

    .message-content {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 8px;
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
      margin-top: 6px;
    }

    .recommendations-section {
      margin: 16px 0;
      padding: 16px;
      background: rgba(229, 9, 20, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(229, 9, 20, 0.2);
    }

    .recommendations-section h5 {
      margin: 0 0 12px 0;
      color: #E50914;
      font-size: 16px;
    }

    .recommendations-grid {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .recommendation-card {
      display: flex;
      gap: 12px;
      background: #1a1a1a;
      border-radius: 8px;
      padding: 12px;
      transition: transform 0.2s;
      border: 1px solid #333;
    }

    .recommendation-card:hover {
      transform: translateY(-2px);
      border-color: #E50914;
    }

    .movie-poster {
      position: relative;
      width: 60px;
      height: 90px;
      border-radius: 4px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .movie-poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .movie-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .movie-poster:hover .movie-overlay {
      opacity: 1;
    }

    .play-btn {
      background: #E50914;
      border: none;
      color: white;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .movie-info {
      flex: 1;
    }

    .movie-info h6 {
      margin: 0 0 6px 0;
      color: white;
      font-size: 14px;
      font-weight: 600;
    }

    .movie-meta {
      display: flex;
      gap: 8px;
      margin-bottom: 6px;
    }

    .rating,
    .category {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .rating {
      background: #ffd700;
      color: #000;
    }

    .category {
      background: #333;
      color: #ccc;
    }

    .recommendation-reason {
      margin: 0;
      font-size: 12px;
      color: #999;
      line-height: 1.3;
    }

    .typing-indicator {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }

    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
      background: #333;
      border-radius: 16px;
      border-left: 2px solid #E50914;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #E50914;
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
      padding: 16px;
      background: #1a1a1a;
      border-top: 1px solid #333;
    }

    .input-container {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .message-input {
      flex: 1;
      background: #333;
      border: none;
      border-radius: 20px;
      padding: 12px 16px;
      color: white;
      font-size: 14px;
      outline: none;
      border: 1px solid #444;
    }

    .message-input:focus {
      border-color: #E50914;
    }

    .message-input::placeholder {
      color: #999;
    }

    .recommend-btn,
    .send-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .recommend-btn {
      background: #333;
      color: #E50914;
      border: 1px solid #444;
    }

    .recommend-btn:hover:not(:disabled) {
      background: #E50914;
      color: white;
      transform: scale(1.05);
    }

    .send-btn {
      background: #E50914;
    }

    .send-btn:hover:not(:disabled) {
      background: #f40612;
      transform: scale(1.05);
    }

    .send-btn:disabled,
    .recommend-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* Scrollbar */
    .chatbot-messages::-webkit-scrollbar,
    .conversations-list::-webkit-scrollbar {
      width: 4px;
    }

    .chatbot-messages::-webkit-scrollbar-track,
    .conversations-list::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .chatbot-messages::-webkit-scrollbar-thumb,
    .conversations-list::-webkit-scrollbar-thumb {
      background: #E50914;
      border-radius: 2px;
    }

    /* Animations */
    @keyframes pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.7); }
      50% { transform: scale(1.05); }
      70% { box-shadow: 0 0 0 10px rgba(229, 9, 20, 0); }
    }

    @keyframes typing {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-8px); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .chatbot-window {
        width: 320px;
        height: 500px;
      }

      .ai-chatbot-container {
        bottom: 15px;
        right: 15px;
      }

      .recommendations-grid {
        gap: 8px;
      }

      .recommendation-card {
        padding: 8px;
      }

      .movie-poster {
        width: 50px;
        height: 75px;
      }
    }
  `]
})
export class AiChatbotComponent implements OnInit, OnDestroy {
  // ... (rest of the component code remains exactly the same)
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  private isUserScrolledUp = false;
  isOpen = false;
  showConversations = false;
  messages: ChatMessageDto[] = [];
  conversations: Conversation[] = [];
  currentMessage = '';
  currentConversationId?: number;
  currentRecommendations: MovieRecommendation[] = [];
  isLoading = false;
  isTyping = false;
  hasNewRecommendations = false;
  isAuthenticated = false;

  private destroy$ = new Subject<void>();

  constructor(
    private chatApiService: ChatApiService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Check authentication status
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe(
      isAuth => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.loadConversations();
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.addEventListener('scroll', () => {
        const element = this.messagesContainer.nativeElement;
        const threshold = 100;
        this.isUserScrolledUp =
          element.scrollHeight - (element.scrollTop + element.clientHeight) > threshold;
      });
    }
  }

  toggleChatbot() {
    if (!this.isAuthenticated) {
      // Could show a login prompt or redirect
      return;
    }

    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasNewRecommendations = false;
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading || !this.isAuthenticated) return;

    const messageText = this.currentMessage.trim();
    this.currentMessage = '';
    this.isLoading = true;
    this.isTyping = true;

    // Add user message to UI immediately
    this.messages.push({
      id: Date.now(),
      role: 'User',
      content: messageText,
      createdAt: new Date().toISOString()
    });

    this.scrollToBottom(true);
    try {
      const request: ChatRequest = {
        conversationId: this.currentConversationId,
        message: messageText,
        includeRecommendations: false
      };

      const response = await this.chatApiService.sendMessage(request).toPromise();

      if (response) {
        this.currentConversationId = response.conversationId;

        // Add assistant response
        this.messages.push({
          id: Date.now() + 1,
          role: 'Assistant',
          content: response.response,
          createdAt: response.timestamp
        });

        // Handle recommendations if present
        if (response.recommendations && response.recommendations.length > 0) {
          this.currentRecommendations = response.recommendations;
          this.hasNewRecommendations = true;
        }

        // Refresh conversations list
        this.loadConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);

      this.messages.push({
        id: Date.now() + 2,
        role: 'Assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        createdAt: new Date().toISOString()
      });
    } finally {
      this.isLoading = false;
      this.isTyping = false;
    }
  }

  async getRecommendations() {
    if (this.isLoading || !this.isAuthenticated) return;

    this.isLoading = true;
    this.isTyping = true;

    try {
      const response = await this.chatApiService.getRecommendations().toPromise();

      if (response && response.recommendations.length > 0) {
        this.currentRecommendations = response.recommendations;
        this.hasNewRecommendations = true;

        // Add a message about recommendations
        this.messages.push({
          id: Date.now(),
          role: 'Assistant',
          content: `I've analyzed your viewing history and found ${response.recommendations.length} movies you might love! Check them out below.`,
          createdAt: response.timestamp
        });
      } else {
        this.messages.push({
          id: Date.now(),
          role: 'Assistant',
          content: 'I couldn\'t find personalized recommendations right now. Try watching a few more movies to help me understand your preferences better!',
          createdAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);

      this.messages.push({
        id: Date.now(),
        role: 'Assistant',
        content: 'Sorry, I couldn\'t generate recommendations right now. Please try again later.',
        createdAt: new Date().toISOString()
      });
    } finally {
      this.isLoading = false;
      this.isTyping = false;
    }
  }

  sendQuickMessage(message: string) {
    this.currentMessage = message;
    this.sendMessage();
  }
  goToSupport() {
    this.router.navigate(['/support']);
  }
  async loadConversations() {
    if (!this.isAuthenticated) return;

    try {
      this.conversations = await this.chatApiService.getConversations().toPromise() || [];
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  }

  async loadConversation(conversationId: number) {
    if (!this.isAuthenticated) return;

    try {
      const conversation = await this.chatApiService.getConversation(conversationId).toPromise();

      if (conversation) {
        this.currentConversationId = conversation.id;
        this.messages = conversation.messages;
        this.showConversations = false;
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  }

  startNewConversation() {
    this.currentConversationId = undefined;
    this.messages = [];
    this.currentRecommendations = [];
    this.showConversations = false;
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  }

  getDefaultPoster(): string {
    return 'https://via.placeholder.com/300x450/333333/ffffff?text=Netflix';
  }

  private scrollToBottom(force: boolean = false): void {
    if (!this.messagesContainer || (this.isUserScrolledUp && !force)) {
      return;
    }

    setTimeout(() => {
      try {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      } catch (err) {
        console.warn('Scroll error:', err);
      }
    }, 50);
  }
}
