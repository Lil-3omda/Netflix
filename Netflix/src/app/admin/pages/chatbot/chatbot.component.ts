// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AdminService } from '../../services/admin.service';
// import { ChatMessage, Conversation } from '../../models/admin.interfaces';

// @Component({
//   selector: 'app-chatbotAdmin',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//     <div class="container py-4">
//       <div class="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h1 class="display-4 fw-bold text-danger">AI Chatbot Management</h1>
//           <p class="text-muted">Monitor and manage customer support conversations</p>
//         </div>
//         <div>
//           <button class="btn btn-success me-2">
//             <i class="bi bi-check-circle me-1"></i>
//             Bot Online
//           </button>
//           <button class="btn btn-danger">Settings</button>
//         </div>
//       </div>

//       <div class="row g-3 mb-5">
//         <div class="col-md-3">
//           <div class="card text-bg-dark h-100">
//             <div class="card-body">
//               <p class="text-muted small">Active Conversations</p>
//               <h3>{{ activeConversations }}</h3>
//             </div>
//           </div>
//         </div>
//         <div class="col-md-3">
//           <div class="card text-bg-dark h-100">
//             <div class="card-body">
//               <p class="text-muted small">Resolved Today</p>
//               <h3>{{ resolvedToday }}</h3>
//             </div>
//           </div>
//         </div>
//         <div class="col-md-3">
//           <div class="card text-bg-dark h-100">
//             <div class="card-body">
//               <p class="text-muted small">Avg Response Time</p>
//               <h3>{{ avgResponseTime }}</h3>
//             </div>
//           </div>
//         </div>
//         <div class="col-md-3">
//           <div class="card text-bg-dark h-100">
//             <div class="card-body">
//               <p class="text-muted small">Satisfaction Rate</p>
//               <h3>{{ satisfactionRate }}%</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="row g-4">
//         <!-- Conversations List -->
//         <div class="col-lg-4">
//           <div class="card text-bg-dark h-100">
//             <div class="card-header">
//               <h5>Recent Conversations</h5>
//               <div class="btn-group mt-2">
//                 <button class="btn btn-sm" [ngClass]="{ 'btn-danger': selectedFilter === 'all', 'btn-secondary': selectedFilter !== 'all' }" (click)="selectedFilter = 'all'">All</button>
//                 <button class="btn btn-sm" [ngClass]="{ 'btn-danger': selectedFilter === 'pending', 'btn-secondary': selectedFilter !== 'pending' }" (click)="selectedFilter = 'pending'">Pending</button>
//                 <button class="btn btn-sm" [ngClass]="{ 'btn-danger': selectedFilter === 'high', 'btn-secondary': selectedFilter !== 'high' }" (click)="selectedFilter = 'high'">High Priority</button>
//               </div>
//             </div>
//             <div class="card-body overflow-auto" style="max-height: 500px">
//               <div *ngFor="let conversation of filteredConversations; trackBy: trackByConversation" class="p-2 border-bottom" role="button" (click)="selectConversation(conversation)" [class.bg-secondary-subtle]="selectedConversation?.id === conversation.id">
//                 <div class="d-flex justify-content-between">
//                   <div>
//                     <div class="fw-bold">{{ conversation.user }}</div>
//                     <div class="text-muted small">{{ conversation.platform }}</div>
//                     <div class="text-truncate small">{{ conversation.lastMessage }}</div>
//                   </div>
//                   <div class="text-end">
//                     <span class="badge bg-danger" *ngIf="conversation.priority === 'high'">High</span>
//                     <span class="badge bg-warning text-dark" *ngIf="conversation.priority === 'medium'">Medium</span>
//                     <span class="badge bg-success" *ngIf="conversation.priority === 'low'">Low</span>
//                     <div class="small text-muted">{{ formatTime(conversation.timestamp) }}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <!-- Chat Window -->
//         <div class="col-lg-8">
//           <div class="card text-bg-dark h-100 d-flex flex-column">
//             <ng-container *ngIf="selectedConversation; else noConversation">
//               <div class="card-header d-flex justify-content-between align-items-center">
//                 <div>
//                   <h5 class="mb-0">{{ selectedConversation.user }}</h5>
//                   <small class="text-muted">{{ selectedConversation.platform }} • {{ formatTime(selectedConversation.timestamp) }}</small>
//                 </div>
//                 <div>
//                   <button class="btn btn-sm btn-primary me-2">Transfer</button>
//                   <button class="btn btn-sm btn-success">Resolve</button>
//                 </div>
//               </div>

//               <div class="card-body overflow-auto flex-grow-1" style="max-height: 400px">
//                 <div *ngFor="let message of messages; trackBy: trackByMessage" class="mb-3">
//                   <div class="d-flex" [class.justify-content-end]="message.type === 'user'">
//                     <div [class.bg-danger]="message.type === 'user'" [class.bg-secondary]="message.type === 'bot'" class="rounded px-3 py-2 text-white">
//                       <div class="small">{{ message.content }}</div>
//                       <div class="small text-muted">{{ formatTime(message.timestamp) }}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div class="card-footer">
//                 <div class="d-flex mb-2">
//                   <input type="text" class="form-control me-2" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()" placeholder="Type your response...">
//                   <button class="btn btn-danger" [disabled]="!newMessage.trim()" (click)="sendMessage()">Send</button>
//                 </div>
//                 <div>
//                   <button *ngFor="let response of quickResponses" class="btn btn-outline-light btn-sm me-2 mb-2" (click)="sendQuickResponse(response)">{{ response }}</button>
//                 </div>
//               </div>
//             </ng-container>

