import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface ChatRequest {
  conversationId?: number;
  message: string;
  includeRecommendations?: boolean;
}

export interface ChatResponse {
  conversationId: number;
  response: string;
  recommendations?: MovieRecommendation[];
  timestamp: string;
  tokensUsed: number;
}

export interface MovieRecommendation {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  category: string;
  reason: string;
}

export interface Conversation {
  id: number;
  title: string;
  createdAt: string;
  lastMessageAt: string;
  messages: ChatMessageDto[];
}

export interface ChatMessageDto {
  id: number;
  role: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {
  private apiUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {}

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.apiUrl}/message`, request);
  }

  getRecommendations(message?: string): Observable<{ recommendations: MovieRecommendation[]; timestamp: string }> {
    return this.http.post<{ recommendations: MovieRecommendation[]; timestamp: string }>(
      `${this.apiUrl}/recommend`, 
      { message: message || 'Recommend me some movies' }
    );
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/conversations`);
  }

  getConversation(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  createConversation(initialMessage: string): Observable<{ conversationId: number }> {
    return this.http.post<{ conversationId: number }>(
      `${this.apiUrl}/conversations`, 
      { initialMessage }
    );
  }
}