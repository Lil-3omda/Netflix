import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="header-left">
        <h1>Netflix Admin Dashboard</h1>
      </div>
      
      <div class="header-right">
        <div class="notification-icon">
          <span class="icon">🔔</span>
          <span class="badge">3</span>
        </div>
        
        <div class="admin-profile">
          <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg" alt="Admin" class="profile-pic">
          <span class="admin-name">Admin User</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 70px;
      background: #141414;
      border-bottom: 1px solid #333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      margin-left: 250px;
      position: fixed;
      top: 0;
      right: 0;
      left: 250px;
      z-index: 999;
    }

    .header-left h1 {
      color: #fff;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .notification-icon {
      position: relative;
      color: #fff;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.3s ease;
    }

    .notification-icon:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .notification-icon .icon {
      font-size: 1.5rem;
    }

    .badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #E50914;
      color: white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
    }

    .profile-pic {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 2px solid #E50914;
    }

    .admin-name {
      font-weight: 500;
    }
  `]
})
export class HeaderComponent {}