export type AdminPageType = 'dashboard' | 'content' | 'users' | 'analytics' | 'chatbot' | 'communications' | 'settings';

export interface User {
  id: number;
  name: string;
  email: string;
  subscription: 'Basic' | 'Standard' | 'Premium';
  status: 'Active' | 'Inactive' | 'Suspended';
  joinDate: string;
  lastActive: string;
  region: string;
}

export interface Content {
  id: number;
  title: string;
  type: 'Movie' | 'Series';
  genre: string;
  rating: number;
  views: string;
  status: string;
  releaseDate: string;
  seasons?: number;
  duration?: string;
}

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  user: string;
  platform: string;
  lastMessage: string;
  timestamp: string;
  status: 'unread' | 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: any;
  color: string;
  active: number;
}