import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { User } from '../../models/movie.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users-container">
      <div class="users-header">
        <h1>User Management</h1>
        <div class="filter-options">
          <select (change)="filterUsers($event)" class="filter-select">
            <option value="">All Users</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="users-grid">
        <div *ngFor="let user of filteredUsers" class="user-card">
          <div class="user-avatar">
            <img src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg" [alt]="user.name">
          </div>
          
          <div class="user-info">
            <h3>{{user.name}}</h3>
            <p class="email">{{user.email}}</p>
            <div class="user-meta">
              <span class="subscription">{{user.subscriptionType | titlecase}}</span>
              <span class="status" [class]="'status-' + user.status">{{user.status}}</span>
            </div>
            <div class="user-stats">
              <div class="stat">
                <span class="label">Joined:</span>
                <span class="value">{{user.registrationDate | date:'mediumDate'}}</span>
              </div>
              <div class="stat">
                <span class="label">Last Active:</span>
                <span class="value">{{user.lastActive | date:'short'}}</span>
              </div>
              <div class="stat">
                <span class="label">Watch History:</span>
                <span class="value">{{user.watchHistory.length}} items</span>
              </div>
            </div>
            
            <div class="user-actions">
              <button (click)="viewDetails(user)" class="details-btn">View Details</button>
              <button (click)="toggleUserStatus(user)" 
                      class="status-btn"
                      [class.suspend]="user.status === 'active'"
                      [class.activate]="user.status !== 'active'">
                {{user.status === 'active' ? 'Suspend' : 'Activate'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .users-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .users-header h1 {
      margin: 0;
      color: #E50914;
    }

    .filter-select {
      padding: 10px 15px;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
    }

    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
    }

    .user-card {
      background: #1a1a1a;
      border-radius: 12px;
      padding: 25px;
      border: 1px solid #333;
      transition: transform 0.3s ease;
    }

    .user-card:hover {
      transform: translateY(-5px);
      border-color: #E50914;
    }

    .user-avatar {
      text-align: center;
      margin-bottom: 20px;
    }

    .user-avatar img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #E50914;
    }

    .user-info h3 {
      margin: 0 0 5px 0;
      text-align: center;
      font-size: 1.3rem;
    }

    .email {
      text-align: center;
      color: #ccc;
      margin: 0 0 15px 0;
      font-size: 0.9rem;
    }

    .user-meta {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .subscription {
      background: #3b82f6;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-active {
      background: #22c55e;
      color: white;
    }

    .status-suspended {
      background: #ef4444;
      color: white;
    }

    .status-inactive {
      background: #6b7280;
      color: white;
    }

    .user-stats {
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 0.85rem;
    }

    .stat:last-child {
      margin-bottom: 0;
    }

    .label {
      color: #ccc;
    }

    .value {
      color: #fff;
      font-weight: 500;
    }

    .user-actions {
      display: flex;
      gap: 10px;
    }

    .details-btn, .status-btn {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .details-btn {
      background: #3b82f6;
      color: white;
    }

    .status-btn.suspend {
      background: #ef4444;
      color: white;
    }

    .status-btn.activate {
      background: #22c55e;
      color: white;
    }

    .details-btn:hover {
      background: #2563eb;
    }

    .status-btn:hover {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .users-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .users-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers(event: any): void {
    const filterValue = event.target.value;
    if (filterValue) {
      this.filteredUsers = this.users.filter(user => user.status === filterValue);
    } else {
      this.filteredUsers = this.users;
    }
  }

  viewDetails(user: User): void {
    console.log('View details for user:', user);
  }

  toggleUserStatus(user: User): void {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    if (confirm(`Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'activate'} this user?`)) {
      this.adminService.updateUserStatus(user.id, newStatus).subscribe();
    }
  }
}