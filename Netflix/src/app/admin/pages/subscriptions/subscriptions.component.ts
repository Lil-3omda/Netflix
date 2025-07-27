import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxProfiles: number;
}

interface PlanDistribution {
  planName: string;
  count: number;
}

interface UserSubscription {
  id: number;
  userName: string;
  userEmail: string;
  planName: string;
  planPrice: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  daysRemaining: number;
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <!-- Hero Header -->
      <div class="bg-danger text-white p-5 rounded-4 position-relative mb-5">
        <!-- <div class="position-absolute top-0 end-0 bg-white opacity-25 rounded-circle" style="width: 200px; height: 200px; transform: translate(50%, -50%)"></div> -->
        <h1 class="display-4 fw-bold">Subscription Management</h1>
        <p class="lead">Manage subscription plans and user subscriptions</p>
      </div>

      <!-- Stats Overview -->
      <div class="row mb-5 g-4">
        <div class="col-md-3">
          <div class="card border-danger text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Total Subscriptions</small>
              <h3 class="card-title">{{ statistics.totalSubscriptions }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-success text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Active Subscriptions</small>
              <h3 class="card-title">{{ statistics.activeSubscriptions }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-warning text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Monthly Revenue</small>
              <h3 class="card-title">EGP {{ statistics.monthlyRevenue }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-danger text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Churn Rate</small>
              <h3 class="card-title">{{ statistics.churnRate }}%</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- User Subscriptions Table -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="mb-0">User Subscriptions</h4>
            <div class="d-flex gap-2">
              <input type="text" class="form-control form-control-sm" [(ngModel)]="searchTerm" (input)="filterSubscriptions()" placeholder="Search users...">
              <select class="form-select form-select-sm" [(ngModel)]="statusFilter" (change)="filterSubscriptions()">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-dark table-hover table-bordered align-middle">
              <thead class="table-secondary text-dark">
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Days Remaining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let subscription of filteredUserSubscriptions; trackBy: trackBySubscriptionId">
                  <td>
                    <div class="fw-bold">{{ subscription.userName }}</div>
                    <small class="text-muted">{{ subscription.userEmail }}</small>
                  </td>
                  <td>
                    <span class="badge bg-danger" *ngIf="subscription.planName === 'Premium'">Premium</span>
                    <span class="badge bg-primary" *ngIf="subscription.planName === 'Standard'">Standard</span>
                    <span class="badge bg-secondary" *ngIf="subscription.planName === 'Basic'">Basic</span>
                  </td>
                  <td>EGP {{ subscription.planPrice }}</td>
                  <td>
                    <span class="badge bg-success" *ngIf="subscription.isActive">Active</span>
                    <span class="badge bg-danger" *ngIf="!subscription.isActive">Inactive</span>
                  </td>
                  <td>
                    <span [ngClass]="{
                      'text-danger': subscription.daysRemaining < 7,
                      'text-warning': subscription.daysRemaining >= 7 && subscription.daysRemaining < 30,
                      'text-success': subscription.daysRemaining >= 30
                    }">
                      {{ subscription.daysRemaining > 0 ? subscription.daysRemaining + ' days' : 'Expired' }}
                    </span>
                  </td>
                  <td>
                    <div *ngIf="subscription.isActive" class="btn-group btn-group-sm">
                      <button class="btn btn-outline-primary" (click)="extendSubscription(subscription)">Extend</button>
                      <button class="btn btn-outline-danger" (click)="cancelSubscription(subscription)">Cancel</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
export class SubscriptionsComponent implements OnInit, OnDestroy {
  subscriptionPlans: SubscriptionPlan[] = [];



  statistics: {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  churnRate: number;
  planDistribution: PlanDistribution[];
} = {
  totalSubscriptions: 0,
  activeSubscriptions: 0,
  monthlyRevenue: 0,
  churnRate: 0,
  planDistribution: []
};



  userSubscriptions: UserSubscription[] = [];
  filteredUserSubscriptions: UserSubscription[] = [];
  searchTerm: string = '';
  statusFilter: string = '';

  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSubscriptionPlans();
    this.loadStatistics();
    this.loadUserSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSubscriptionPlans(): void {
    this.adminService.getSubscriptionPlans()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (plans) => {
          this.subscriptionPlans = plans;
        },
        error: (error) => {
          console.error('Error loading subscription plans:', error);
        }
      });
  }

  private loadStatistics(): void {
    this.adminService.getSubscriptionStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statistics = stats;
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
        }
      });
  }

  private loadUserSubscriptions(): void {
    this.adminService.getUserSubscriptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (subs) => {
          this.userSubscriptions = subs;
          this.filterSubscriptions();
        },
        error: (error) => {
          console.error('Error loading user subscriptions:', error);
        }
      });
  }

  filterSubscriptions(): void {
    this.filteredUserSubscriptions = this.userSubscriptions.filter(sub => {
      const matchesSearchTerm = sub.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                                sub.userEmail.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === '' || (sub.isActive && this.statusFilter === 'active') || (!sub.isActive && this.statusFilter === 'inactive');
      return matchesSearchTerm && matchesStatus;
    });
  }

  extendSubscription(subscription: UserSubscription): void {
  this.adminService.extendSubscription(subscription.id.toString(), 30)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        console.log('Subscription extended:', subscription);
        this.loadUserSubscriptions(); // Refresh data
      },
      error: (error) => {
        console.error('Error extending subscription:', error);
      }
    });
}


  cancelSubscription(subscription: UserSubscription): void {
  this.adminService.cancelSubscription(subscription.id.toString())
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        console.log('Subscription cancelled:', subscription);
        this.loadUserSubscriptions(); // Refresh data
      },
      error: (error) => {
        console.error('Error cancelling subscription:', error);
      }
    });
}


  openPlanModal(): void {
    // Implement plan modal logic here
    console.log('Open Plan Modal');
  }

  editPlan(plan: SubscriptionPlan): void {
    // Implement edit plan logic here
    console.log('Edit Plan:', plan);
  }

  deletePlan(plan: SubscriptionPlan): void {
    // Implement delete plan logic here
    console.log('Delete Plan:', plan);
  }

  trackByPlanId(index: number, plan: SubscriptionPlan): number {
    return plan.id;
  }

  trackBySubscriptionId(index: number, subscription: UserSubscription): number {
    return subscription.id;
  }

  getPercentage(count: number): number {
    const total = this.statistics.planDistribution.reduce((sum: number, item: any) => sum + item.count, 0);
    return total > 0 ? (count / total) * 100 : 0;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
