import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="account-redirect">
      <div class="loading-spinner"></div>
      <p>Redirecting...</p>
    </div>
  `,
  styles: [`
    .account-redirect {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #141414;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #333;
      border-top: 4px solid #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    p {
      font-size: 18px;
      margin: 0;
    }
  `]
})
export class AccountComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Simulate checking authentication status
    const isLoggedIn = this.checkAuthStatus();

    setTimeout(() => {
      if (isLoggedIn) {
        this.router.navigate(['/browse']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  private checkAuthStatus(): boolean {
    // Simple auth check - in real app this would check JWT token, session, etc.
    return localStorage.getItem('netflix_user') !== null;
  }
}
