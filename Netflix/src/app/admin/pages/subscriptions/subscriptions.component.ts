import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { AnalyticsData } from '../../models/admin.interfaces';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxProfiles: number;
}

interface PlanDistribution {
  planName: string;
  count: number;
  revenue: number;
}

interface UserSubscription {
  id: number;
  userId: string;
  userName: string;
  userEmail: string;
  planName: string;
  planPrice: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  daysRemaining: number;
  status?: string; // Added for grouped view
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <!-- Header -->
      <div class="bg-danger text-white p-5 rounded-4 mb-5">
        <h1 class="display-4 fw-bold">Subscription Management</h1>
        <p class="lead">Manage subscription plans and user subscriptions</p>
      </div>

      <!-- Enhanced Stats Row
      <div class="row mb-4 g-4">
        <div class="col-md-2" *ngFor="let stat of [
          { label: 'Total Users', value: subscriptionStats?.totalUsers || 0, class: 'primary' },
          { label: 'Plan Changes', value: subscriptionStats?.usersWithPlanChanges || 0, class: 'warning' },
          { label: 'Total Subscriptions', value: subscriptionStats?.totalSubscriptions || 0, class: 'danger' },
          { label: 'Active', value: subscriptionStats?.activeSubscriptions || 0, class: 'success' },
          { label: 'Expired', value: subscriptionStats?.expiredSubscriptions || 0, class: 'secondary' },
          { label: 'Monthly Revenue', value: 'EGP ' + (analyticsData?.monthlyRevenue | number:'1.2-2'), class: 'info' }
        ]">
          <div class="card border-{{ stat.class }} text-bg-dark h-100">
            <div class="card-body text-center">
              <small class="text-secondary">{{ stat.label }}</small>
              <h5 class="card-title">{{ stat.value }}</h5>
            </div>
          </div>
        </div>
      </div> -->

      <!-- First Row of Stats -->
      <div class="row mb-5 g-4">
        <div class="col-md-3" *ngFor="let stat of [
          { label: 'Total Subscriptions', value: analyticsData?.totalSubscriptions || 0, class: 'danger' },
          { label: 'Active Subscriptions', value: analyticsData?.activeSubscriptions || 0, class: 'success' },
          { label: 'Monthly Revenue', value: 'EGP ' + (analyticsData?.monthlyRevenue | number:'1.2-2'), class: 'warning' },
          { label: 'Renewal Rate', value: (analyticsData?.renewalRate || 0) + '%', class: 'info' }
        ]">
          <div class="card border-{{ stat.class }} text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">{{ stat.label }}</small>
              <h3 class="card-title">{{ stat.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Row of Stats -->
      <div class="row mb-5 g-4">
        <div class="col-md-3" *ngFor="let stat of [
          { label: 'Customer Lifetime Value', value: 'EGP ' + (analyticsData?.customerLifetimeValue | number:'1.2-2'), class: 'primary' },
          { label: 'Retention Rate', value: (analyticsData?.retentionRate || 0) + '%', class: 'success' },
          { label: 'Growth Rate', value: analyticsData?.growthRate || 0, class: 'warning' },
          { label: 'ARPU', value: 'EGP ' + (analyticsData?.ARPU | number:'1.2-2'), class: 'info' }
        ]">
          <div class="card border-{{ stat.class }} text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">{{ stat.label }}</small>
              <h3 class="card-title">{{ stat.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan Distribution -->
      <div class="card text-bg-dark border-secondary mb-4" *ngIf="analyticsData?.planDistribution?.length">
        <div class="card-header">
          <h5>Plan Distribution</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Subscribers</th>
                  <th>Revenue</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let plan of analyticsData.planDistribution">
                  <td>{{ plan.planName || 'N/A' }}</td>
                  <td>{{ plan.count || 0 }}</td>
                  <td>EGP {{ (plan.revenue | number:'1.2-2') || '0.00' }}</td>
                  <td>
                    {{ analyticsData.totalSubscriptions > 0 ?
                      ((plan.count / analyticsData.totalSubscriptions * 100) | number:'1.0-2') : 0 }}%
                  </td>
                </tr>
                <tr *ngIf="analyticsData.planDistribution.length === 0">
                  <td colspan="4" class="text-center text-muted">No plan distribution data available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="card text-bg-dark border-secondary mb-4">
        <div class="card-body d-flex gap-3 align-items-center flex-wrap">
          <input type="text" class="form-control" [(ngModel)]="searchTerm" (input)="filterSubscriptions()" placeholder="Search users...">
          <select class="form-select w-auto" [(ngModel)]="statusFilter" (change)="filterSubscriptions()">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" [(ngModel)]="showGroupedView" id="viewToggle">
            <label class="form-check-label text-white" for="viewToggle">
              Group by User (Show Plan History)
            </label>
          </div>
        </div>
      </div>

      <!-- Individual Subscriptions Table -->
      <div class="card text-bg-dark border-secondary" *ngIf="!showGroupedView">
        <div class="card-header">
          <h5>All Subscriptions (Individual View)</h5>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-dark table-hover table-bordered align-middle">
            <thead class="table-secondary text-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Days Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let sub of filteredUserSubscriptions; trackBy: trackBySubscriptionId">
                <td>{{ sub.id }}</td>
                <td>
                  <div class="fw-bold">{{ sub.userName }}</div>
                  <small class="text-muted">{{ sub.userEmail }}</small>
                </td>
                <td>
                  <span class="badge bg-danger" *ngIf="sub.planName === 'Premium'">Premium</span>
                  <span class="badge bg-primary" *ngIf="sub.planName === 'Standard'">Standard</span>
                  <span class="badge bg-secondary" *ngIf="sub.planName === 'Basic'">Basic</span>
                  <span class="badge bg-info" *ngIf="!['Premium','Standard','Basic'].includes(sub.planName)">{{ sub.planName }}</span>
                </td>
                <td><strong>EGP {{ sub.planPrice }}</strong></td>
                <td><small>{{ formatDate(sub.startDate) }}</small></td>
                <td><small>{{ formatDate(sub.endDate) }}</small></td>
                <td>
                  <span class="badge" [ngClass]="sub.isActive ? 'bg-success' : (sub.status === 'Expired/Cancelled' ? 'bg-danger' : 'bg-warning')">
                    {{ sub.status || (sub.isActive ? 'Active' : 'Inactive') }}
                  </span>
                </td>
                <td>
                  <span [ngClass]="{
                    'text-danger': sub.daysRemaining < 7,
                    'text-warning': sub.daysRemaining >= 7 && sub.daysRemaining < 30,
                    'text-success': sub.daysRemaining >= 30
                  }">
                    {{ sub.daysRemaining > 0 ? sub.daysRemaining + ' days' : 'Expired' }}
                  </span>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <!-- <button class="btn btn-outline-info" (click)="openEditModal(sub)" title="Edit Subscription">
                      <i class="bi bi-pencil"></i>
                    </button> -->
                    <button class="btn btn-outline-danger" (click)="confirmDelete(sub)" title="Delete Subscription">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredUserSubscriptions.length === 0">
                <td colspan="9" class="text-center text-muted py-4">
                  <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                  No subscriptions found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Grouped Users with Subscription History -->
      <div class="card text-bg-dark border-secondary" *ngIf="showGroupedView">
        <div class="card-header">
          <h5>Users with Subscription History</h5>
        </div>
        <div class="card-body">
          <div class="accordion accordion-dark" id="subscriptionAccordion">
            <div class="accordion-item bg-dark border-secondary" *ngFor="let user of groupedUserSubscriptions; let i = index">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-dark text-white border-secondary"
                        type="button"
                        [attr.data-bs-toggle]="'collapse'"
                        [attr.data-bs-target]="'#collapse' + i">
                  <div class="d-flex justify-content-between w-100 me-3">
                    <div>
                      <strong>{{ user.userName }}</strong>
                      <small class="text-muted ms-2">{{ user.userEmail }}</small>
                    </div>
                    <div class="d-flex gap-3">
                      <span class="badge bg-info">{{ user.totalSubscriptions }} Subscriptions</span>
                      <span class="badge bg-warning" *ngIf="user.hasMultipleSubscriptions">Plan Changes</span>
                      <span class="badge" [ngClass]="user.currentSubscription ? 'bg-success' : 'bg-danger'">
                        {{ user.currentSubscription ? 'Active' : 'No Active Plan' }}
                      </span>
                    </div>
                  </div>
                </button>
              </h2>
              <div [id]="'collapse' + i" class="accordion-collapse collapse" [attr.data-bs-parent]="'#subscriptionAccordion'">
                <div class="accordion-body">
                  <div class="table-responsive">
                    <table class="table table-dark table-sm">
                      <thead>
                        <tr>
                          <th>Plan</th>
                          <th>Price</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let subscription of user.subscriptionHistory"
                            [ngClass]="subscription.isActive ? 'table-success' : 'table-secondary'">
                          <td>
                            <span class="badge" [ngClass]="subscription.isActive ? 'bg-success' : 'bg-secondary'">
                              {{ subscription.planName }}
                            </span>
                          </td>
                          <td>EGP {{ subscription.planPrice }}</td>
                          <td>{{ formatDate(subscription.startDate) }}</td>
                          <td>{{ formatDate(subscription.endDate) }}</td>
                          <td>
                            <span class="badge" [ngClass]="subscription.isActive ? 'bg-success' : (subscription.status === 'Expired/Cancelled' ? 'bg-danger' : 'bg-warning')">
                              {{ subscription.status || (subscription.isActive ? 'Active' : 'Inactive') }}
                            </span>
                          </td>
                          <td>
                            {{ getDurationInDays(subscription.startDate, subscription.endDate) }} days
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Modal -->
      <div *ngIf="showDeleteModal && selectedSubscription" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-bg-dark border-danger">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Confirm Deletion</h5>
              <button type="button" class="btn-close btn-close-white" (click)="closeModals()"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete the subscription of
              <strong>{{ selectedSubscription.userName }}</strong>?
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeModals()">Cancel</button>
              <button class="btn btn-danger" (click)="deleteSubscription()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <div *ngIf="showEditModal && selectedSubscription" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-bg-dark border-secondary">
            <div class="modal-header">
              <h5 class="modal-title">Edit Subscription</h5>
              <button type="button" class="btn-close btn-close-white" (click)="closeModals()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Plan</label>
                <select [(ngModel)]="editModel.planId" class="form-select">
                  <option *ngFor="let plan of subscriptionPlans" [value]="plan.id">{{ plan.name }}</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeModals()">Cancel</button>
              <button class="btn btn-danger" (click)="saveEditedSubscription()">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal.fade.show { display: block; }
  `]
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  subscriptionPlans: SubscriptionPlan[] = [];
  userSubscriptions: UserSubscription[] = [];
  filteredUserSubscriptions: UserSubscription[] = [];
  groupedUserSubscriptions: any[] = [];
  allSubscriptions: any[] = [];
  subscriptionStats: any = {};
  showGroupedView: boolean = false;
  editingSubscription!: UserSubscription;

  statistics = {
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    churnRate: 0,
    planDistribution: [] as PlanDistribution[]
  };

  searchTerm = '';
  statusFilter = '';

  // Modal state
  selectedSubscription: UserSubscription | null = null;
  showDeleteModal = false;
  showEditModal = false;

  // Initialize analyticsData with default values
  analyticsData: AnalyticsData = {
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    renewalRate: 0,
    customerLifetimeValue: 0,
    retentionRate: 0,
    growthRate: 0,
    ARPU: 0,
    planDistribution: []
  };

  // Separate model for edit form
  editModel: { planId: number } = { planId: 0 };

  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSubscriptionPlans();
    this.loadStatistics();
    this.loadUserSubscriptions();
    this.loadAnalytics();
  }

  private loadStatistics(): void {
    this.adminService.getSubscriptionStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statistics = stats;
          // Merge stats with analyticsData
          this.analyticsData = {
            ...this.analyticsData,
            totalSubscriptions: stats.totalSubscriptions,
            activeSubscriptions: stats.activeSubscriptions,
            monthlyRevenue: stats.monthlyRevenue,
            planDistribution: stats.planDistribution || []
          };
        },
        error: (e) => console.error('Error loading stats', e)
      });
  }

  private loadAnalytics(): void {
    this.adminService.getAnalyticsOverview()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Raw analytics data:', data);
          this.analyticsData = {
            ...this.analyticsData,
            ...data,
            renewalRate: data.renewalRate || 0,
            customerLifetimeValue: data.customerLifetimeValue || 0,
            retentionRate: data.retentionRate || 0,
            growthRate: data.growthRate || 0,
            ARPU: data.ARPU || 0
          };
        },
        error: (err) => console.error('Failed to load analytics', err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSubscriptionPlans(): void {
    this.adminService.getSubscriptionPlans()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (plans) => this.subscriptionPlans = plans || [],
        error: (e) => console.error('Error loading plans', e)
      });
  }

  private loadUserSubscriptions(): void {
    this.adminService.getUserSubscriptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.userSubscriptions = response.allSubscriptions || [];
          this.groupedUserSubscriptions = response.userSubscriptions || [];
          this.subscriptionStats = {
            totalUsers: response.totalUsers,
            totalSubscriptions: response.totalSubscriptions,
            activeSubscriptions: response.activeSubscriptions,
            expiredSubscriptions: response.expiredSubscriptions,
            usersWithPlanChanges: response.usersWithPlanChanges
          };
          this.filterSubscriptions();
        },
        error: (e) => console.error('Error loading subscriptions', e)
      });
  }

  filterSubscriptions(): void {
    this.filteredUserSubscriptions = this.userSubscriptions.filter(sub => {
      const matchesSearch = sub.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || sub.userEmail.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.statusFilter === '' ||
        (sub.isActive && this.statusFilter === 'active') ||
        (!sub.isActive && this.statusFilter === 'inactive');

      return matchesSearch && matchesStatus;
    });
  }

  confirmDelete(sub: UserSubscription): void {
    this.selectedSubscription = sub;
    this.showDeleteModal = true;
    this.showEditModal = false;
  }

  openEditModal(sub: UserSubscription): void {
    this.selectedSubscription = sub;
    this.editingSubscription = sub;
    const selectedPlan = this.subscriptionPlans.find(p => p.name === sub.planName);
    this.editModel = { planId: selectedPlan?.id || 0 };
    this.showEditModal = true;
    this.showDeleteModal = false;
  }

  deleteSubscription(): void {
    if (!this.selectedSubscription) return;

    this.adminService.cancelSubscription(+this.selectedSubscription.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadUserSubscriptions();
          this.closeModals();
        },
        error: (e) => {
          console.error('Error deleting subscription', e);
          this.closeModals();
        }
      });
  }

  saveEditedSubscription(): void {
    if (!this.selectedSubscription) return;

    this.adminService.updateUserSubscription(this.editingSubscription.id, {
        planId: this.editModel.planId
      })
      .subscribe({
        next: () => {
          this.closeModals();
          this.loadUserSubscriptions();
        },
        error: (err) => {
          console.error('Error updating subscription', err);
        }
      });
  }

  closeModals(): void {
    this.showDeleteModal = false;
    this.showEditModal = false;
    this.selectedSubscription = null;
    this.editModel = { planId: 0 };
  }

  trackBySubscriptionId(index: number, sub: UserSubscription): number {
    return sub.id;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  getDurationInDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
