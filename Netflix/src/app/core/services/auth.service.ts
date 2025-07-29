import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  plan?: string;
  isEmailVerified?: boolean;

  // Add role if you want to support Role-Based UI logic
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

   getToken(): string | null {
    return localStorage.getItem('netflix_token');
   }

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('netflix_token');
    const user = localStorage.getItem('netflix_user');

    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('netflix_token', response.token);
          localStorage.setItem('netflix_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  signup(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, {
      fullName,
      email,
      password
    });
  }

  verifyOtp(email: string, otpCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-otp`, {
      email,
      otpCode
    }).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('netflix_token', response.token);
          localStorage.setItem('netflix_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  resendOtp(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/resend-otp`, { email });
  }

  logout(): void {
    // Clear all Netflix-related localStorage items
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_user');
    localStorage.removeItem('userId');

    // Clear any other authentication-related items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('netflix_') ||
          key.includes('user') ||
          key.includes('auth') ||
          key.includes('token') ||
          key.includes('profile')) {
        localStorage.removeItem(key);
      }
    });

    // Clear session storage as well
    sessionStorage.clear();

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Navigate to home page
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/email-exists?email=${encodeURIComponent(email)}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  verifyResetOtp(email: string, otpCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-reset-otp`, { email, otpCode });
  }

  resetPassword(email: string, resetToken: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { 
      email, 
      resetToken, 
      newPassword 
    });
  }

  changeUserRole(userId: string, newRole: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/change-role`, {
      userId,
      newRole
    });
  }
}
