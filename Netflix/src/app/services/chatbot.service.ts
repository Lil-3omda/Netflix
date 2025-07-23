import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from './admin.service';
import { Movie, ChatMessage } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private activeChatSubject = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private adminService: AdminService) {}

  getActiveChats(): Observable<ChatMessage[]> {
    return this.activeChatSubject.asObservable();
  }

  processUserQuery(query: string, userId: string): Observable<string> {
    const response = this.generateBotResponse(query);
    return new BehaviorSubject(response).asObservable();
  }

  private generateBotResponse(query: string): string {
    const lowerQuery = query.toLowerCase();
    
    // Movie search responses
    if (lowerQuery.includes('stranger things')) {
      return 'Stranger Things is available on Netflix! It\'s a popular sci-fi series. The latest season features new episodes released recently. Would you like me to help you find it?';
    }
    
    if (lowerQuery.includes('movie') || lowerQuery.includes('show')) {
      return 'I can help you find movies and shows! We have over 15,000 titles available. What genre are you interested in? Action, Drama, Comedy, Thriller, or something else?';
    }
    
    // Subscription related
    if (lowerQuery.includes('subscription') || lowerQuery.includes('renew')) {
      return 'For subscription issues, I can connect you with our billing team. You can renew your subscription through your account settings or I can transfer you to an admin for immediate assistance.';
    }
    
    // Technical issues
    if (lowerQuery.includes('not working') || lowerQuery.includes('error') || lowerQuery.includes('problem')) {
      return 'I\'m sorry you\'re experiencing technical difficulties. Let me connect you with our technical support team who can assist you better. Meanwhile, try refreshing the app or checking your internet connection.';
    }
    
    // Default response
    return 'Thanks for contacting Netflix support! I\'m here to help with movie recommendations, account questions, and technical issues. How can I assist you today?';
  }

  sendToAdmin(messageId: string, platform: string): Observable<boolean> {
    // Logic to escalate to admin
    return new BehaviorSubject(true).asObservable();
  }

  integrateWithPlatform(platform: 'whatsapp' | 'telegram' | 'facebook'): Observable<boolean> {
    // Integration logic for external platforms
    console.log(`Integrating with ${platform}`);
    return new BehaviorSubject(true).asObservable();
  }
}