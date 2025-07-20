import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name?: string;
  plan?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is already logged in
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

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Simulate API call
      await this.delay(2000);
      
      // Mock validation
      if (email && password.length >= 4) {
        const user: User = {
          id: '1',
          email: email,
          name: email.split('@')[0],
          plan: 'Premium'
        };

        // Store in localStorage (in real app, use secure storage)
        localStorage.setItem('netflix_token', 'mock_jwt_token');
        localStorage.setItem('netflix_user', JSON.stringify(user));

        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async signup(email: string, password: string, plan: string): Promise<boolean> {
    try {
      // Simulate API call
      await this.delay(1500);
      
      // Mock validation
      if (email && password.length >= 4) {
        const user: User = {
          id: '2',
          email: email,
          name: email.split('@')[0],
          plan: plan
        };

        // Store in localStorage (in real app, use secure storage)
        localStorage.setItem('netflix_token', 'mock_jwt_token');
        localStorage.setItem('netflix_user', JSON.stringify(user));

        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_user');
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}