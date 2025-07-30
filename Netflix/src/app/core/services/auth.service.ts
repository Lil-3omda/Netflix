import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: string;
  email: string;
  fullName?: string;
  plan?: string;
  role: string;
  isEmailVerified?: boolean;
  isAdmin?: boolean;
}

export interface DecodedToken {
  // sub: string;
  email: string;
  role: string;
  exp: number;
  id?: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  getToken(): string | null {
    return localStorage.getItem('netflix_token');
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
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { fullName, email, password });
  }

  verifyOtp(email: string, otpCode: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-otp`, { email, otpCode }).pipe(
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
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_user');
    localStorage.removeItem('userId');

    Object.keys(localStorage).forEach(key => {
      if (
        key.startsWith('netflix_') ||
        key.includes('user') ||
        key.includes('auth') ||
        key.includes('token') ||
        key.includes('profile')
      ) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  getCurrentUser(): DecodedToken | null {
    const token = localStorage.getItem('netflix_token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);

      return {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        exp: decoded.exp,
        isAdmin: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin'
      };
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('netflix_token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
    } catch (e) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('netflix_token');
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
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
