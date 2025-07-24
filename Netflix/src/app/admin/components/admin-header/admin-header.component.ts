import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header class="bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-800 border-opacity-30 px-6 py-4 netflix-header">
      <div class="flex items-center justify-between">
        <!-- Left Section -->
        <div class="flex items-center space-x-4">
          <!-- Menu Toggle -->
          <button
            (click)="onMenuToggle()"
            class="p-2 rounded-lg hover:bg-red-800 hover:bg-opacity-30 transition-all duration-300 netflix-hover-effect">
            <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Search Bar -->
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              placeholder="Search users, content, analytics..."
              class="w-80 bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 rounded-xl pl-10 pr-4 py-2 border border-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all duration-300 netflix-search">
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Quick Actions -->
          <div class="hidden lg:flex items-center space-x-3">
            <button class="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-all duration-300">
              <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Content
            </button>
            <button class="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-all duration-300">
              <svg class="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Add User
            </button>
          </div>

          <!-- Notifications -->
          <div class="relative">
            <button
              (click)="toggleNotifications()"
              class="p-2 rounded-lg hover:bg-red-800 hover:bg-opacity-30 transition-all duration-300 netflix-hover-effect relative">
              <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <!-- Notification Badge -->
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
                {{ notificationCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <div 
              *ngIf="showNotifications"
              class="absolute right-0 top-12 w-80 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 shadow-2xl z-50 netflix-dropdown">
              <div class="p-4 border-b border-gray-700">
                <h3 class="text-lg font-semibold text-white">Notifications</h3>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div 
                  *ngFor="let notification of notifications; trackBy: trackByNotification"
                  class="p-4 border-b border-gray-700 hover:bg-gray-800 hover:bg-opacity-50 transition-all duration-300">
                  <div class="flex items-start space-x-3">
                    <div 
                      class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      [ngClass]="{
                        'bg-blue-500': notification.type === 'info',
                        'bg-green-500': notification.type === 'success',
                        'bg-yellow-500': notification.type === 'warning',
                        'bg-red-500': notification.type === 'error'
                      }">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path [attr.d]="getNotificationIcon(notification.type)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-white font-medium">{{ notification.title }}</p>
                      <p class="text-xs text-gray-400 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-500 mt-2">{{ formatTime(notification.timestamp) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 border-t border-gray-700">
                <button class="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-all duration-300">
                  Mark All as Read
                </button>
              </div>
            </div>
          </div>

          <!-- User Profile -->
          <div class="relative">
            <button
              (click)="toggleProfile()"
              class="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-800 hover:bg-opacity-30 transition-all duration-300 netflix-hover-effect">
              <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center netflix-avatar">
                <span class="text-white font-semibold text-sm">{{ userInitials }}</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-white">{{ userName }}</p>
                <p class="text-xs text-gray-400">{{ userRole }}</p>
              </div>
              <svg 
                class="w-4 h-4 text-gray-400 transition-transform duration-300"
                [class.rotate-180]="showProfile"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <div 
              *ngIf="showProfile"
              class="absolute right-0 top-12 w-64 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 shadow-2xl z-50 netflix-dropdown">
              <div class="p-4 border-b border-gray-700">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center netflix-avatar">
                    <span class="text-white font-bold">{{ userInitials }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-white">{{ userName }}</p>
                    <p class="text-sm text-gray-400">{{ userRole }}</p>
                    <p class="text-xs text-gray-500">{{ userEmail }}</p>
                  </div>
                </div>
              </div>
              <div class="p-2">
                <button 
                  *ngFor="let item of profileMenuItems"
                  class="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl hover:bg-gray-800 hover:bg-opacity-50 transition-all duration-300 group">
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path [attr.d]="item.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                  <span class="text-gray-300 group-hover:text-white transition-colors duration-300">{{ item.label }}</span>
                </button>
              </div>
              <div class="p-4 border-t border-gray-700">
                <button 
                  (click)="onLogout()"
                  class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all duration-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .netflix-header {
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .netflix-search {
      backdrop-filter: blur(10px);
    }
    
    .netflix-search:focus {
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }
    
    .netflix-hover-effect:hover {
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
    }
    
    .netflix-avatar {
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
      animation: avatarGlow 3s ease-in-out infinite alternate;
    }
    
    @keyframes avatarGlow {
      from {
        box-shadow: 0 0 15px rgba(220, 38, 38, 0.4);
      }
      to {
        box-shadow: 0 0 25px rgba(220, 38, 38, 0.7);
      }
    }
    
    .netflix-dropdown {
      animation: dropdownSlide 0.3s ease-out;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    
    @keyframes dropdownSlide {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #dc2626;
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #b91c1c;
    }
  `]
})
export class AdminHeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  searchQuery = '';
  showNotifications = false;
  showProfile = false;
  notificationCount = 3;
  
  userName = 'Admin User';
  userEmail = 'admin@netflix.com';
  userRole = 'Super Admin';
  userInitials = 'AU';

  notifications = [
    {
      id: 1,
      type: 'info',
      title: 'New User Registration',
      message: '5 new users registered in the last hour',
      timestamp: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Server Load',
      message: 'Server CPU usage is above 80%',
      timestamp: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
    },
    {
      id: 3,
      type: 'success',
      title: 'Content Upload Complete',
      message: 'New episode of "Stranger Things" uploaded successfully',
      timestamp: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
    }
  ];

  profileMenuItems = [
    {
      label: 'Profile Settings',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    },
    {
      label: 'Account Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    },
    {
      label: 'Notifications',
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
    },
    {
      label: 'Help & Support',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  onSearch(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchQuery);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false; // Close profile if open
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    this.showNotifications = false; // Close notifications if open
  }

  onLogout(): void {
    // Implement logout functionality
    console.log('Logging out...');
  }

  trackByNotification(index: number, notification: any): number {
    return notification.id;
  }

  getNotificationIcon(type: string): string {
    const iconPaths: { [key: string]: string } = {
      'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'success': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'warning': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      'error': 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return iconPaths[type] || iconPaths['info'];
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  }
}