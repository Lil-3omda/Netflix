import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminPageType, User, Content, StatCardData, AnalyticsData, ChatMessage, Conversation } from '../models/admin.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentPageSubject = new BehaviorSubject<AdminPageType>('dashboard');
  private sidebarOpenSubject = new BehaviorSubject<boolean>(true);
  private apiUrl = environment.apiUrl;

  currentPage$ = this.currentPageSubject.asObservable();
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCurrentPage(page: AdminPageType): void {
    this.currentPageSubject.next(page);
  }

  toggleSidebar(): void {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  setSidebarOpen(open: boolean): void {
    this.sidebarOpenSubject.next(open);
  }

  // API methods
  getUsers(page: number = 1, pageSize: number = 10, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users?page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users/${id}`);
  }

  updateUserStatus(id: string, status: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/users/${id}/status`, status);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/users/${id}`);
  }

  getContentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/content/statistics`);
  }

  getAnalyticsOverview(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/analytics/overview`);
  }

  getConversationStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/conversations/stats`);
  }

  // Category management methods - Fixed to match API
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Categories`);
  }

  getCategoryStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Categories/statistics`);
  }

  createCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/Categories`, categoryData);
  }

  updateCategory(id: number, categoryData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/Categories/${id}`, categoryData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/Categories/${id}`);
  }

  // Review management methods - Fixed to match API
  getReviews(page: number = 1, pageSize: number = 200): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Reviews?page=${page}&pageSize=${pageSize}`);
  }

  getReviewsByVideo(videoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Reviews/video/${videoId}`);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/Reviews/${reviewId}`);
  }

  getReviewStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Reviews/statistics`);
  }

  getFlaggedReviews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Reviews/flagged`);
  }

  // Subscription management methods - Fixed to match API
  getSubscriptionPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/Subscriptions/plans`);
  }

  getUserSubscriptions(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/admin/Subscriptions/users`)
      .pipe(
        map((response: any) => {
          // Handle both direct array response and wrapped response
          if (response.subscriptions) {
            return response.subscriptions;
          } else if (Array.isArray(response)) {
            return response;
          } else {
            return [];
          }
        })
      );
  }

  getSubscriptionStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Subscriptions/statistics`);
  }

  createSubscriptionPlan(planData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/Subscriptions/plans`, planData);
  }

  updateSubscriptionPlan(id: number, planData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/Subscriptions/plans/${id}`, planData);
  }

  deleteSubscriptionPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/Subscriptions/plans/${id}`);
  }

  extendSubscription(userId: string, days: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/Subscriptions/users/${userId}/extend`, { days });
  }

  cancelSubscription(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/Subscriptions/users/${userId}/cancel`, {});
  }

  // Mock data methods (keep for fallback)
  getStats(): StatCardData[] {
    return [
      {
        title: 'Total Subscribers',
        value: '247.15M',
        change: '+2.3%',
        icon: 'users',
        color: 'text-blue-400',
        trend: 'up'
      },
      {
        title: 'Monthly Revenue',
        value: '$8.2B',
        change: '+15.2%',
        icon: 'dollar-sign',
        color: 'text-green-400',
        trend: 'up'
      },
      {
        title: 'Content Library',
        value: '15,273',
        change: '+156',
        icon: 'play',
        color: 'text-purple-400',
        trend: 'up'
      },
      {
        title: 'Watch Hours',
        value: '1.2B',
        change: '+8.7%',
        icon: 'clock',
        color: 'text-yellow-400',
        trend: 'up'
      }
    ];
  }

  // getUsers(): User[] {
  //   return [
  //     {
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john.doe@email.com',
  //       subscription: 'Premium',
  //       status: 'Active',
  //       joinDate: '2023-01-15',
  //       lastActive: '2024-01-20',
  //       region: 'North America',
  //       avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  //     },
  //     {
  //       id: 2,
  //       name: 'Jane Smith',
  //       email: 'jane.smith@email.com',
  //       subscription: 'Standard',
  //       status: 'Active',
  //       joinDate: '2023-03-22',
  //       lastActive: '2024-01-19',
  //       region: 'Europe',
  //       avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e4a9ca?w=150'
  //     },
  //     // Add more mock users...
  //   ];
  // }

  getContent(): Content[] {
    return [
      {
        id: 1,
        title: 'Stranger Things 4',
        type: 'Series',
        genre: 'Sci-Fi',
        rating: 9.1,
        views: '1.2B',
        status: 'Published',
        releaseDate: '2022-05-27',
        seasons: 4,
        thumbnail: 'https://images.unsplash.com/photo-1489599511410-1bdda7a7bd89?w=400',
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
        trailer: 'https://example.com/trailer1'
      },
      {
        id: 2,
        title: 'The Gray Man',
        type: 'Movie',
        genre: 'Action',
        rating: 7.8,
        views: '856M',
        status: 'Published',
        releaseDate: '2022-07-22',
        duration: '2h 9m',
        thumbnail: 'https://images.unsplash.com/photo-1489599511410-1bdda7a7bd89?w=400',
        description: 'A CIA operative finds himself hunted by his own agency.',
        trailer: 'https://example.com/trailer2'
      },
      // Add more mock content...
    ];
  }

  getAnalyticsData(): AnalyticsData {
    return {
      revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue (Billions)',
          data: [7.2, 7.8, 8.1, 8.0, 8.3, 8.2],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2
        }]
      },
      users: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Subscribers (Millions)',
          data: [240, 242, 244, 245, 246, 247],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2
        }]
      },
      content: {
        labels: ['Movies', 'Series', 'Documentaries', 'Originals'],
        datasets: [{
          label: 'Content Count',
          data: [8500, 4200, 1800, 773],
          backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#8b5cf6']
        }]
      },
      engagement: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Watch Hours (Millions)',
          data: [120, 135, 125, 140, 155, 180, 170],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2
        }]
      }
    };
  }

  getChatMessages(): ChatMessage[] {
    return [
      {
        id: 1,
        type: 'user',
        content: 'Hello, I need help with my subscription',
        timestamp: '2024-01-20T10:30:00Z'
      },
      {
        id: 2,
        type: 'bot',
        content: 'Hi! I\'d be happy to help you with your subscription. What specific issue are you experiencing?',
        timestamp: '2024-01-20T10:30:30Z'
      }
    ];
  }
  updateUserSubscription(id: number, dto: { planId: number }) {
    return this.http.put(`/api/admin/Subscriptions/plans/${id}`, dto);
  }


  getConversations(): Conversation[] {
    return [
      {
        id: 1,
        user: 'John Doe',
        platform: 'Website',
        lastMessage: 'Thank you for your help!',
        timestamp: '2024-01-20T10:45:00Z',
        status: 'resolved',
        priority: 'medium'
      },
      {
        id: 2,
        user: 'Jane Smith',
        platform: 'Mobile App',
        lastMessage: 'I still need assistance',
        timestamp: '2024-01-20T09:30:00Z',
        status: 'in-progress',
        priority: 'high'
      }
    ];
  }
}
