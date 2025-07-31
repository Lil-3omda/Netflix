import { Component, OnInit } from '@angular/core';
import { IProfile, ProfilesService } from '../profiels';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProfileService } from '../../../core/services/profile.service';

interface SubscriptionInfo {
  planName: string;
  maxProfiles: number;
  currentProfiles: number;
}

@Component({
  selector: 'app-choose-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <div class="netflix-logo" (click)="goHome()">
          <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
            <g>
              <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
            </g>
          </svg>
        </div>
        <div class="header-actions">
          <div class="dropdown">
            <button class="dropdown-toggle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span class="dropdown-arrow">▼</span>
            </button>
            <div class="dropdown-menu">
              <a (click)="goToAccount()" class="dropdown-item">Account</a>
              <a (click)="logout()" class="dropdown-item">Sign Out</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="profile-content">
        <h1 class="profile-title">Who's watching?</h1>

        <!-- Subscription Info -->
        <div class="subscription-info" *ngIf="subscriptionInfo">
          <p>{{ subscriptionInfo.planName }} Plan - {{ subscriptionInfo.currentProfiles }}/{{ subscriptionInfo.maxProfiles }} profiles used</p>
        </div>

        <!-- Profiles Grid -->
        <div class="profiles-grid">
          <!-- Existing Profiles -->
          <div
            class="profile-item"
            *ngFor="let profile of profiles"
            (click)="selectProfile(profile.id)">
            <div class="profile-avatar">
              <img [src]="getProfileImage(profile.name)" [alt]="profile.name">
            </div>
            <span class="profile-name">{{ profile.name }}</span>
          </div>

          <!-- Add Profile Button -->
          <div
            class="profile-item add-profile"
            *ngIf="canAddProfile()"
            (click)="showAddProfileForm()">
            <div class="profile-avatar add-avatar">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="profile-name">Add Profile</span>
          </div>
        </div>

        <!-- Manage Profiles Button -->
        <div class="manage-profiles">
          <button class="manage-btn" (click)="toggleManageMode()">
            {{ manageMode ? 'Done' : 'Manage Profiles' }}
          </button>
        </div>
      </div>

      <!-- Add Profile Modal -->
      <div class="modal-overlay" *ngIf="showAddProfile" (click)="closeAddProfile()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Add Profile</h2>
            <button class="close-btn" (click)="closeAddProfile()">×</button>
          </div>
          <div class="modal-body">
            <div class="profile-form">
              <div class="form-avatar">
                <img [src]="getProfileImage(newProfileName || 'Default')" alt="Profile">
              </div>
              <div class="form-inputs">
                <input
                  type="text"
                  [(ngModel)]="newProfileName"
                  placeholder="Name"
                  class="profile-input"
                  maxlength="20">
                <div class="error-message" *ngIf="error">{{ error }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="cancel-btn" (click)="closeAddProfile()">Cancel</button>
            <button class="save-btn" (click)="createProfile()" [disabled]="isLoading">
              <span *ngIf="!isLoading">Save</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Upgrade Plan Modal -->
      <div class="modal-overlay" *ngIf="showUpgradeModal" (click)="closeUpgradeModal()">
        <div class="modal-content upgrade-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Profile Limit Reached</h2>
            <button class="close-btn" (click)="closeUpgradeModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="upgrade-content">
              <div class="upgrade-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#e50914">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Upgrade to create more profiles</h3>
              <p>You've reached the maximum number of profiles for your {{ subscriptionInfo?.planName }} plan ({{ subscriptionInfo?.maxProfiles }}).</p>
              <p>Upgrade your plan to create more profiles and enjoy additional features.</p>
              <div class="upgrade-benefits">
                <div class="benefit">✓ More profiles for your family</div>
                <div class="benefit">✓ Better video quality</div>
                <div class="benefit">✓ Watch on more devices</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="cancel-btn" (click)="closeUpgradeModal()">Not Now</button>
            <button class="upgrade-btn" (click)="goToUpgrade()">Upgrade Plan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./choose-profile.css']
})
export class ChooseProfile implements OnInit {
  profiles: IProfile[] = [];
  user: any = null;
  userId: string = '';
  newProfileName: string = '';
  error: string = '';
  showAddProfile: boolean = false;
  showUpgradeModal: boolean = false;
  manageMode: boolean = false;
  isLoading: boolean = false;
  subscriptionInfo: SubscriptionInfo | null = null;

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('netflix_user');
    if (stored) {
      try {
        this.user = JSON.parse(stored);
        this.userId = String(this.user.id ?? this.user.userId ?? '');
      } catch (e) {
        console.error('Invalid user JSON:', e);
        this.userId = '';
      }
    }

    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProfiles();
    this.loadSubscriptionInfo();
  }

  loadProfiles(): void {
    this.profilesService.getProfilesByUserId(this.userId).subscribe({
      next: (res) => {
        this.profiles = res;
      },
      error: (err) => {
        console.error('Error loading profiles:', err);
        this.error = 'Failed to load profiles. Please try again later.';
        this.profiles = [];
      }
    });
  }

  loadSubscriptionInfo(): void {
    this.http.get<any>(`${environment.apiUrl}/Subscription/user-subscription/${this.userId}`).subscribe({
      next: (res) => {
        if (!res || !res.planName) {
          this.router.navigate(['/signup'], { queryParams: { step: 4, message: 'Please choose a plan before creating profiles.' } });
          return;
        }

        this.subscriptionInfo = {
          planName: res.planName,
          maxProfiles: res.maxProfiles,
          currentProfiles: this.profiles.length
        };
      },
      error: (err) => {
      console.error('Error loading subscription info:', err);
      if (err.status === 404) {
        this.router.navigate(['/account'], {
          queryParams: {
            tab: 'subscription',
            message: 'Please subscribe before creating profiles.'
          }
        });
      }
    }
    });
  }

  selectProfile(profileId: number): void {
    const selectedProfile = this.profiles.find(p => p.id === profileId);
    if (selectedProfile) {


    this.profileService.setCurrentProfile({
      ...selectedProfile,
      userId: selectedProfile.userId.toString()
    });
      this.router.navigate(['/Home']);
    }
  }

  canAddProfile(): boolean {
    if (!this.subscriptionInfo) return true;
    return this.profiles.length < this.subscriptionInfo.maxProfiles;
  }

  showAddProfileForm(): void {
    if (this.canAddProfile()) {
      this.showAddProfile = true;
    } else {
      this.showUpgradeModal = true;
    }
  }

  closeAddProfile(): void {
    this.showAddProfile = false;
    this.newProfileName = '';
    this.error = '';
  }

  closeUpgradeModal(): void {
    this.showUpgradeModal = false;
  }

  createProfile(): void {
    if (this.newProfileName.trim() === '') {
      this.error = 'Profile name cannot be empty.';
      return;
    }

    if (!this.canAddProfile()) {
      this.showUpgradeModal = true;
      this.closeAddProfile();
      return;
    }

    this.isLoading = true;

    const newProfile = {
      name: this.newProfileName.trim(),
      userId: this.userId
    };

    this.profilesService.createProfile(newProfile).subscribe({
      next: (res) => {
        this.profiles.push(res);
        this.newProfileName = '';
        this.error = '';
        this.isLoading = false;
        this.closeAddProfile();
        this.loadSubscriptionInfo(); // Refresh subscription info
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        this.isLoading = false;
        if (err.error?.message?.includes('limit')) {
          this.closeAddProfile();
          this.showUpgradeModal = true;
        } else {
          this.error = err.error?.message || 'Failed to create profile. Please try again later.';
        }
      }
    });
  }

  toggleManageMode(): void {
    this.manageMode = !this.manageMode;
  }

  getProfileImage(name: string): string {
    const avatars = [
      '/assets/images/netflix2.jpg',
      '/assets/images/netflix3.jpg',
      '/assets/images/netflix4.jpg',
      '/assets/images/Netflix-avatar.png',
      '/assets/profiles/avatar2.png'
    ];

    // Use name hash to consistently assign avatar
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);

    return avatars[Math.abs(hash) % avatars.length];
  }

  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  goToUpgrade(): void {
    this.router.navigate(['/account'], { queryParams: { tab: 'subscription' } });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
