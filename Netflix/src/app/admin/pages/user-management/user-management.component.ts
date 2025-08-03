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

      <!-- Users Table -->
      <div class="card bg-secondary bg-gradient border border-light mb-5">
        <div class="table-responsive">
          <table class="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th class="bg-dark">User</th>
                <th class="bg-dark">Email</th>
                <!-- <th class="bg-dark">Status</th> -->
                <th class="bg-dark">Subscription</th>
                <!-- <th class="bg-dark">Region</th> -->
                <th class="bg-dark">Joined</th>
                <th class="bg-dark text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let user of filteredUsers; trackBy: trackByUserId">
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                      <span class="fw-bold">{{ getUserInitials(user.name) }}</span>
                    </div>
                    <div>
                      <div class="fw-bold">{{ user.name }}</div>
                      <small class="text-muted">{{ user.role || 'User' }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <!-- <td> -->
                  <!-- <span class="badge bg-success" *ngIf="user.status === 'Active'">{{ user.status }}</span>
                  <span class="badge bg-secondary" *ngIf="user.status === 'Inactive'">{{ user.status }}</span>
                  <span class="badge bg-danger" *ngIf="user.status === 'Suspended'">{{ user.status }}</span>
                </td> -->
                <td>{{ user.subscription }}</td>
                <!-- <td>{{ user.region }}</td> -->
                <td>{{ formatDate(user.joinDate) }}</td>
                <td class="text-end">
                  <div class="d-flex justify-content-end gap-2">

                    <button class="btn btn-sm btn-warning" (click)="makeUserAdmin(user)" *ngIf="user.role !== 'Admin'" title="Make Admin">
                      <i class="bi bi-shield-check"></i>
                    </button>

                    <button class="btn btn-sm btn-secondary" (click)="removeAdminRole(user)" *ngIf="user.role === 'Admin'" title="Remove Admin">
                      <i class="bi bi-shield-x"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteUser(user)" title="Delete User">
                      <i class="bi bi-trash"></i>
                    </button>

                    <!-- <button class="btn btn-sm"
                            [ngClass]="{'btn-danger': user.status === 'Active', 'btn-success': user.status !== 'Active'}"
                            (click)="toggleUserStatus(user)"
                            [title]="user.status === 'Active' ? 'Suspend User' : 'Activate User'">
                      <i class="bi" [ngClass]="{'bi-x-lg': user.status === 'Active', 'bi-check-lg': user.status !== 'Active'}"></i>
                    </button> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mb-5">
        <div class="text-muted">
          Showing {{ filteredUsers.length }} of {{ totalUsers }} users
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-light" [disabled]="currentPage === 1" (click)="prevPage()">
            <i class="bi bi-chevron-left"></i> Previous
          </button>
          <button class="btn btn-outline-light" [disabled]="filteredUsers.length < pageSize" (click)="nextPage()">
            Next <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Add User Modal -->
      <div class="modal fade" [class.show]="showAddModal" [style.display]="showAddModal ? 'block' : 'none'" tabindex="-1" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white">
            <!-- <div class="modal-header border-0">
              <h5 class="modal-title">Add New User</h5>
              <button type="button" class="btn-close btn-close-white" (click)="closeAddModal()"></button>
            </div> -->
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

    /* Table styles */
    .table-dark {
      --bs-table-bg: #1a1a1a;
      --bs-table-striped-bg: #2c2c2c;
      --bs-table-hover-bg: #333333;
      color: #fff;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .table th {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `]
})
export class UserManagementComponent implements OnInit, OnDestroy {
  searchTerm = '';
  statusFilter = '';
  subscriptionFilter = '';
  showAddModal = false;
  userForm: FormGroup;
  currentPage = 1;
  pageSize = 10;

  // User data
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
    this.adminService.getUsers(this.currentPage, this.pageSize, this.searchTerm)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.users.map((user: any) => ({
            id: user.id,
            name: user.fullName,
            email: user.email,
            status: user.isEmailVerified ? 'Active' : 'Inactive',
            subscription: user.subscriptionStatus === 'Active' ? 'Premium' : 'Basic',
            region: user.region || 'Unknown',
            joinDate: user.createdAt || new Date().toISOString(),
            lastActive: user.lastLogin || new Date().toISOString(),
            role: user.role || 'User'
          }));
          this.filteredUsers = [...this.users];
          this.totalUsers = response.totalCount || this.users.length;
          this.calculateStats();
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.filteredUsers = [...this.users];
          this.totalUsers = this.users.length;
          this.calculateStats();
        }
      });
  }

  private calculateStats(): void {
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
    this.currentPage = 1; // Reset to first page when filtering
    this.loadUsers();
  }

  nextPage(): void {
    this.currentPage++;
    this.loadUsers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
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
      const newUser = {
        ...this.userForm.value,
        role: 'User',
        joinDate: new Date().toISOString()
      };

      this.adminService.createUser(newUser).subscribe({
        next: (response) => {
          this.popupService.showSuccess('User created successfully', 'Success');
          this.closeAddModal();
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.popupService.showError(error.error?.message || 'Failed to create user');
        }
      });
    }
  }

  editUser(user: User): void {
    this.popupService.showConfirm(
      `Edit user ${user.name}?`,
      () => {
        // In a real app, you would open an edit modal with the user data
        console.log('Editing user:', user);
        this.popupService.showSuccess(`User ${user.name} will be edited`, 'Edit User');
      },
      undefined,
      'Edit User'
    );
  }

  toggleUserStatus(user: User): void {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    const action = newStatus === 'Suspended' ? 'suspend' : 'activate';

    this.popupService.showConfirm(
      `Are you sure you want to ${action} ${user.name}?`,
      () => {
        this.adminService.updateUserStatus(user.id, newStatus).subscribe({
          next: (response) => {
            user.status = newStatus;
            this.calculateStats();
            this.popupService.showSuccess(`User ${user.name} has been ${newStatus.toLowerCase()}`, 'Status Updated');
          },
          error: (error) => {
            console.error('Error updating user status:', error);
            this.popupService.showError(error.error?.message || `Failed to ${action} user`);
          }
        });
      },
      undefined,
      `${newStatus} User`
    );
  }
  deleteUser(user: User): void {
    this.popupService.showConfirm(
      `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`,
      () => {
        this.adminService.deleteUser(user.id).subscribe({
          next: (response) => {
            this.popupService.showSuccess(`User ${user.name} has been deleted`, 'User Deleted');
            this.loadUsers(); // Reload the user list
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            this.popupService.showError(error.error?.message || 'Failed to delete user');
          }
        });
      },
      undefined,
      'Delete User'
    );
  }
  // In your UserManagementComponent
  makeUserAdmin(user: User): void {
    // this.passwordConfirmService.show({
    //   title: 'Admin Confirmation Required',
    //   message: `You are about to grant admin privileges to ${user.name}. This action will give them full administrative access to the Netflix platform.\n\nPlease enter your admin password to confirm this action.`,
    //   onConfirm: (password: string) => {
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
    //   },
    //   onCancel: () => {
    //     console.log('Admin promotion cancelled');
    //   }
    // });
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
