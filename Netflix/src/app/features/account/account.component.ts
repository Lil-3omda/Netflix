import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { PopupService } from '../../shared/services/popup.service';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
}

// interface SubscriptionData {
//   planName: string;
//   price: number;
//   maxProfiles: number;
//   currentProfiles: number;
//   nextBillingDate: string;
//   status: string;
// }

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="account-container">
      <!-- Header -->
      <div class="account-header">
        <div class="netflix-logo" (click)="goHome()">
          <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
            <g>
              <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
            </g>
          </svg>
        </div>
        <div class="header-actions">
          <button class="back-btn" (click)="goToProfiles()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Profiles
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="account-content">
        <h1 class="account-title">Account</h1>

        <!-- Tab Navigation -->
        <div class="tab-navigation">
          <button
            class="tab-btn"
            [class.active]="activeTab === 'profile'"
            (click)="setActiveTab('profile')">
            Profile & Security
          </button>
          <!-- <button
            class="tab-btn"
            [class.active]="activeTab === 'subscription'"
            (click)="setActiveTab('subscription')">
            Plan & Billing
          </button> -->
        </div>

        <!-- Profile & Security Tab -->
        <div class="tab-content" *ngIf="activeTab === 'profile'">
          <div class="section">
            <h2>Profile Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Full Name</label>
                <div class="editable-field" *ngIf="!editingName">
                  <span>{{ userData?.fullName }}</span>
                  <button class="edit-btn" (click)="startEditing('name')">Edit</button>
                </div>
                <div class="edit-form" *ngIf="editingName">
                  <input
                    type="text"
                    [(ngModel)]="editFullName"
                    class="edit-input">
                  <div class="edit-actions">
                    <button class="save-btn" (click)="saveFullName()" [disabled]="isLoading">Save</button>
                    <button class="cancel-btn" (click)="cancelEditing('name')">Cancel</button>
                  </div>
                </div>
                <div class="error-message" *ngIf="nameError">{{ nameError }}</div>
              </div>

              <div class="info-item">
                <label>Email</label>
                <div class="editable-field">
                  <span>{{ userData?.email }}</span>
                  <span class="verified-badge" *ngIf="userData?.isEmailVerified">✓ Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>Security</h2>
            <div class="info-grid">
              <div class="info-item">
                <label>Password</label>
                <div class="editable-field" *ngIf="!editingPassword">
                  <span>••••••••</span>
                  <button class="edit-btn" (click)="startEditing('password')">Change</button>
                </div>
                <div class="edit-form" *ngIf="editingPassword">
                  <input
                    type="password"
                    [(ngModel)]="currentPassword"
                    placeholder="Current password"
                    class="edit-input">
                  <input
                    type="password"
                    [(ngModel)]="newPassword"
                    placeholder="New password"
                    class="edit-input">
                  <input
                    type="password"
                    [(ngModel)]="confirmPassword"
                    placeholder="Confirm new password"
                    class="edit-input">
                  <div class="edit-actions">
                    <button class="save-btn" (click)="savePassword()" [disabled]="isLoading">Save</button>
                    <button class="cancel-btn" (click)="cancelEditing('password')">Cancel</button>
                  </div>
                </div>
                <div class="error-message" *ngIf="passwordError">{{ passwordError }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Plan & Billing Tab -->
        <!-- <div class="tab-content" *ngIf="activeTab === 'subscription'">
          <div class="section">
            <h2>Current Plan</h2>
            <div class="section" *ngIf="!subscriptionData">
              <h2>You don't have a subscription plan</h2>
              <p>You need to select a plan to enjoy Netflix.</p>
              <button class="btn btn-primary" (click)="goToSignupWithPlan('premium')">Choose a Plan</button>
            </div>
            <div class="current-plan" *ngIf="subscriptionData">
              <div class="plan-header">
                <h3>{{ subscriptionData.planName }}</h3>
                <span class="plan-price">EGP {{ subscriptionData.price }}/month</span>
              </div>
              <div class="plan-details">
                <p>{{ subscriptionData.currentProfiles }}/{{ subscriptionData.maxProfiles }} profiles used</p>
                <p>Next billing date: {{ formatDate(subscriptionData.nextBillingDate) }}</p>
                <p>Status: <span class="status-badge" [class]="subscriptionData.status.toLowerCase()">{{ subscriptionData.status }}</span></p>
              </div>
              <div class="plan-actions">
                <button class="change-plan-btn" (click)="showChangePlan = true">Change Plan</button>
                <button class="cancel-plan-btn" (click)="showCancelPlan = true">Cancel Subscription</button>
              </div>
            </div>
          </div>


          <div class="section" *ngIf="showChangePlan">
            <h2>Choose a Plan</h2>
            <div class="plans-grid">
              <div
                class="plan-card"
                *ngFor="let plan of availablePlans"
                [class.current]="plan.name === subscriptionData?.planName"
                [class.selected]="selectedPlan === plan.id"
                (click)="selectPlan(plan.id)">
                <h3>{{ plan.name }}</h3>
                <div class="plan-price">EGP {{ plan.price }}/month</div>
                <div class="plan-features">
                  <div class="feature">{{ plan.maxProfiles }} profiles</div>
                  <div class="feature">{{ plan.quality }} quality</div>
                  <div class="feature">{{ plan.resolution }}</div>
                </div>
                <button
                  class="select-plan-btn"
                  *ngIf="plan.name !== subscriptionData?.planName"
                  [disabled]="isLoading"
                  (click)="changePlan(plan.id)">
                  <span *ngIf="!isLoading">Select</span>
                  <div *ngIf="isLoading" class="loading-spinner"></div>
                </button>
                <div class="current-badge" *ngIf="plan.name === subscriptionData?.planName">
                  Current Plan
                </div>
              </div>
            </div>
            <button class="cancel-change-btn" (click)="showChangePlan = false">Cancel</button>
          </div>
        </div>
      </div>


      <div class="modal-overlay" *ngIf="showCancelPlan" (click)="showCancelPlan = false">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Cancel Subscription</h2>
            <button class="close-btn" (click)="showCancelPlan = false">×</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to cancel your Netflix subscription?</p>
            <p>Your subscription will remain active until {{ formatDate(subscriptionData?.nextBillingDate) }}.</p>
          </div>
          <div class="modal-footer">
            <button class="cancel-btn" (click)="showCancelPlan = false">Keep Subscription</button>
            <button class="confirm-btn" (click)="cancelSubscription()">Cancel Subscription</button>
          </div>
        </div>
      </div> -->
    </div>
  `,
  styles: [`
    .account-container {
      min-height: 100vh;
      background: #141414;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .account-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 50px;
      border-bottom: 1px solid #333;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      width: 167px;
      height: 45px;
      fill: #e50914;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: 1px solid #333;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .back-btn:hover {
      background: #333;
    }

    .account-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .account-title {
      font-size: 48px;
      font-weight: 400;
      margin-bottom: 40px;
      text-align: center;
    }

    .tab-navigation {
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      border-bottom: 1px solid #333;
    }

    .tab-btn {
      background: none;
      border: none;
      color: #999;
      padding: 16px 32px;
      font-size: 18px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }

    .tab-btn.active {
      color: white;
      border-bottom-color: #e50914;
    }

    .tab-btn:hover {
      color: white;
    }

    .section {
      margin-bottom: 40px;
      padding: 24px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }

    .section h2 {
      font-size: 24px;
      margin-bottom: 24px;
      color: white;
    }

    .info-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .info-item label {
      font-size: 14px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .editable-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
    }

    .editable-field span {
      font-size: 18px;
    }

    .verified-badge {
      color: #46d369;
      font-size: 14px;
    }

    .edit-btn {
      background: none;
      border: 1px solid #333;
      color: #999;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .edit-btn:hover {
      color: white;
      border-color: white;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .edit-input {
      padding: 12px;
      background: #333;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
    }

    .edit-input:focus {
      outline: none;
      background: #454545;
    }

    .edit-actions {
      display: flex;
      gap: 12px;
    }

    .save-btn, .cancel-btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .save-btn {
      background: #e50914;
      color: white;
    }

    .save-btn:hover {
      background: #f40612;
    }

    .save-btn:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .cancel-btn {
      background: transparent;
      color: #999;
      border: 1px solid #333;
    }

    .cancel-btn:hover {
      background: #333;
      color: white;
    }

    .error-message {
      color: #e50914;
      font-size: 14px;
    }

    .current-plan {
      background: rgba(229, 9, 20, 0.1);
      border: 1px solid #e50914;
      border-radius: 8px;
      padding: 24px;
    }

    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .plan-header h3 {
      font-size: 28px;
      margin: 0;
    }

    .plan-price {
      font-size: 24px;
      font-weight: 600;
      color: #e50914;
    }

    .plan-details p {
      margin: 8px 0;
      color: #999;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      text-transform: uppercase;
    }

    .status-badge.active {
      background: #46d369;
      color: white;
    }

    .plan-actions {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }

    .change-plan-btn, .cancel-plan-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
    }

    .change-plan-btn {
      background: #e50914;
      color: white;
    }

    .change-plan-btn:hover {
      background: #f40612;
    }

    .cancel-plan-btn {
      background: transparent;
      color: #999;
      border: 1px solid #333;
    }

    .cancel-plan-btn:hover {
      background: #333;
      color: white;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .plan-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    .plan-card:hover {
      border-color: #e50914;
    }

    .plan-card.current {
      border-color: #46d369;
    }

    .plan-card.selected {
      border-color: #e50914;
      background: rgba(229, 9, 20, 0.1);
    }

    .plan-card h3 {
      margin: 0 0 12px 0;
      font-size: 24px;
    }

    .plan-card .plan-price {
      font-size: 20px;
      margin-bottom: 16px;
    }

    .plan-features {
      margin-bottom: 20px;
    }

    .feature {
      margin: 8px 0;
      color: #999;
    }

    .select-plan-btn {
      width: 100%;
      padding: 12px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
    }

    .select-plan-btn:hover {
      background: #f40612;
    }

    .select-plan-btn:disabled {
      background: #666;
      cursor: not-allowed;
    }

    .current-badge {
      background: #46d369;
      color: white;
      padding: 8px;
      text-align: center;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
    }

    .cancel-change-btn {
      background: transparent;
      color: #999;
      border: 1px solid #333;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .cancel-change-btn:hover {
      background: #333;
      color: white;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: #141414;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      border: 1px solid #333;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #333;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 24px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #999;
      font-size: 24px;
      cursor: pointer;
    }

    .close-btn:hover {
      color: white;
    }

    .modal-body {
      padding: 24px;
    }

    .modal-body p {
      margin: 12px 0;
      color: #999;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      padding: 24px;
      border-top: 1px solid #333;
    }

    .confirm-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
    }

    .confirm-btn:hover {
      background: #f40612;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff30;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .account-header {
        padding: 20px;
      }

      .logo-svg {
        width: 120px;
        height: 32px;
      }

      .account-title {
        font-size: 36px;
      }

      .tab-navigation {
        flex-direction: column;
      }

      .tab-btn {
        padding: 12px;
      }

      .plans-grid {
        grid-template-columns: 1fr;
      }

      .plan-actions {
        flex-direction: column;
      }

      .modal-content {
        width: 95%;
        margin: 10px;
      }
    }
  `]
})
export class AccountComponent implements OnInit {
  activeTab: string = 'profile';
  userData: UserData | null = null;
  // subscriptionData: SubscriptionData | null = null;
  // availablePlans: any[] = [];

  // Editing states
  editingName: boolean = false;
  editingPassword: boolean = false;
  editFullName: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // UI states
  showChangePlan: boolean = false;
  showCancelPlan: boolean = false;
  selectedPlan: number | null = null;
  isLoading: boolean = false;

  // Error messages
  nameError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private popupService: PopupService
  ) {}

  ngOnInit(): void {
    // Check for tab parameter
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });

    this.loadUserData();
    // this.loadSubscriptionData();
    // this.loadAvailablePlans();
  }

  loadUserData(): void {
    const stored = localStorage.getItem('netflix_user');
    if (stored) {
      this.userData = JSON.parse(stored);
      this.editFullName = this.userData?.fullName || '';
    }
  }

  // loadSubscriptionData(): void {
  //   const userId = this.userData?.id;
  //   if (!userId) return;

  //   this.http.get<any>(`${environment.apiUrl}/Subscription/user-subscription/${userId}`).subscribe({
  //     next: (res) => {
  //       if (res && res.planName) {
  //         this.subscriptionData = {
  //           planName: res.planName,
  //           price: res.price,
  //           maxProfiles: res.maxProfiles,
  //           currentProfiles: res.currentProfiles || 0,
  //           nextBillingDate: res.nextBillingDate,
  //           status: res.status || 'Active'
  //         };
  //       } else {
  //         this.subscriptionData = null;
  //       }
  //     },
  //     error: () => {
  //       this.subscriptionData = null;
  //     }
  //   });
  // }


  // loadAvailablePlans(): void {
  //   this.http.get<any[]>(`${environment.apiUrl}/Subscription/plans`).subscribe({
  //     next: (plans) => {
  //       this.availablePlans = plans.map(plan => ({
  //         id: plan.id,
  //         name: plan.name,
  //         price: plan.price,
  //         maxProfiles: plan.maxProfiles,
  //         quality: this.getQualityText(plan.name),
  //         resolution: this.getResolutionText(plan.name)
  //       }));
  //     },
  //     error: (err) => {
  //       console.error('Error loading plans:', err);
  //     }
  //   });
  // }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  startEditing(field: string): void {
    if (field === 'name') {
      this.editingName = true;
      this.editFullName = this.userData?.fullName || '';
    } else if (field === 'password') {
      this.editingPassword = true;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  cancelEditing(field: string): void {
    if (field === 'name') {
      this.editingName = false;
      this.editFullName = this.userData?.fullName || '';
      this.nameError = '';
    } else if (field === 'password') {
      this.editingPassword = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.passwordError = '';
    }
  }

  saveFullName(): void {
    if (!this.editFullName.trim()) {
      this.nameError = 'Name cannot be empty';
      return;
    }

    this.isLoading = true;
    this.nameError = '';

    // API call to update name
    const updateData = { fullName: this.editFullName.trim() };

    this.http.put(`${environment.apiUrl}/User/update-profile/${this.userData?.id}`, updateData).subscribe({
      next: (response) => {
        if (this.userData) {
          this.userData.fullName = this.editFullName.trim();
          localStorage.setItem('netflix_user', JSON.stringify(this.userData));
        }
        this.editingName = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.nameError = err.error?.message || 'Failed to update name';
        this.isLoading = false;
      }
    });
  }

  savePassword(): void {
    if (!this.currentPassword) {
      this.passwordError = 'Current password is required';
      return;
    }

    if (!this.newPassword || this.newPassword.length < 4) {
      this.passwordError = 'New password must be at least 4 characters';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.passwordError = '';

    const updateData = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.http.put(`${environment.apiUrl}/User/change-password/${this.userData?.id}`, updateData).subscribe({
      next: (response) => {
        this.editingPassword = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.isLoading = false;
        this.popupService.showSuccess('Password changed successfully!', 'Success');
      },
      error: (err) => {
        this.passwordError = err.error?.message || 'Failed to change password';
        this.isLoading = false;
      }
    });
  }

  selectPlan(planId: number): void {
    this.selectedPlan = planId;
  }

  changePlan(planId: number): void {
    this.isLoading = true;

    const changeData = {
      userId: this.userData?.id,
      newPlanId: planId
    };

    this.http.post(`${environment.apiUrl}/Subscription/change-plan`, changeData).subscribe({
      next: (response: any) => {
        if (response.requiresPayment) {
          // Redirect to signup page for plan change payment
          this.router.navigate(['/signup'], {
            queryParams: {
              step: 4,
              planId: planId,
              planChange: true,
              userId: this.userData?.id
            }
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;

        if (err.error?.requiresProfileDeletion) {
          // Show specific error for profile count validation
          const profileDeletionMessage = `${err.error.message}\n\nYou currently have ${err.error.currentProfiles} profiles but the new plan only allows ${err.error.maxAllowed}. Please delete ${err.error.currentProfiles - err.error.maxAllowed} profile(s) before changing your plan.`;

          this.popupService.showConfirm(
            profileDeletionMessage + '\n\nWould you like to go to profile management now?',
            () => {
              this.router.navigate(['/Profile']);
            },
            undefined,
            'Profile Limit Exceeded'
          );
        } else {
          this.popupService.showError(err.error?.message || 'Failed to change plan');
        }
      }
    });
  }

  // cancelSubscription(): void {
  //   this.isLoading = true;

  //   this.http.post(`${environment.apiUrl}/Subscription/cancel/${this.userData?.id}`, {}).subscribe({
  //     next: (response) => {
  //       this.loadSubscriptionData();
  //       this.showCancelPlan = false;
  //       this.isLoading = false;
  //       this.popupService.showSuccess('Subscription cancelled successfully', 'Success');
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.popupService.showError(err.error?.message || 'Failed to cancel subscription');
  //     }
  //   });
  // }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  }

  getQualityText(planName: string): string {
    switch (planName.toLowerCase()) {
      case 'basic': return 'Good';
      case 'standard': return 'Great';
      case 'premium': return 'Best';
      default: return 'Good';
    }
  }

  getResolutionText(planName: string): string {
    switch (planName.toLowerCase()) {
      case 'basic': return '720p (HD)';
      case 'standard': return '1080p (Full HD)';
      case 'premium': return '4K + HDR';
      default: return '720p (HD)';
    }
  }

  goToProfiles(): void {
    this.router.navigate(['/Profile']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToSignupWithPlan(planId: string) {
    this.router.navigate(['/signup'], {
      queryParams: {
        step: 4,
        selectedPlan: planId
      }
    });
  }

}
