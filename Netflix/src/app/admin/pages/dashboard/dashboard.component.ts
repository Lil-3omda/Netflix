import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { StatCardData } from '../../models/admin.interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-netflix-black text-white">
      <!-- Hero Section -->
      <div class="relative overflow-hidden bg-gradient-to-r from-netflix-red via-red-700 to-netflix-red-dark rounded-3xl mb-8 p-8">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
        <div class="relative z-10">
          <h1 class="text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Netflix Admin Dashboard
          </h1>
          <p class="text-xl text-red-100 mb-6">
            Monitor and manage your Netflix platform in real-time
          </p>
          <div class="flex space-x-4">
            <button class="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30">
              View Analytics
            </button>
            <button class="px-6 py-3 bg-black bg-opacity-30 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-opacity-50 transition-all duration-300 border border-white border-opacity-20">
              Export Report
            </button>
          </div>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          *ngFor="let stat of stats; trackBy: trackByFn"
          class="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-netflix-red transition-all duration-500 hover:scale-105 cursor-pointer">
          
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0 bg-gradient-to-br from-netflix-red to-transparent"></div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-netflix-red to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path [attr.d]="getIconPath(stat.icon)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </div>
              <div class="text-right">
                <div 
                  class="text-sm font-medium flex items-center"
                  [ngClass]="{
                    'text-green-400': stat.trend === 'up',
                    'text-red-400': stat.trend === 'down',
                    'text-gray-400': stat.trend === 'neutral'
                  }">
                  {{ stat.change }}
                  <svg 
                    *ngIf="stat.trend === 'up'"
                    class="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l10-10M17 7v10M17 7H7"></path>
                  </svg>
                  <svg 
                    *ngIf="stat.trend === 'down'"
                    class="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17l-10-10M7 7v10M7 7h10"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <h3 class="text-gray-400 text-sm font-medium mb-2">{{ stat.title }}</h3>
            <p class="text-3xl font-bold text-white group-hover:text-netflix-red transition-colors duration-300">
              {{ stat.value }}
            </p>
          </div>
          
          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-netflix-red to-red-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Quick Actions -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h3 class="text-xl font-bold mb-6 flex items-center">
            <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            Quick Actions
          </h3>
          <div class="space-y-3">
            <button 
              *ngFor="let action of quickActions"
              class="w-full flex items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl hover:bg-opacity-80 transition-all duration-300 text-left group">
              <div class="w-10 h-10 bg-gradient-to-br from-netflix-red to-red-700 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path [attr.d]="action.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </div>
              <div>
                <div class="font-semibold text-white group-hover:text-netflix-red transition-colors duration-300">
                  {{ action.title }}
                </div>
                <div class="text-sm text-gray-400">{{ action.description }}</div>
              </div>
            </button>
          </div>
        </div>

        <!-- Top Content -->
        <div class="lg:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h3 class="text-xl font-bold mb-6 flex items-center">
            <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8"></path>
              </svg>
            </div>
            Top Performing Content
          </h3>
          <div class="space-y-4">
            <div 
              *ngFor="let content of topContent; trackBy: trackByContentFn"
              class="flex items-center p-4 bg-gray-800 bg-opacity-30 rounded-xl hover:bg-opacity-60 transition-all duration-300 group">
              
              <!-- Rank -->
              <div class="w-12 h-12 bg-gradient-to-br from-netflix-red to-red-700 rounded-xl flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                {{ content.rank }}
              </div>
              
              <!-- Thumbnail -->
              <div class="w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mr-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8"></path>
                </svg>
              </div>
              
              <!-- Content Info -->
              <div class="flex-1">
                <h4 class="font-semibold text-white group-hover:text-netflix-red transition-colors duration-300">
                  {{ content.title }}
                </h4>
                <p class="text-sm text-gray-400">{{ content.type }} • {{ content.genre }}</p>
              </div>
              
              <!-- Stats -->
              <div class="text-right">
                <p class="font-bold text-white">{{ content.views }}</p>
                <p class="text-sm text-green-400">{{ content.change }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              Revenue Trends
            </h3>
            <div class="flex space-x-2">
              <button class="px-3 py-1 bg-netflix-red text-white rounded-lg text-sm font-medium">Monthly</button>
              <button class="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors duration-300">Yearly</button>
            </div>
          </div>
          <div class="h-64 bg-gray-800 bg-opacity-50 rounded-xl p-4 flex items-center justify-center border border-gray-600">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-netflix-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <p class="text-gray-300 font-semibold">Revenue Analytics</p>
              <p class="text-sm text-gray-500">Interactive chart will load here</p>
            </div>
          </div>
        </div>

        <!-- User Growth Chart -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              User Growth
            </h3>
            <div class="flex space-x-2">
              <button class="px-3 py-1 bg-netflix-red text-white rounded-lg text-sm font-medium">Active</button>
              <button class="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors duration-300">Total</button>
            </div>
          </div>
          <div class="h-64 bg-gray-800 bg-opacity-50 rounded-xl p-4 flex items-center justify-center border border-gray-600">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <p class="text-gray-300 font-semibold">User Analytics</p>
              <p class="text-sm text-gray-500">Interactive chart will load here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h3 class="text-xl font-bold mb-6 flex items-center">
          <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          Recent Activity
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            *ngFor="let activity of recentActivities; trackBy: trackByActivityFn"
            class="flex items-start p-4 bg-gray-800 bg-opacity-30 rounded-xl hover:bg-opacity-60 transition-all duration-300">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-3"
              [ngClass]="{
                'bg-green-500': activity.type === 'upload',
                'bg-blue-500': activity.type === 'user',
                'bg-yellow-500': activity.type === 'system',
                'bg-red-500': activity.type === 'alert'
              }">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path [attr.d]="getActivityIcon(activity.type)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-white font-medium">{{ activity.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-netflix-black {
      background-color: #000000;
    }
    
    .bg-netflix-red {
      background-color: #e50914;
    }
    
    .bg-netflix-red-dark {
      background-color: #b81d24;
    }
    
    .text-netflix-red {
      color: #e50914;
    }
    
    .border-netflix-red {
      border-color: #e50914;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .netflix-dashboard {
      animation: fadeInUp 0.8s ease-out;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #e50914;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #b81d24;
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: StatCardData[] = [];
  topContent = [
    { rank: 1, title: 'Stranger Things 4', type: 'Series', genre: 'Sci-Fi', views: '1.2B', change: '+15%' },
    { rank: 2, title: 'Wednesday', type: 'Series', genre: 'Comedy', views: '987M', change: '+12%' },
    { rank: 3, title: 'The Gray Man', type: 'Movie', genre: 'Action', views: '856M', change: '+8%' },
    { rank: 4, title: 'Glass Onion', type: 'Movie', genre: 'Mystery', views: '734M', change: '+5%' },
    { rank: 5, title: 'Dahmer', type: 'Series', genre: 'Crime', views: '692M', change: '+3%' }
  ];

  recentActivities = [
    { type: 'upload', message: 'New content "The Night Agent" uploaded', time: '2 minutes ago' },
    { type: 'user', message: 'New user registered from Germany', time: '5 minutes ago' },
    { type: 'system', message: 'System maintenance completed', time: '1 hour ago' },
    { type: 'alert', message: 'High server load detected', time: '2 hours ago' }
  ];

  quickActions = [
    { 
      title: 'Add New Content', 
      description: 'Upload movies and series',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    },
    { 
      title: 'Manage Users', 
      description: 'View and edit user accounts',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    },
    { 
      title: 'View Analytics', 
      description: 'Check performance metrics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    { 
      title: 'System Settings', 
      description: 'Configure platform settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    }
  ];

  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.stats = this.adminService.getStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByFn(index: number, item: StatCardData): string {
    return item.title;
  }

  trackByContentFn(index: number, item: any): number {
    return item.rank;
  }

  trackByActivityFn(index: number, item: any): string {
    return item.message + item.time;
  }

  getIconPath(icon: string): string {
    const iconPaths: { [key: string]: string } = {
      'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      'dollar-sign': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      'play': 'M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4h2.586a1 1 0 00.707-.293l2.414-2.414A1 1 0 0016 10.586V10M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1',
      'clock': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return iconPaths[icon] || iconPaths['users'];
  }

  getActivityIcon(type: string): string {
    const iconPaths: { [key: string]: string } = {
      'upload': 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
      'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      'system': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'alert': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    };
    return iconPaths[type] || iconPaths['system'];
  }
}