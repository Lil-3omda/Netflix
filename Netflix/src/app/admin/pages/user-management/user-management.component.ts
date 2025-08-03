import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/admin.interfaces';
import { PopupService } from '../../../shared/services/popup.service';
import { PasswordConfirmService } from '../../../shared/services/password-confirm.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid min-vh-100 bg-dark text-white py-4">
      <!-- Hero Header -->
      <div class="position-relative bg-danger rounded-4 mb-5 p-5 text-white">
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25 rounded-4"></div>
        <div class="position-relative d-flex flex-column flex-md-row justify-content-between align-items-center z-1">
          <div>
            <h1 class="display-4 fw-bold mb-3">User Management</h1>
            <p class="fs-5 text-light">Manage Netflix subscribers and user accounts</p>
          </div>
          <button class="btn btn-outline-light d-flex align-items-center gap-2 px-4 py-2" (click)="openAddUserModal()">
            <i class="bi bi-plus-lg"></i>
            <span>Add User</span>
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="row g-4 mb-5">
        <div class="col-md-3">
          <div class="card bg-secondary bg-gradient text-white border border-light">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Total Users</small>
                <h3>{{ totalUsers }}</h3>
              </div>
              <div class="bg-danger p-3 rounded">
                <i class="bi bi-people-fill fs-4"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-success bg-gradient text-white border border-light">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Active Users</small>
                <h3>{{ activeUsers }}</h3>
              </div>
              <div class="bg-success p-3 rounded">
                <i class="bi bi-check-circle fs-4"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-primary bg-gradient text-white border border-light">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>Premium Users</small>
                <h3>{{ premiumUsers }}</h3>
              </div>
              <div class="bg-primary p-3 rounded">
                <i class="bi bi-star-fill fs-4"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-info bg-gradient text-white border border-light">
            <div class="card-body d-flex justify-content-between align-items-center">
              <div>
                <small>New This Month</small>
                <h3>{{ newUsers }}</h3>
              </div>
              <div class="bg-info p-3 rounded">
                <i class="bi bi-calendar-event fs-4"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="card bg-secondary bg-gradient border border-light mb-5 p-4">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text bg-dark border-light text-white"><i class="bi bi-search"></i></span>
              <input type="text" [(ngModel)]="searchTerm" (input)="filterUsers()" class="form-control bg-dark border-light text-white" placeholder="Search users by name, email, or region...">
            </div>
          </div>
          <div class="col-md-3">
            <select [(ngModel)]="statusFilter" (change)="filterUsers()" class="form-select bg-dark border-light text-white">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
          <div class="col-md-3">
            <select [(ngModel)]="subscriptionFilter" (change)="filterUsers()" class="form-select bg-dark border-light text-white">
              <option value="">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
        </div>
      </div>

      <!-- User Cards Grid -->
      <div class="row g-4 mb-5">
        <div class="col-sm-6 col-md-4 col-lg-3" *ngFor="let user of filteredUsers; trackBy: trackByUserId">
          <div class="card bg-dark text-white border border-light h-100">
            <div class="card-body d-flex flex-column align-items-center text-center">
              <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px;">
                <span class="fs-4 fw-bold">{{ getUserInitials(user.name) }}</span>
              </div>
              <h5 class="card-title">{{ user.name }}</h5>
              <p class="text-muted small">{{ user.email }}</p>
              <span class="badge bg-success" *ngIf="user.status === 'Active'">{{ user.status }}</span>
              <span class="badge bg-secondary" *ngIf="user.status === 'Inactive'">{{ user.status }}</span>
              <span class="badge bg-danger" *ngIf="user.status === 'Suspended'">{{ user.status }}</span>
              <div class="mt-3 w-100">
                <div class="d-flex justify-content-between">
                  <small class="text-muted">Plan:</small>
                  <small class="text-white">{{ user.subscription }}</small>
                </div>
                <div class="d-flex justify-content-between">
                  <small class="text-muted">Region:</small>
                  <small class="text-white">{{ user.region }}</small>
                </div>
                <div class="d-flex justify-content-between">
                  <small class="text-muted">Joined:</small>
                  <small class="text-white">{{ formatDate(user.joinDate) }}</small>
                </div>
              </div>
              <div class="mt-3 d-flex w-100 gap-2">
                <button class="btn btn-sm btn-outline-light w-100" (click)="editUser(user)"><i class="bi bi-pencil"></i> Edit</button>
                <div class="btn-group w-100">
                  <button class="btn btn-sm btn-warning" (click)="makeUserAdmin(user)" *ngIf="user.role !== 'Admin'">
                    <i class="bi bi-shield-check"></i>
                  </button>
                  <button class="btn btn-sm btn-secondary" (click)="removeAdminRole(user)" *ngIf="user.role === 'Admin'">
                    <i class="bi bi-shield-x"></i>
                  </button>
                  <button class="btn btn-sm" [ngClass]="{'btn-danger': user.status === 'Active', 'btn-success': user.status !== 'Active'}" (click)="toggleUserStatus(user)">
                    <i class="bi" [ngClass]="{'bi-x-lg': user.status === 'Active', 'bi-check-lg': user.status !== 'Active'}"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center mb-5">
        <button class="btn btn-danger px-5 py-2">Load More Users</button>
      </div>
    </div>

    <!-- Add User Modal -->
    <div class="modal fade" [class.show]="showAddModal" [style.display]="showAddModal ? 'block' : 'none'" tabindex="-1" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-0">
            <h5 class="modal-title">Add New User</h5>
            <button type="button" class="btn-close btn-close-white" (click)="closeAddModal()"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="userForm" (ngSubmit)="submitUser()">
              <div class="mb-3 text-center text-muted">
                <p>User creation form will be implemented here</p>
              </div>
              <div class="d-flex gap-3">
                <button type="button" class="btn btn-secondary w-50" (click)="closeAddModal()">Cancel</button>
                <button type="submit" class="btn btn-danger w-50">Add User</button>
              </div>
            </form>
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
  users: User[] = [];

  filteredUsers: User[] = [];

  // Stats
  totalUsers = 0;
  activeUsers = 0;
  premiumUsers = 0;
  newUsers = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private popupService: PopupService,
    private passwordConfirmService: PasswordConfirmService
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

  makeUserAdmin(user: User): void {
    this.passwordConfirmService.show({
      title: 'Admin Confirmation Required',
      message: `You are about to grant admin privileges to ${user.name}. This action will give them full administrative access to the Netflix platform.\n\nPlease enter your admin password to confirm this action.`,
      onConfirm: (password: string) => {
        this.adminService.makeUserAdmin(user.id).subscribe({
          next: (response) => {
            this.popupService.showSuccess(`${user.name} has been successfully promoted to admin.`, 'Admin Promotion Successful');
            this.loadUsers(); // Reload users list
          },
          error: (error) => {
            console.error('Error making user admin:', error);
            this.popupService.showError(error.error?.message || 'Failed to make user admin');
          }
        });
      },
      onCancel: () => {
        // User cancelled the action
        console.log('Admin promotion cancelled');
      }
    });
  }

  removeAdminRole(user: User): void {
    this.popupService.showConfirm(
      `Are you sure you want to remove admin role from ${user.name}? This will revoke all administrative privileges.`,
      () => {
        this.adminService.removeAdminRole(user.id).subscribe({
          next: (response) => {
            this.popupService.showSuccess(`Admin role removed from ${user.name} successfully`, 'Admin Role Removed');
            this.loadUsers(); // Reload users list
          },
          error: (error) => {
            console.error('Error removing admin role:', error);
            this.popupService.showError(error.error?.message || 'Failed to remove admin role');
          }
        });
      },
      undefined,
      'Remove Admin Role'
    );
  }
}






