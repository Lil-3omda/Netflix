import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-netflix-black text-white">
      <!-- Hero Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-netflix-red via-red-700 to-netflix-red-dark rounded-3xl mb-8 p-8">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h1 class="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Analytics Dashboard
            </h1>
            <p class="text-xl text-red-100">
              Deep insights into your Netflix platform performance
            </p>
          </div>
          <div class="flex space-x-4">
            <select class="px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white border border-white border-opacity-30 focus:outline-none">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button class="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30">
              Export Report
            </button>
          </div>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          *ngFor="let metric of keyMetrics; trackBy: trackByMetric"
          class="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-netflix-red transition-all duration-500 hover:scale-105 cursor-pointer p-6">
          
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0 bg-gradient-to-br from-netflix-red to-transparent"></div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                [ngClass]="metric.iconBg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path [attr.d]="metric.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </div>
              <div class="text-right">
                <div 
                  class="text-sm font-medium flex items-center"
                  [ngClass]="{
                    'text-green-400': metric.trend === 'up',
                    'text-red-400': metric.trend === 'down',
                    'text-gray-400': metric.trend === 'neutral'
                  }">
                  {{ metric.change }}
                  <svg 
                    *ngIf="metric.trend === 'up'"
                    class="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l10-10M17 7v10M17 7H7"></path>
                  </svg>
                  <svg 
                    *ngIf="metric.trend === 'down'"
                    class="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17l-10-10M7 7v10M7 7h10"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <h3 class="text-gray-400 text-sm font-medium mb-2">{{ metric.title }}</h3>
            <p class="text-3xl font-bold text-white group-hover:text-netflix-red transition-colors duration-300">
              {{ metric.value }}
            </p>
            <p class="text-sm text-gray-500 mt-1">{{ metric.description }}</p>
          </div>
          
          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-netflix-red to-red-700 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Revenue Analytics -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <div class="w-8 h-8 bg-netflix-red rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              Revenue Analytics
            </h3>
            <div class="flex space-x-2">
              <button class="px-3 py-1 bg-netflix-red text-white rounded-lg text-sm font-medium">Monthly</button>
              <button class="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors duration-300">Yearly</button>
            </div>
          </div>
          
          <!-- Chart Placeholder -->
          <div class="h-80 bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-600 relative overflow-hidden">
            <!-- Simulated Chart Background -->
            <div class="absolute inset-0 bg-gradient-to-t from-netflix-red/10 to-transparent"></div>
            
            <!-- Chart Content -->
            <div class="relative h-full flex items-end justify-between px-4">
              <div 
                *ngFor="let bar of revenueData; let i = index"
                class="flex flex-col items-center space-y-2">
                <div 
                  class="bg-gradient-to-t from-netflix-red to-red-400 rounded-t-lg transition-all duration-1000 hover:from-red-400 hover:to-netflix-red cursor-pointer"
                  [style.height.%]="bar.value"
                  [style.width]="'24px'">
                </div>
                <span class="text-xs text-gray-400">{{ bar.label }}</span>
              </div>
            </div>
            
            <!-- Chart Legend -->
            <div class="absolute top-4 right-4 bg-gray-900 bg-opacity-80 rounded-lg p-3">
              <div class="text-sm text-white font-semibold mb-2">Total Revenue</div>
              <div class="text-2xl font-bold text-netflix-red">$2.4M</div>
              <div class="text-xs text-green-400">+12.5% from last month</div>
            </div>
          </div>
        </div>

        <!-- User Engagement -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              User Engagement
            </h3>
            <div class="flex space-x-2">
              <button class="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium">Daily</button>
              <button class="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors duration-300">Weekly</button>
            </div>
          </div>
          
          <!-- Engagement Metrics -->
          <div class="space-y-4">
            <div 
              *ngFor="let engagement of engagementData"
              class="flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 rounded-xl hover:bg-opacity-70 transition-all duration-300">
              <div class="flex items-center space-x-4">
                <div 
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  [ngClass]="engagement.iconBg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path [attr.d]="engagement.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-white">{{ engagement.title }}</div>
                  <div class="text-sm text-gray-400">{{ engagement.description }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-white">{{ engagement.value }}</div>
                <div 
                  class="text-sm"
                  [ngClass]="{
                    'text-green-400': engagement.trend === 'up',
                    'text-red-400': engagement.trend === 'down'
                  }">
                  {{ engagement.change }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Performance -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Top Content -->
        <div class="lg:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h3 class="text-xl font-bold mb-6 flex items-center">
            <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8"></path>
              </svg>
            </div>
            Content Performance
          </h3>
          
          <div class="space-y-4">
            <div 
              *ngFor="let content of topContent; trackBy: trackByContent"
              class="flex items-center p-4 bg-gray-800 bg-opacity-30 rounded-xl hover:bg-opacity-60 transition-all duration-300 group">
              
              <!-- Rank -->
              <div class="w-12 h-12 bg-gradient-to-br from-netflix-red to-red-700 rounded-xl flex items-center justify-center mr-4 font-bold text-white shadow-lg">
                {{ content.rank }}
              </div>
              
              <!-- Thumbnail Placeholder -->
              <div class="w-20 h-14 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mr-4 flex items-center justify-center">
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
                <div class="flex items-center space-x-4 mt-2">
                  <span class="text-xs text-gray-500">{{ content.duration }}</span>
                  <span class="text-xs text-gray-500">{{ content.rating }} ⭐</span>
                </div>
              </div>
              
              <!-- Performance Metrics -->
              <div class="text-right">
                <p class="font-bold text-white">{{ content.views }}</p>
                <p class="text-sm text-green-400">{{ content.engagement }}% engagement</p>
                <p class="text-xs text-gray-400">{{ content.watchTime }} avg watch time</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Geographic Distribution -->
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
          <h3 class="text-xl font-bold mb-6 flex items-center">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            Top Regions
          </h3>
          
          <div class="space-y-4">
            <div 
              *ngFor="let region of topRegions"
              class="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-300">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {{ region.flag }}
                </div>
                <div>
                  <div class="font-medium text-white">{{ region.country }}</div>
                  <div class="text-xs text-gray-400">{{ region.users }} users</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold text-white">{{ region.percentage }}%</div>
                <div class="w-16 h-2 bg-gray-700 rounded-full overflow-hidden mt-1">
                  <div 
                    class="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000"
                    [style.width.%]="region.percentage">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Device & Platform Analytics -->
      <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h3 class="text-xl font-bold mb-6 flex items-center">
          <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          Device & Platform Usage
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            *ngFor="let device of deviceData"
            class="bg-gray-800 bg-opacity-50 rounded-xl p-4 hover:bg-opacity-70 transition-all duration-300 text-center">
            <div 
              class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
              [ngClass]="device.iconBg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path [attr.d]="device.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-white mb-2">{{ device.name }}</h4>
            <p class="text-2xl font-bold text-netflix-red mb-1">{{ device.percentage }}%</p>
            <p class="text-sm text-gray-400">{{ device.users }} users</p>
            
            <!-- Usage Bar -->
            <div class="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-3">
              <div 
                class="h-full bg-gradient-to-r from-netflix-red to-red-400 rounded-full transition-all duration-1000"
                [style.width.%]="device.percentage">
              </div>
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
    
    .analytics-dashboard {
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
export class AnalyticsComponent implements OnInit, OnDestroy {
  keyMetrics = [
    {
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      description: 'Monthly recurring revenue',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      iconBg: 'bg-gradient-to-br from-netflix-red to-red-700'
    },
    {
      title: 'Active Users',
      value: '1.8M',
      change: '+8.3%',
      trend: 'up',
      description: 'Monthly active users',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800'
    },
    {
      title: 'Watch Time',
      value: '45.2M',
      change: '+15.7%',
      trend: 'up',
      description: 'Hours watched this month',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-gradient-to-br from-green-600 to-green-800'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.5%',
      trend: 'up',
      description: 'Monthly churn rate',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      iconBg: 'bg-gradient-to-br from-purple-600 to-purple-800'
    }
  ];

  revenueData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 52 },
    { label: 'Apr', value: 85 },
    { label: 'May', value: 92 },
    { label: 'Jun', value: 88 },
    { label: 'Jul', value: 95 }
  ];

  engagementData = [
    {
      title: 'Average Session',
      description: 'Time per user session',
      value: '2h 45m',
      change: '+12%',
      trend: 'up',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-blue-600'
    },
    {
      title: 'Completion Rate',
      description: 'Content completion rate',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-green-600'
    },
    {
      title: 'User Retention',
      description: '30-day retention rate',
      value: '85%',
      change: '+3%',
      trend: 'up',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      iconBg: 'bg-purple-600'
    },
    {
      title: 'Daily Active',
      description: 'Daily active users',
      value: '650K',
      change: '+8%',
      trend: 'up',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      iconBg: 'bg-yellow-600'
    }
  ];

  topContent = [
    {
      rank: 1,
      title: 'Stranger Things 4',
      type: 'Series',
      genre: 'Sci-Fi',
      views: '1.2B',
      engagement: 92,
      watchTime: '85%',
      duration: '8 episodes',
      rating: '8.7'
    },
    {
      rank: 2,
      title: 'Wednesday',
      type: 'Series',
      genre: 'Comedy',
      views: '987M',
      engagement: 88,
      watchTime: '78%',
      duration: '8 episodes',
      rating: '8.1'
    },
    {
      rank: 3,
      title: 'The Gray Man',
      type: 'Movie',
      genre: 'Action',
      views: '856M',
      engagement: 75,
      watchTime: '72%',
      duration: '2h 2m',
      rating: '6.5'
    },
    {
      rank: 4,
      title: 'Glass Onion',
      type: 'Movie',
      genre: 'Mystery',
      views: '734M',
      engagement: 82,
      watchTime: '89%',
      duration: '2h 19m',
      rating: '7.2'
    }
  ];

  topRegions = [
    { country: 'United States', flag: '🇺🇸', users: '450K', percentage: 35 },
    { country: 'United Kingdom', flag: '🇬🇧', users: '280K', percentage: 22 },
    { country: 'Canada', flag: '🇨🇦', users: '195K', percentage: 15 },
    { country: 'Germany', flag: '🇩🇪', users: '160K', percentage: 12 },
    { country: 'France', flag: '🇫🇷', users: '140K', percentage: 11 },
    { country: 'Australia', flag: '🇦🇺', users: '65K', percentage: 5 }
  ];

  deviceData = [
    {
      name: 'Smart TV',
      percentage: 45,
      users: '810K',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      iconBg: 'bg-blue-600'
    },
    {
      name: 'Mobile',
      percentage: 32,
      users: '576K',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      iconBg: 'bg-green-600'
    },
    {
      name: 'Desktop',
      percentage: 18,
      users: '324K',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z M6 8a2 2 0 012-2h6l2 2h2a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8z',
      iconBg: 'bg-purple-600'
    },
    {
      name: 'Tablet',
      percentage: 5,
      users: '90K',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
      iconBg: 'bg-orange-600'
    }
  ];

  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Initialize analytics data
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByMetric(index: number, metric: any): string {
    return metric.title;
  }

  trackByContent(index: number, content: any): number {
    return content.rank;
  }
}