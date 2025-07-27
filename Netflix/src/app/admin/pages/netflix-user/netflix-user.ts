import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subscription: 'basic' | 'standard' | 'premium';
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  country?: string;
  createdAt: string;
  lastLogin: string;
  watchTime: string;
  updatedAt?: string;
}

export interface Activity {
  message: string;
  icon: string;
  timestamp: Date;
}
@Component({
  selector: 'app-netflix-user',
  imports: [FormsModule,CommonModule,TitleCasePipe],
  templateUrl: './netflix-user.html',
  styleUrl: './netflix-user.css'
})
export class NetflixUser implements OnInit {
users: User[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@gmail.com",
      phone: "+1 555 123 4567",
      subscription: "premium",
      role: "admin",
      status: "active",
      country: "US",
      createdAt: "2024-01-15",
      lastLogin: "2024-03-10",
      watchTime: "125 hours"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@outlook.com",
      phone: "+1 555 234 5678",
      subscription: "standard",
      role: "user",
      status: "active",
      country: "CA",
      createdAt: "2024-02-10",
      lastLogin: "2024-03-09",
      watchTime: "89 hours"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@yahoo.com",
      phone: "+1 555 345 6789",
      subscription: "basic",
      role: "moderator",
      status: "inactive",
      country: "UK",
      createdAt: "2024-03-05",
      lastLogin: "2024-02-28",
      watchTime: "45 hours"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@gmail.com",
      phone: "+1 555 456 7890",
      subscription: "premium",
      role: "user",
      status: "suspended",
      country: "US",
      createdAt: "2024-01-20",
      lastLogin: "2024-02-15",
      watchTime: "78 hours"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@hotmail.com",
      phone: "+1 555 567 8901",
      subscription: "standard",
      role: "user",
      status: "active",
      country: "AU",
      createdAt: "2024-02-28",
      lastLogin: "2024-03-11",
      watchTime: "112 hours"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@gmail.com",
      phone: "+1 555 678 9012",
      subscription: "premium",
      role: "user",
      status: "active",
      country: "DE",
      createdAt: "2024-01-08",
      lastLogin: "2024-03-11",
      watchTime: "156 hours"
    }
  ];

  filteredUsers: User[] = [];
  activities: Activity[] = [];

  // Form and UI state
  showForm = false;
  editingUserId: number | null = null;
  currentUser: Partial<User> = {};

  // Search and filter
  searchTerm = '';
  statusFilter = '';
  roleFilter = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // Modal state
  showConfirmModal = false;
  showUserDetailModal = false;
  deleteUserId: number | null = null;
  selectedUser: User | null = null;

  // Notification
  notification = {
    show: false,
    message: '',
    type: 'info'
  };

  ngOnInit(): void {
    this.filteredUsers = [...this.users];
    this.addActivity('System started', 'fas fa-power-off');
  }

  // Statistics methods
  getTotalUsers(): number {
    return this.users.length;
  }

  getActiveUsers(): number {
    return this.users.filter(u => u.status === 'active').length;
  }

  getAdminUsers(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  getPremiumUsers(): number {
    return this.users.filter(u => u.subscription === 'premium').length;
  }

  // Filter and search
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || user.status === this.statusFilter;
      const matchesRole = !this.roleFilter || user.role === this.roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });

    this.currentPage = 1;
  }

  // Pagination methods
  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  getPageNumbers(): (number | string)[] {
    const totalPages = this.getTotalPages();
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (this.currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(totalPages - 1, this.currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (this.currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  // Form methods
  showAddUserForm(): void {
    this.showForm = true;
    this.editingUserId = null;
    this.currentUser = {
      status: 'active'
    };
  }

  onSubmit(): void {
    if (!this.currentUser.name || !this.currentUser.email ||
        !this.currentUser.subscription || !this.currentUser.role ||
        !this.currentUser.status) {
      this.showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Check for duplicate email
    const existingUser = this.users.find(u =>
      u.email === this.currentUser.email && u.id !== this.editingUserId
    );
    if (existingUser) {
      this.showNotification('Email address already exists', 'error');
      return;
    }

    if (this.editingUserId) {
      // Update existing user
      const userIndex = this.users.findIndex(u => u.id === this.editingUserId);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...this.currentUser as User,
          updatedAt: new Date().toISOString().split('T')[0]
        };
        this.showNotification('User updated successfully', 'success');
        this.addActivity(`Updated user: ${this.currentUser.name}`, 'fas fa-edit');
      }
    } else {
      // Add new user
      const newUser: User = {
        id: Date.now(),
        name: this.currentUser.name!,
        email: this.currentUser.email!,
        phone: this.currentUser.phone || '',
        subscription: this.currentUser.subscription!,
        role: this.currentUser.role!,
        status: this.currentUser.status!,
        country: this.currentUser.country || '',
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        watchTime: '0 hours'
      };
      this.users.push(newUser);
      this.showNotification('User added successfully', 'success');
      this.addActivity(`Added new user: ${newUser.name}`, 'fas fa-user-plus');
    }

    this.cancelEdit();
    this.filterUsers();
  }

  editUser(user: User): void {
    this.editingUserId = user.id;
    this.currentUser = { ...user };
    this.showForm = true;
    this.addActivity(`Started editing user: ${user.name}`, 'fas fa-edit');
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingUserId = null;
    this.currentUser = {};
  }

  // View user details
  viewUser(user: User): void {
    this.selectedUser = user;
    this.showUserDetailModal = true;
  }

  editUserFromDetail(): void {
    if (this.selectedUser) {
      this.closeUserDetailModal();
      this.editUser(this.selectedUser);
    }
  }

  closeUserDetailModal(): void {
    this.showUserDetailModal = false;
    this.selectedUser = null;
  }

  // Delete user
  deleteUser(user: User): void {
    this.deleteUserId = user.id;
    this.showConfirmModal = true;
  }

  confirmDelete(): void {
    if (this.deleteUserId) {
      const user = this.users.find(u => u.id === this.deleteUserId);
      const userName = user ? user.name : 'Unknown User';

      this.users = this.users.filter(u => u.id !== this.deleteUserId);
      this.filteredUsers = this.filteredUsers.filter(u => u.id !== this.deleteUserId);

      // Adjust current page if necessary
      const totalPages = this.getTotalPages();
      if (this.currentPage > totalPages && totalPages > 0) {
        this.currentPage = totalPages;
      }

      this.closeConfirmModal();
      this.showNotification('User deleted successfully', 'success');
      this.addActivity(`Deleted user: ${userName}`, 'fas fa-user-minus');
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.deleteUserId = null;
  }

  // Bulk operations
  bulkActivateUsers(): void {
    const inactiveUsers = this.users.filter(u => u.status === 'inactive');
    if (inactiveUsers.length === 0) {
      this.showNotification('No inactive users to activate', 'info');
      return;
    }

    inactiveUsers.forEach(user => {
      user.status = 'active';
    });

    this.filterUsers();
    this.showNotification(`Activated ${inactiveUsers.length} users`, 'success');
    this.addActivity(`Bulk activated ${inactiveUsers.length} users`, 'fas fa-check-circle');
  }

  exportUsers(): void {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "ID,Name,Email,Phone,Subscription,Role,Status,Country,Join Date,Last Login,Watch Time\n"
      + this.users.map(user =>
          `${user.id},"${user.name}","${user.email}","${user.phone || ''}","${user.subscription}","${user.role}","${user.status}","${user.country || ''}","${user.createdAt}","${user.lastLogin}","${user.watchTime}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `netflix_users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showNotification('Users exported successfully', 'success');
    this.addActivity('Exported user data', 'fas fa-download');
  }

  refreshData(): void {
    this.filterUsers();
    this.showNotification('Data refreshed', 'info');
    this.addActivity('Data refreshed', 'fas fa-sync-alt');
  }

  // Utility methods
  getRoleText(role: string): string {
    const roleMap: { [key: string]: string } = {
      'admin': 'Administrator',
      'moderator': 'Moderator',
      'user': 'Regular User'
    };
    return roleMap[role] || role;
  }

  getCountryName(code?: string): string {
    const countryMap: { [key: string]: string } = {
      'US': 'United States',
      'CA': 'Canada',
      'UK': 'United Kingdom',
      'DE': 'Germany',
      'FR': 'France',
      'ES': 'Spain',
      'IT': 'Italy',
      'JP': 'Japan',
      'AU': 'Australia',
      'BR': 'Brazil'
    };
    return countryMap[code || ''] || code || 'Not specified';
  }

  formatDate(dateString: string): string {
    if (!dateString || dateString === 'Never') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  // Activity management
  addActivity(message: string, icon: string): void {
    this.activities.unshift({
      message: message,
      icon: icon,
      timestamp: new Date()
    });

    // Keep only last 10 activities
    if (this.activities.length > 10) {
      this.activities = this.activities.slice(0, 10);
    }
  }

  // Notification system
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.notification = {
      show: true,
      message: message,
      type: type
    };

    setTimeout(() => {
      this.notification.show = false;
    }, 3000);
  }
}