//             <ng-template #noConversation>
//               <div class="card-body d-flex justify-content-center align-items-center">
//                 <div class="text-center">
//                   <div class="display-6 text-muted mb-2">
//                     <i class="bi bi-chat-dots"></i>
//                   </div>
//                   <h5 class="text-light">Select a Conversation</h5>
//                   <p class="text-muted">Choose a conversation from the list to start managing</p>
//                 </div>
//               </div>
//             </ng-template>
//           </div>
//         </div>
//       </div>
//     </div>

//     <!-- Make sure Bootstrap Icons are included if you use them -->

//   `,
//   styles: [`
//     .netflix-page {
//       animation: fadeInUp 0.8s ease-out;
//     }

//     @keyframes fadeInUp {
//       from { opacity: 0; transform: translateY(30px); }
//       to { opacity: 1; transform: translateY(0); }
//     }

//     .netflix-title {
//       text-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
//     }

//     .netflix-card {
//       backdrop-filter: blur(10px);
//       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
//       transition: all 0.5s ease;
//     }

//     .netflix-card:hover {
//       transform: translateY(-5px);
//       box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
//     }

//     .netflix-btn {
//       position: relative;
//       overflow: hidden;
//       box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
//     }

//     .netflix-btn::before {
//       content: '';
//       position: absolute;
//       top: 0;
//       left: -100%;
//       width: 100%;
//       height: 100%;
//       background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//       transition: left 0.5s ease;
//     }

//     .netflix-btn:hover::before {
//       left: 100%;
//     }

//     .line-clamp-2 {
//       display: -webkit-box;
//       -webkit-line-clamp: 2;
//       -webkit-box-orient: vertical;
//       overflow: hidden;
//     }

//     /* Custom scrollbar */
//     ::-webkit-scrollbar {
//       width: 8px;
//     }

//     ::-webkit-scrollbar-track {
//       background: #1a1a1a;
//     }

//     ::-webkit-scrollbar-thumb {
//       background: #dc2626;
//       border-radius: 4px;
//     }

//     ::-webkit-scrollbar-thumb:hover {
//       background: #b91c1c;
//     }
//   `]
// })
// export class ChatbotComponent implements OnInit {
//   activeConversations = 12;
//   resolvedToday = 47;
//   avgResponseTime = '2.3m';
//   satisfactionRate = 94;

//   selectedFilter = 'all';
//   selectedConversation: Conversation | null = null;
//   newMessage = '';

//   conversations: Conversation[] = [];
//   messages: ChatMessage[] = [];

//   quickResponses = [
//     'Thank you for contacting Netflix support',
//     'I understand your concern',
//     'Let me check that for you',
//     'Is there anything else I can help with?',
//     'Your issue has been resolved'
//   ];

//   constructor(private adminService: AdminService) {}

//   // ngOnInit(): void {
//   //   this.loadConversations();
//   //   this.loadMessages();
//   // }

//   // loadConversations(): void {
//   //   this.conversations = this.adminService.getConversations();
//   // }

//   // loadMessages(): void {
//   //   this.messages = this.adminService.getChatMessages();
//   // }

//   get filteredConversations(): Conversation[] {
//     if (this.selectedFilter === 'all') {
//       return this.conversations;
//     } else if (this.selectedFilter === 'pending') {
//       return this.conversations.filter(c => c.status === 'pending' || c.status === 'unread');
//     } else if (this.selectedFilter === 'high') {
//       return this.conversations.filter(c => c.priority === 'high');
//     }
//     return this.conversations;
//   }

//   selectConversation(conversation: Conversation): void {
//     this.selectedConversation = conversation;
//     // In a real app, you would load messages for this specific conversation
//   }

//   sendMessage(): void {
//     if (this.newMessage.trim() && this.selectedConversation) {
//       const message: ChatMessage = {
//         id: this.messages.length + 1,
//         type: 'bot',
//         content: this.newMessage.trim(),
//         timestamp: new Date().toISOString()
//       };

//       this.messages.push(message);
//       this.newMessage = '';

//       // Update conversation's last message
//       this.selectedConversation.lastMessage = message.content;
//       this.selectedConversation.timestamp = message.timestamp;
//     }
//   }

//   sendQuickResponse(response: string): void {
//     this.newMessage = response;
//     this.sendMessage();
//   }

//   trackByConversation(index: number, conversation: Conversation): number {
//     return conversation.id;
//   }

//   trackByMessage(index: number, message: ChatMessage): number {
//     return message.id;
//   }

//   formatTime(timestamp: string): string {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

//     if (diffInMinutes < 1) return 'Just now';
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return date.toLocaleDateString();
//   }
// }
