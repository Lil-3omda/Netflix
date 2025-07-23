export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  releaseDate: Date;
  duration: number;
  rating: number;
  director: string;
  cast: string[];
  posterUrl: string;
  trailerUrl: string;
  contentUrl: string;
  status: 'active' | 'inactive' | 'coming-soon';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'basic' | 'standard' | 'premium';
  registrationDate: Date;
  lastActive: Date;
  status: 'active' | 'suspended' | 'inactive';
  watchHistory: string[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  platform: 'whatsapp' | 'telegram' | 'webchat' | 'facebook';
  status: 'pending' | 'responded' | 'escalated';
  adminId?: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalMovies: number;
  popularMovies: Movie[];
  userGrowth: { date: Date; count: number }[];
  watchTimeStats: { genre: string; hours: number }[];
}