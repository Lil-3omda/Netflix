import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo">
        <img src="https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg" alt="Netflix Admin" class="logo-img">
        <h2>Netflix Admin</h2>
      </div>
      
      <nav class="nav-menu">
        <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item">
          <span class="icon">📊</span>
          <span>Dashboard</span>
        </a>
        
        <a routerLink="/admin/movies" routerLinkActive="active" class="nav-item">
          <span class="icon">🎬</span>
          <span>Movies & Shows</span>
        </a>
        
        <a routerLink="/admin/users" routerLinkActive="active" class="nav-item">
          <span class="icon">👥</span>
          <span>Users</span>
        </a>
        
        <a routerLink="/admin/chat" routerLinkActive="active" class="nav-item">
          <span class="icon">💬</span>
          <span>Chat Support</span>
        </a>
        
        <a routerLink="/admin/analytics" routerLinkActive="active" class="nav-item">
          <span class="icon">📈</span>
          <span>Analytics</span>
        </a>
        
        <a routerLink="/admin/settings" routerLinkActive="active" class="nav-item">
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: linear-gradient(180deg, #141414 0%, #000000 100%);
      border-right: 1px solid #333;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }

    .logo {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #333;
    }

    .logo-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    .logo h2 {
      color: #E50914;
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .nav-menu {
      padding: 20px 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background-color: rgba(229, 9, 20, 0.1);
      border-left-color: #E50914;
    }

    .nav-item.active {
      background-color: rgba(229, 9, 20, 0.2);
      border-left-color: #E50914;
      color: #E50914;
    }

    .icon {
      margin-right: 12px;
      font-size: 1.2rem;
    }
  `]
})
export class SidebarComponent {}