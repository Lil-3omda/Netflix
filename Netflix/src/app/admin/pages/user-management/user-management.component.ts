import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/admin.interfaces';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-netflix-black text-white">
      <!-- Hero Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-netflix-red via-red-700 to-netflix-red-dark rounded-3xl mb-8 p-8">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h1 class="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              User Management
            </h1>
            <p class="text-xl text-red-100">
              Manage Netflix subscribers and user accounts
            </p>
          </div>
          <button
            (click)="openAddUserModal()"
            class="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30 flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add User</span>
          </button>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-netflix-red transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Total Users</p>
              <p class="text-3xl font-bold text-white">{{ totalUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-netflix-red to-red-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Active Users</p>
              <p class="text-3xl font-bold text-white">{{ activeUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Premium Users</p>
              <p class="text-3xl font-bold text-white">{{ premiumUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">New This Month</p>
              <p class="text-3xl font-bold text-white">{{ newUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 mb-8">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterUsers()"
              placeholder="Search users by name, email, or region..."
              class="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 placeholder-gray-400">
          </div>

          <div class="flex gap-4">
            <select
              [(ngModel)]="statusFilter"
              (change)="filterUsers()"
              class="px-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 min-w-[120px]">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              [(ngModel)]="subscriptionFilter"
              (change)="filterUsers()"
              class="px-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 min-w-[120px]">
              <option value="">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>

            <button class="px-6 py-3 bg-netflix-red hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Users Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
          *ngFor="let user of filteredUsers; trackBy: trackByUserId"
          class="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-netflix-red transition-all duration-500 hover:scale-105 cursor-pointer p-6">

          <!-- User Avatar -->
          <div class="flex items-center justify-center mb-4">
            <div class="w-20 h-20 bg-gradient-to-br from-netflix-red to-red-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl font-bold text-white">{{ getUserInitials(user.name) }}</span>
            </div>
          </div>

          <!-- User Info -->
          <div class="text-center mb-4">
            <h3 class="font-bold text-white text-lg mb-1 group-hover:text-netflix-red transition-colors duration-300">
              {{ user.name }}
            </h3>
            <p class="text-gray-400 text-sm mb-2">{{ user.email }}</p>

            <!-- Status Badge -->
            <span
              class="px-3 py-1 rounded-full text-xs font-bold"
              [ngClass]="{
                'bg-green-500 text-white': user.status === 'Active',
                'bg-gray-500 text-white': user.status === 'Inactive',
                'bg-red-500 text-white': user.status === 'Suspended'
              }">
              {{ user.status }}
            </span>
          </div>

          <!-- Subscription Info -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm">Plan:</span>
              <span
                class="px-2 py-1 rounded-lg text-xs font-medium"
                [ngClass]="{
                  'bg-yellow-100 text-yellow-800': user.subscription === 'Basic',
                  'bg-blue-100 text-blue-800': user.subscription === 'Standard',
                  'bg-purple-100 text-purple-800': user.subscription === 'Premium'
                }">
                {{ user.subscription }}
              </span>
            </div>

            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm">Region:</span>
              <span class="text-white text-sm">{{ user.region }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-400 text-sm">Joined:</span>
              <span class="text-white text-sm">{{ formatDate(user.joinDate) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex space-x-2">
            <button
              (click)="editUser(user)"
              class="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Edit</span>
            </button>

            <button
              (click)="toggleUserStatus(user)"
              class="px-3 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center justify-center"
              [ngClass]="{
                'bg-red-600 hover:bg-red-700': user.status === 'Active',
                'bg-green-600 hover:bg-green-700': user.status !== 'Active'
              }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  *ngIf="user.status === 'Active'"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"></path>
                <path
                  *ngIf="user.status !== 'Active'"
                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center">
        <button class="px-8 py-4 bg-gradient-to-r from-netflix-red to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg">
          Load More Users
        </button>
      </div>

      <!-- Add User Modal -->
      <div
        *ngIf="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Add New User</h2>
            <button
              (click)="closeAddModal()"
              class="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form [formGroup]="userForm" (ngSubmit)="submitUser()" class="space-y-6">
            <!-- Form fields would go here -->
            <div class="text-center text-gray-400">
              <p>User creation form will be implemented here</p>
            </div>

            <div class="flex space-x-4 pt-4">
              <button
                type="button"
                (click)="closeAddModal()"
                class="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all duration-300">
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-netflix-red hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-300">
                Add User
              </button>
            </div>
          </form>
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

    .focus\\:border-netflix-red:focus {
      border-color: #e50914;
    }

    .focus\\:ring-netflix-red:focus {
      --tw-ring-color: #e50914;
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
export class UserManagementComponent implements OnInit, OnDestroy {
  searchTerm = '';
  statusFilter = '';
  subscriptionFilter = '';
  showAddModal = false;
  userForm: FormGroup;

  // Sample data
  users: User[] = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      status: 'Active',
      subscription: 'Premium',
      region: 'United States',
      joinDate: '2023-01-15',
      lastActive: '2024-01-10'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.johnson@email.com',
      status: 'Active',
      subscription: 'Standard',
      region: 'Canada',
      joinDate: '2023-03-22',
      lastActive: '2024-01-09'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      status: 'Active',
      subscription: 'Basic',
      region: 'United Kingdom',
      joinDate: '2023-05-10',
      lastActive: '2024-01-08'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.davis@email.com',
      status: 'Inactive',
      subscription: 'Premium',
      region: 'Australia',
      joinDate: '2023-02-28',
      lastActive: '2023-12-15'
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      status: 'Suspended',
      subscription: 'Standard',
      region: 'Germany',
      joinDate: '2023-04-05',
      lastActive: '2023-11-20'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      status: 'Active',
      subscription: 'Premium',
      region: 'France',
      joinDate: '2023-06-18',
      lastActive: '2024-01-11'
    }
  ];

  filteredUsers: User[] = [];

  // Stats
  totalUsers = 0;
  activeUsers = 0;
  premiumUsers = 0;
  newUsers = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subscription: ['Basic', Validators.required],
      region: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers(): void {
    this.adminService.getUsers(1, 50, this.searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.users.map((user: any) => ({
            id: user.id,
            name: user.fullName,
            email: user.email,
            status: user.isEmailVerified ? 'Active' : 'Inactive',
            subscription: user.subscriptionStatus === 'Active' ? 'Premium' : 'Basic',
            region: 'Unknown', // You can add region to your user model
            joinDate: new Date().toISOString(), // You can add proper join date
            lastActive: new Date().toISOString()
          }));
          this.filteredUsers = [...this.users];
          this.calculateStats();
        },
        error: (error) => {
          console.error('Error loading users:', error);
          // Keep existing mock data as fallback
        }
      });
  }

  private calculateStats(): void {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(u => u.status === 'Active').length;
    this.premiumUsers = this.users.filter(u => u.subscription === 'Premium').length;

    // Calculate new users this month (simplified)
    const currentMonth = new Date().getMonth();
    this.newUsers = this.users.filter(u => {
      const joinMonth = new Date(u.joinDate).getMonth();
      return joinMonth === currentMonth;
    }).length;
  }

  filterUsers(): void {
    this.loadUsers(); // Reload with search term
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.region.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = !this.statusFilter || user.status === this.statusFilter;
      const matchesSubscription = !this.subscriptionFilter || user.subscription === this.subscriptionFilter;

      return matchesSearch && matchesStatus && matchesSubscription;
    });
  }

  trackByUserId(index: number, user: User): string {
    return user.id.toString();
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  openAddUserModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.userForm.reset();
  }

  submitUser(): void {
    if (this.userForm.valid) {
      // Handle form submission
      console.log('User form submitted:', this.userForm.value);
      this.closeAddModal();
    }
  }

  editUser(user: User): void {
    console.log('Editing user:', user.name);
  }

  toggleUserStatus(user: User): void {
    if (user.status === 'Active') {
      user.status = 'Suspended';
    } else {
      user.status = 'Active';
    }
    this.calculateStats();
    console.log(`User ${user.name} status changed to ${user.status}`);
  }
}
