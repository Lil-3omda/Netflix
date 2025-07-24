import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Conversation, Message, CreateConversation, CreateMessage } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private apiUrl = `${environment.apiUrl}/communication`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUnreadCount();
  }

  // Conversation methods
  createConversation(conversation: CreateConversation): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/conversations`, conversation);
  }

  getCustomerConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations/customer`);
  }

  getAdminConversations(adminId?: string): Observable<Conversation[]> {
    const url = adminId 
      ? `${this.apiUrl}/conversations/admin?adminId=${adminId}`
      : `${this.apiUrl}/conversations/admin`;
    return this.http.get<Conversation[]>(url);
  }

  getConversation(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  assignConversation(conversationId: number, adminId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/conversations/${conversationId}/assign`, JSON.stringify(adminId), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateConversationStatus(conversationId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/conversations/${conversationId}/status`, JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Message methods
  sendMessage(message: CreateMessage): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages`, message);
  }

  getConversationMessages(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversations/${conversationId}/messages`);
  }

  markMessageAsRead(messageId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/messages/${messageId}/read`, {});
  }

  markConversationAsRead(conversationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/conversations/${conversationId}/read`, {});
  }

  getUnreadCount(): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.apiUrl}/unread-count`);
  }

  // Chatbot methods
  sendChatbotMessage(message: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/chatbot`, JSON.stringify(message), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getChatbotResponse(message: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.apiUrl}/chatbot/response`, JSON.stringify(message), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Utility methods
  private loadUnreadCount(): void {
    this.getUnreadCount().subscribe({
      next: (result) => this.unreadCountSubject.next(result.unreadCount),
      error: (error) => console.error('Error loading unread count:', error)
    });
  }

  refreshUnreadCount(): void {
    this.loadUnreadCount();
  }

  updateUnreadCount(count: number): void {
    this.unreadCountSubject.next(count);
  }
}