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

  restoreCategory(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/Categories/restore/${id}`,id);
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


  extendSubscription(userId: string, days: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/Subscriptions/users/${userId}/extend`, { days });
  }


  updateUserSubscription(subscriptionId: number, payload: { planId: number }) {
    return this.http.put(`${this.apiUrl}/admin/Subscriptions/${subscriptionId}`, payload);
  }

  cancelSubscription(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/Subscriptions/${id}`);
  }

  // User management methods
  makeUserAdmin(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/make-admin`, { userId });
  }

  removeAdminRole(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/remove-admin`, { userId });
  }
}
