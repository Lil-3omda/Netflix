import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ChatMessage, Conversation } from '../../models/admin.interfaces';

@Component({
  selector: 'app-chatbotAdmin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="netflix-page space-y-8">
      <!-- Header Section -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent netflix-title">
            AI Chatbot Management
          </h1>
          <p class="text-gray-400 mt-2">Monitor and manage customer support conversations</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white font-medium transition-all duration-300">
            <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Bot Online
          </button>
          <button class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-300 netflix-btn">
            Settings
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 border border-gray-700 netflix-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Active Conversations</p>
              <p class="text-3xl font-bold text-white mt-2">{{ activeConversations }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 border border-gray-700 netflix-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Resolved Today</p>
              <p class="text-3xl font-bold text-white mt-2">{{ resolvedToday }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 border border-gray-700 netflix-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Avg Response Time</p>
              <p class="text-3xl font-bold text-white mt-2">{{ avgResponseTime }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 border border-gray-700 netflix-card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Satisfaction Rate</p>
              <p class="text-3xl font-bold text-white mt-2">{{ satisfactionRate }}%</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Conversations List -->
        <div class="lg:col-span-1 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-700">
            <h3 class="text-xl font-semibold text-white mb-4">Recent Conversations</h3>
            <div class="flex space-x-2">
              <button
                [class.bg-red-600]="selectedFilter === 'all'"
                [class.bg-gray-700]="selectedFilter !== 'all'"
                (click)="selectedFilter = 'all'"
                class="px-3 py-1 text-white rounded-lg text-sm font-medium transition-all duration-300">
                All
              </button>
              <button
                [class.bg-red-600]="selectedFilter === 'pending'"
                [class.bg-gray-700]="selectedFilter !== 'pending'"
                (click)="selectedFilter = 'pending'"
                class="px-3 py-1 text-white rounded-lg text-sm font-medium transition-all duration-300">
                Pending
              </button>
              <button
                [class.bg-red-600]="selectedFilter === 'high'"
                [class.bg-gray-700]="selectedFilter !== 'high'"
                (click)="selectedFilter = 'high'"
                class="px-3 py-1 text-white rounded-lg text-sm font-medium transition-all duration-300">
                High Priority
              </button>
            </div>
          </div>

          <div class="max-h-96 overflow-y-auto">
            <div
              *ngFor="let conversation of filteredConversations; trackBy: trackByConversation"
              class="p-4 border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer transition-all duration-300"
              [class.bg-gray-800]="selectedConversation?.id === conversation.id"
              [class.bg-opacity-30]="selectedConversation?.id === conversation.id"
              (click)="selectConversation(conversation)">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <h4 class="font-medium text-white text-sm">{{ conversation.user }}</h4>
                    <span
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-red-100 text-red-800': conversation.priority === 'high',
                        'bg-yellow-100 text-yellow-800': conversation.priority === 'medium',
                        'bg-green-100 text-green-800': conversation.priority === 'low'
                      }">
                      {{ conversation.priority }}
                    </span>
                  </div>
                  <p class="text-gray-400 text-xs mb-2">{{ conversation.platform }}</p>
                  <p class="text-gray-300 text-sm line-clamp-2">{{ conversation.lastMessage }}</p>
                </div>
                <div class="text-right ml-2">
                  <span
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    [ngClass]="{
                      'bg-blue-100 text-blue-800': conversation.status === 'unread',
                      'bg-yellow-100 text-yellow-800': conversation.status === 'pending',
                      'bg-orange-100 text-orange-800': conversation.status === 'in-progress',
                      'bg-green-100 text-green-800': conversation.status === 'resolved'
                    }">
                    {{ conversation.status }}
                  </span>
                  <p class="text-xs text-gray-500 mt-1">{{ formatTime(conversation.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Interface -->
        <div class="lg:col-span-2 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 flex flex-col">
          <div *ngIf="selectedConversation" class="flex flex-col h-full">
            <!-- Chat Header -->
            <div class="p-6 border-b border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-white">{{ selectedConversation.user }}</h3>
                  <p class="text-gray-400 text-sm">{{ selectedConversation.platform }} • {{ formatTime(selectedConversation.timestamp) }}</p>
                </div>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all duration-300">
                    Transfer
                  </button>
                  <button class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-all duration-300">
                    Resolve
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 p-6 overflow-y-auto">
              <div class="space-y-4">
                <div
                  *ngFor="let message of messages; trackBy: trackByMessage"
                  class="flex"
                  [class.justify-end]="message.type === 'user'"
                  [class.justify-start]="message.type === 'bot'">
                  <div
                    class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl"
                    [ngClass]="{
                      'bg-red-600 text-white': message.type === 'user',
                      'bg-gray-700 text-gray-100': message.type === 'bot'
                    }">
                    <p class="text-sm">{{ message.content }}</p>
                    <p class="text-xs mt-1 opacity-70">{{ formatTime(message.timestamp) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-6 border-t border-gray-700">
              <div class="flex space-x-4">
                <input
                  type="text"
                  [(ngModel)]="newMessage"
                  (keyup.enter)="sendMessage()"
                  placeholder="Type your response..."
                  class="flex-1 px-4 py-3 bg-gray-900 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all duration-300">
                <button
                  (click)="sendMessage()"
                  [disabled]="!newMessage.trim()"
                  class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all duration-300">
                  Send
                </button>
              </div>

              <!-- Quick Responses -->
              <div class="flex flex-wrap gap-2 mt-4">
                <button
                  *ngFor="let response of quickResponses"
                  (click)="sendQuickResponse(response)"
                  class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-all duration-300">
                  {{ response }}
                </button>
              </div>
            </div>
          </div>

          <!-- No Conversation Selected -->
          <div *ngIf="!selectedConversation" class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-400 mb-2">Select a Conversation</h3>
              <p class="text-gray-500">Choose a conversation from the list to start managing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .netflix-page {
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .netflix-title {
      text-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
    }

    .netflix-card {
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.5s ease;
    }

    .netflix-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
    }

    .netflix-btn {
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
    }

    .netflix-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .netflix-btn:hover::before {
      left: 100%;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    ::-webkit-scrollbar-thumb {
      background: #dc2626;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #b91c1c;
    }
  `]
})
export class ChatbotComponent implements OnInit {
  activeConversations = 12;
  resolvedToday = 47;
  avgResponseTime = '2.3m';
  satisfactionRate = 94;

  selectedFilter = 'all';
  selectedConversation: Conversation | null = null;
  newMessage = '';

  conversations: Conversation[] = [];
  messages: ChatMessage[] = [];

  quickResponses = [
    'Thank you for contacting Netflix support',
    'I understand your concern',
    'Let me check that for you',
    'Is there anything else I can help with?',
    'Your issue has been resolved'
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadConversations();
    this.loadMessages();
  }

  loadConversations(): void {
    this.conversations = this.adminService.getConversations();
  }

  loadMessages(): void {
    this.messages = this.adminService.getChatMessages();
  }

  get filteredConversations(): Conversation[] {
    if (this.selectedFilter === 'all') {
      return this.conversations;
    } else if (this.selectedFilter === 'pending') {
      return this.conversations.filter(c => c.status === 'pending' || c.status === 'unread');
    } else if (this.selectedFilter === 'high') {
      return this.conversations.filter(c => c.priority === 'high');
    }
    return this.conversations;
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation = conversation;
    // In a real app, you would load messages for this specific conversation
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedConversation) {
      const message: ChatMessage = {
        id: this.messages.length + 1,
        type: 'bot',
        content: this.newMessage.trim(),
        timestamp: new Date().toISOString()
      };

      this.messages.push(message);
      this.newMessage = '';

      // Update conversation's last message
      this.selectedConversation.lastMessage = message.content;
      this.selectedConversation.timestamp = message.timestamp;
    }
  }

  sendQuickResponse(response: string): void {
    this.newMessage = response;
    this.sendMessage();
  }

  trackByConversation(index: number, conversation: Conversation): number {
    return conversation.id;
  }

  trackByMessage(index: number, message: ChatMessage): number {
    return message.id;
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  }
}
