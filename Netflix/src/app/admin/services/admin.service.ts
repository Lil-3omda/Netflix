import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminPageType, AnalyticsData } from '../models/admin.interfaces';
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

  getUsers(page: number = 1, pageSize: number = 10, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users?page=${page}&pageSize=${pageSize}&search=${search}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/users/${id}`);
  }

  getContentStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/content/statistics`);
  }

  getAnalyticsOverview(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(`${this.apiUrl}/admin/Subscriptions/statistics`);
  }

  getConversationStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/conversations/stats`);
  }

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

  getSubscriptionPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/Subscriptions/plans`);
  }

  getSubscriptionStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Subscriptions/statistics`);
  }

  getUserSubscriptions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/Subscriptions/users`)
      .pipe(
        map((response: any) => {
          // Return the full response to access both grouped data and all subscriptions
          return {
            userSubscriptions: response.userSubscriptions || [],
            allSubscriptions: response.allSubscriptions || [],
            totalUsers: response.totalUsers || 0,
            totalSubscriptions: response.totalSubscriptions || 0,
            activeSubscriptions: response.activeSubscriptions || 0,
            expiredSubscriptions: response.expiredSubscriptions || 0,
            usersWithPlanChanges: response.usersWithPlanChanges || 0
          };
        })
      );
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
  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}/status`, { status });
  }

  makeUserAdmin(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}/make-admin`, {});
  }

  removeAdminRole(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}/remove-admin`, {});
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/users/${id}`, user);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/users`, user);
  }






}
