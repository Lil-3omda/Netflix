import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminPageType, MenuItem } from '../../models/admin.interfaces';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div 
      class="fixed left-0 top-0 h-full bg-gradient-to-b from-black via-gray-900 to-black border-r border-red-800 border-opacity-30 transition-all duration-500 z-50 netflix-sidebar"
      [class.w-64]="isOpen"
      [class.w-16]="!isOpen">
      
      <!-- Logo/Header -->
      <div class="flex items-center justify-between p-4 border-b border-red-800 border-opacity-20 bg-gradient-to-r from-red-900 to-black">
        <div class="flex items-center space-x-3" *ngIf="isOpen">
          <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg netflix-logo">
            N
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold text-red-500 netflix-text">NETFLIX</span>
            <span class="text-xs text-gray-400 font-medium">Admin Panel</span>
          </div>
        </div>
        
        <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg netflix-logo" *ngIf="!isOpen">
          N
        </div>
        
        <button
          (click)="onToggle()"
          class="p-2 rounded-lg hover:bg-red-800 hover:bg-opacity-30 transition-all duration-300 netflix-hover-effect">
          <svg 
            class="w-5 h-5 transition-transform duration-300"
            [class.rotate-180]="!isOpen"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
      
      <!-- Navigation Menu -->
      <nav class="mt-6 px-2">
        <div 
          *ngFor="let item of menuItems; trackBy: trackByFn"
          class="mb-2">
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            class="w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 netflix-menu-item group no-underline"
            [class.inactive]="true">
            
            <!-- Icon -->
            <div class="relative">
              <svg 
                class="w-6 h-6 transition-all duration-300"
                [class.mr-4]="isOpen"
                [class.mx-auto]="!isOpen"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path [attr.d]="getIconPath(item.icon)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
              
              <!-- Active indicator -->
              <div 
                class="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full animate-pulse active-indicator">
              </div>
            </div>
            
            <!-- Label -->
            <span 
              *ngIf="isOpen"
              class="font-medium transition-all duration-300 group-hover:text-red-400">
              {{ item.label }}
            </span>
          </a>
        </div>
      </nav>
      
      <!-- Bottom section -->
      <div class="absolute bottom-4 left-0 right-0 px-4" *ngIf="isOpen">
        <div class="bg-gradient-to-r from-red-900 to-red-800 rounded-lg p-3 text-center netflix-glow">
          <div class="text-sm font-medium text-white">Netflix Admin</div>
          <div class="text-xs text-red-200">Version 2.0</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .netflix-sidebar {
      backdrop-filter: blur(10px);
      box-shadow: 0 0 50px rgba(220, 38, 38, 0.1);
    }
    
    .netflix-logo {
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
      animation: netflixGlow 3s ease-in-out infinite alternate;
    }
    
    @keyframes netflixGlow {
      from {
        box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
      }
      to {
        box-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
      }
    }
    
    .netflix-text {
      text-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
      animation: textGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes textGlow {
      from {
        text-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
      }
      to {
        text-shadow: 0 0 20px rgba(239, 68, 68, 1);
      }
    }
    
    .netflix-menu-item {
      position: relative;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
    }
    
    .netflix-menu-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2), transparent);
      transition: left 0.5s ease;
    }
    
    .netflix-menu-item:hover::before {
      left: 100%;
    }
    
    .netflix-menu-item.active {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(185, 28, 28, 0.2));
      border: 1px solid rgba(220, 38, 38, 0.3);
      color: #fef2f2;
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
    }
    
    .netflix-menu-item.active .active-indicator {
      display: block;
    }
    
    .netflix-menu-item:not(.active) .active-indicator {
      display: none;
    }
    
    .netflix-menu-item.inactive:hover {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(185, 28, 28, 0.05));
      color: #fca5a5;
      transform: translateX(4px);
    }
    
    .netflix-hover-effect:hover {
      box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
    }
    
    .netflix-glow {
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
      animation: cardGlow 4s ease-in-out infinite alternate;
    }
    
    @keyframes cardGlow {
      from {
        box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
      }
      to {
        box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
      }
    }
  `]
})
export class AdminSidebarComponent {
  @Input() currentPage: AdminPageType = 'dashboard';
  @Input() isOpen = true;
  @Output() pageChange = new EventEmitter<AdminPageType>();
  @Output() toggleSidebar = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { id: 'content', label: 'Content Library', icon: 'film', route: '/admin/content' },
    { id: 'users', label: 'User Management', icon: 'users', route: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: 'chart', route: '/admin/analytics' },
    { id: 'chatbot', label: 'AI Chatbot', icon: 'message-circle', route: '/admin/chatbot' },
    { id: 'communications', label: 'Communications', icon: 'message-square', route: '/admin/communications' },
    { id: 'settings', label: 'Settings', icon: 'settings', route: '/admin/settings' },
  ];

  onPageChange(page: AdminPageType): void {
    this.pageChange.emit(page);
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.id;
  }

  getIconPath(icon: string): string {
    const iconPaths: { [key: string]: string } = {
      'dashboard': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      'film': 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8',
      'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      'chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      'message-circle': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      'message-square': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    };
    return iconPaths[icon] || iconPaths['dashboard'];
  }
}