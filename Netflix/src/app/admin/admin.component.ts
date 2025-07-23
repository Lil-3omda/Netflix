import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

import { AdminService } from './services/admin.service';
import { AdminPageType } from './models/admin.interfaces';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    AdminSidebarComponent,
    AdminHeaderComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
      <div class="flex">
        <!-- Sidebar -->
        <app-admin-sidebar 
          [currentPage]="currentPage"
          [isOpen]="sidebarOpen"
          (pageChange)="onPageChange($event)"
          (toggleSidebar)="onToggleSidebar()">
        </app-admin-sidebar>
        
        <!-- Main Content -->
        <div 
          class="flex-1 transition-all duration-500 ease-in-out"
          [class.ml-64]="sidebarOpen"
          [class.ml-16]="!sidebarOpen">
          
          <!-- Header -->
          <app-admin-header 
            (menuToggle)="onToggleSidebar()">
          </app-admin-header>
          
          <!-- Page Content with Netflix-like fade transition -->
          <main class="p-6 relative">
            <div class="netflix-fade-in">
              <router-outlet></router-outlet>
            </div>
          </main>
        </div>
      </div>
      
      <!-- Netflix-style loading overlay -->
      <div 
        *ngIf="isLoading" 
        class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div class="netflix-spinner">
          <div class="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .netflix-fade-in {
      animation: netflixFadeIn 0.8s ease-out;
    }
    
    @keyframes netflixFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .netflix-spinner {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    /* Custom scrollbar like Netflix */
    ::-webkit-scrollbar {
      width: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #dc2626;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #b91c1c;
    }
  `]
})
export class AdminComponent implements OnInit, OnDestroy {
  currentPage: AdminPageType = 'dashboard';
  sidebarOpen = true;
  isLoading = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to sidebar state changes
    this.adminService.sidebarOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(open => {
        this.sidebarOpen = open;
      });

    // Listen to router events to update current page
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentPageFromUrl(event.url);
      });

    // Set initial page based on current route
    this.updateCurrentPageFromUrl(this.router.url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCurrentPageFromUrl(url: string): void {
    const routeMap: { [key: string]: AdminPageType } = {
      '/admin/dashboard': 'dashboard',
      '/admin/content': 'content',
      '/admin/users': 'users',
      '/admin/analytics': 'analytics',
      '/admin/chatbot': 'chatbot',
      '/admin/communications': 'communications',
      '/admin/settings': 'settings'
    };

    const page = routeMap[url] || 'dashboard';
    this.currentPage = page;
    this.adminService.setCurrentPage(page);
  }

  onPageChange(page: AdminPageType): void {
    this.isLoading = true;
    
    // Navigate to the new route
    const routeMap: { [key in AdminPageType]: string } = {
      'dashboard': '/admin/dashboard',
      'content': '/admin/content',
      'users': '/admin/users',
      'analytics': '/admin/analytics',
      'chatbot': '/admin/chatbot',
      'communications': '/admin/communications',
      'settings': '/admin/settings'
    };

    // Simulate loading for smooth transition (Netflix-like)
    setTimeout(() => {
      this.router.navigate([routeMap[page]]);
      this.isLoading = false;
    }, 300);
  }

  onToggleSidebar(): void {
    this.adminService.toggleSidebar();
  }
}