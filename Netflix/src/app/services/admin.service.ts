import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie, User, ChatMessage, Analytics } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api';
  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private usersSubject = new BehaviorSubject<User[]>([]);
  private chatMessagesSubject = new BehaviorSubject<ChatMessage[]>([]);

  constructor(private http: HttpClient) {
    this.loadMockData();
  }

  // Movies Management
  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  addMovie(movie: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Observable<Movie> {
    const newMovie: Movie = {
      ...movie,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const currentMovies = this.moviesSubject.value;
    this.moviesSubject.next([...currentMovies, newMovie]);
    return new BehaviorSubject(newMovie).asObservable();
  }

  updateMovie(id: string, updates: Partial<Movie>): Observable<Movie> {
    const movies = this.moviesSubject.value;
    const index = movies.findIndex(m => m.id === id);
    if (index !== -1) {
      movies[index] = { ...movies[index], ...updates, updatedAt: new Date() };
      this.moviesSubject.next([...movies]);
      return new BehaviorSubject(movies[index]).asObservable();
    }
    throw new Error('Movie not found');
  }

  deleteMovie(id: string): Observable<boolean> {
    const movies = this.moviesSubject.value.filter(m => m.id !== id);
    this.moviesSubject.next(movies);
    return new BehaviorSubject(true).asObservable();
  }

  // Users Management
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  updateUserStatus(userId: string, status: User['status']): Observable<User> {
    const users = this.usersSubject.value;
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].status = status;
      this.usersSubject.next([...users]);
      return new BehaviorSubject(users[index]).asObservable();
    }
    throw new Error('User not found');
  }

  // Chat Management
  getChatMessages(): Observable<ChatMessage[]> {
    return this.chatMessagesSubject.asObservable();
  }

  respondToMessage(messageId: string, response: string, adminId: string): Observable<boolean> {
    const messages = this.chatMessagesSubject.value;
    const index = messages.findIndex(m => m.id === messageId);
    if (index !== -1) {
      messages[index].status = 'responded';
      messages[index].adminId = adminId;
      this.chatMessagesSubject.next([...messages]);
    }
    return new BehaviorSubject(true).asObservable();
  }

  // Analytics
  getAnalytics(): Observable<Analytics> {
    const mockAnalytics: Analytics = {
      totalUsers: 125000,
      activeUsers: 89000,
      totalMovies: 15000,
      popularMovies: this.moviesSubject.value.slice(0, 5),
      userGrowth: [
        { date: new Date('2024-01-01'), count: 95000 },
        { date: new Date('2024-02-01'), count: 105000 },
        { date: new Date('2024-03-01'), count: 115000 },
        { date: new Date('2024-04-01'), count: 125000 }
      ],
      watchTimeStats: [
        { genre: 'Action', hours: 125000 },
        { genre: 'Drama', hours: 98000 },
        { genre: 'Comedy', hours: 87000 },
        { genre: 'Thriller', hours: 76000 },
        { genre: 'Romance', hours: 54000 }
      ]
    };
    return new BehaviorSubject(mockAnalytics).asObservable();
  }

  private loadMockData(): void {
    // Mock Movies Data
    const mockMovies: Movie[] = [
      {
        id: '1',
        title: 'Stranger Things',
        description: 'A group of young friends in Hawkins, Indiana, encounter mysterious supernatural forces.',
        genre: ['Sci-Fi', 'Horror', 'Drama'],
        releaseDate: new Date('2016-07-15'),
        duration: 51,
        rating: 8.7,
        director: 'The Duffer Brothers',
        cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'David Harbour'],
        posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
        trailerUrl: 'https://example.com/trailer1',
        contentUrl: 'https://example.com/content1',
        status: 'active',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2',
        title: 'The Crown',
        description: 'The reign of Queen Elizabeth II after the death of her father King George VI.',
        genre: ['Drama', 'History', 'Biography'],
        releaseDate: new Date('2016-11-04'),
        duration: 58,
        rating: 8.6,
        director: 'Peter Morgan',
        cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
        posterUrl: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg',
        trailerUrl: 'https://example.com/trailer2',
        contentUrl: 'https://example.com/content2',
        status: 'active',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02')
      }
    ];

    // Mock Users Data
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'john.doe@email.com',
        name: 'John Doe',
        subscriptionType: 'premium',
        registrationDate: new Date('2023-06-15'),
        lastActive: new Date('2024-01-15'),
        status: 'active',
        watchHistory: ['1', '2']
      },
      {
        id: '2',
        email: 'jane.smith@email.com',
        name: 'Jane Smith',
        subscriptionType: 'standard',
        registrationDate: new Date('2023-08-20'),
        lastActive: new Date('2024-01-14'),
        status: 'active',
        watchHistory: ['1']
      }
    ];

    // Mock Chat Messages
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        message: 'Hi, I cannot find the new episode of Stranger Things. Can you help?',
        timestamp: new Date('2024-01-15T10:30:00'),
        platform: 'whatsapp',
        status: 'pending'
      },
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        message: 'My subscription expired, how can I renew it?',
        timestamp: new Date('2024-01-15T11:45:00'),
        platform: 'webchat',
        status: 'pending'
      }
    ];

    this.moviesSubject.next(mockMovies);
    this.usersSubject.next(mockUsers);
    this.chatMessagesSubject.next(mockMessages);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}