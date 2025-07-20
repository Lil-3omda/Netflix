import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="signup-page">
      <header class="signup-header">
        <div class="header-content">
          <div class="netflix-logo" (click)="goHome()">
            <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </div>
          <div class="header-actions">
            <button class="sign-in-btn" (click)="goToLogin()">Sign In</button>
          </div>
        </div>
      </header>

      <div class="signup-container">
        <div class="signup-content">
          <div data-layout="item" class="layout-item_styles__zc08zp30 default-ltr-cache-ins004 e1lmojl70 " dir="ltr" style="--zc08zpy: 0 0 calc(100% - 16px); --zc08zp1g: 0 0 calc(100% - 12px); --zc08zp1y: 0 0 calc(50% - 12px); --zc08zp2g: 0 0 calc(33.333333333333336% - 12px); --zc08zp2y: 0 0 calc(33.333333333333336% - 12px); --zc08zp7: 0px;">
            <div data-layout="wrapper" class="layout-container_wrapperStyles__12wd1go1d layout-container_wrapperStyles_dangerouslyApplyPointerEvents_true__12wd1go1e stack_styles__16b3gu10 default-ltr-cache-i06njo e125orgl0" dir="ltr">
              <div data-layout="stack" class="layout-container_styles__12wd1go1g" dir="ltr" style="--_12wd1go0: flex-start; --_12wd1go1: 0px; --_12wd1go2: column; --_12wd1go3: flex-start; --_12wd1go5: 0px 0px 32px 0px; --_12wd1go6: 0px; --_12wd1go7: 100%;">
                <div data-layout="stackItem" class="layout-item_styles__zc08zp30" dir="ltr" style="--zc08zp0: calc(100% - 0px); --zc08zp7: 0px;">
                   <picture class="d-flex justify-content-center">
                    <img
                      alt=""
                      src="https://dnm.nflximg.net/api/v6/nZVnzNNIegknNmej1Y3hGtfUZfU/AAAAAYL3Poat96BIA7iKG0irg4MM5cXH4o6cb46c2ci_jINem1kWl-CbgntjgPFQVw.png?r=bff"
                      width="260"
                      height="62"
                      class="signup-logo">
                  </picture>
                </div>
              </div>
            </div>
          </div>
          <div class="step-indicator mt-4">
            <span class="step-text">STEP <strong>{{ currentStep }}</strong> OF <strong>3</strong></span>
          </div>

          <!-- Step 1: Registration -->
          <div class="step-content" *ngIf="currentStep === 1">
            <h1>Finish setting up your account</h1>
            <p class="step-description">
              Netflix is personalized for you. Create a password to watch on any device at any time.
            </p>
            <button class="next-button" (click)="nextStep()">Next</button>
          </div>

          <!-- Step 2: Create Password -->
          <div class="step-content" *ngIf="currentStep === 2">
            <h1>Create a password to start your membership</h1>
            <p class="step-description">
              Just a few more steps and you're done!<br>
              We hate paperwork, too.
            </p>

            <form class="signup-form" (ngSubmit)="onSubmit()">
              <div class="input-group">
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  class="signup-input"
                  [class.has-value]="email.length > 0"
                  [class.error]="emailError">
                <label for="email" class="input-label">Email</label>
                <div class="error-message" *ngIf="emailError">{{ emailError }}</div>
              </div>

              <div class="input-group">
                <input
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  class="signup-input"
                  [class.has-value]="password.length > 0"
                  [class.error]="passwordError">
                <label for="password" class="input-label">Add a password</label>
                <button type="button" class="show-password" (click)="togglePassword()">
                  {{ showPassword ? 'HIDE' : 'SHOW' }}
                </button>
                <div class="error-message" *ngIf="passwordError">{{ passwordError }}</div>
              </div>

              <div class="checkbox-group">
                <input type="checkbox" id="offers" [(ngModel)]="receiveOffers" name="offers">
                <label for="offers">Please do not email me Netflix special offers.</label>
              </div>

              <button type="submit" class="next-button" [disabled]="isLoading">
                <span *ngIf="!isLoading">Next</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>
            </form>
          </div>

          <!-- Step 3: Choose Plan -->
          <div class="step-content" *ngIf="currentStep === 3">
            <div class="plan-header">
              <div class="checkmark-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#e50914"/>
                  <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1>Choose the plan that's right for you</h1>
              <div class="plan-benefits">
                <div class="benefit-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Watch all you want. Ad-free.</span>
                </div>
                <div class="benefit-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Recommendations just for you.</span>
                </div>
                <div class="benefit-item">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Change or cancel your plan anytime.</span>
                </div>
              </div>
            </div>

            <div class="plans-container">
              <div class="plan-card"
                   *ngFor="let plan of plans"
                    [class.selected]="selectedPlan === plan.id"
                    (click)="selectPlan(plan.id)">
                <div class="plan-name">{{ plan.name }}</div>
                <div class="plan-quality">{{ plan.quality }}</div>
                <div class="plan-price">EGP {{ plan.price }}/month</div>
              </div>
            </div>

            <div class="plan-details">
              <div class="detail-row">
                <span class="detail-label">Monthly price</span>
                <div class="detail-values">
                  <span *ngFor="let plan of plans" [class.selected]="selectedPlan === plan.id">
                    EGP {{ plan.price }}
                  </span>
                </div>
              </div>
              <div class="detail-row">
                <span class="detail-label">Video quality</span>
                <div class="detail-values">
                  <span *ngFor="let plan of plans" [class.selected]="selectedPlan === plan.id">
                    {{ plan.quality }}
                  </span>
                </div>
              </div>
              <div class="detail-row">
                <span class="detail-label">Resolution</span>
                <div class="detail-values">
                  <span *ngFor="let plan of plans" [class.selected]="selectedPlan === plan.id">
                    {{ plan.resolution }}
                  </span>
                </div>
              </div>
              <div class="detail-row">
                <span class="detail-label">Devices you can use to watch</span>
                <div class="detail-values">
                  <span *ngFor="let plan of plans" [class.selected]="selectedPlan === plan.id">
                    {{ plan.devices }}
                  </span>
                </div>
              </div>
            </div>

            <button class="next-button" (click)="completeSignup()">Next</button>
          </div>
        </div>
      </div>

      <footer class="signup-footer">
        <div class="footer-content">
          <p class="footer-contact">Questions? Call 1-844-505-2993</p>
          <div class="footer-links">
            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
            <a href="#">Netflix Shop</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      background: white;
      color: #333;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .signup-header {
      border-bottom: 1px solid #e6e6e6;
      padding: 20px 0;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 3%;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      height: 45px;
      width: auto;
      fill: #e50914;
    }
    .logo-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }

    .signup-logo {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .sign-in-btn {
      background: transparent;
      color: #333;
      border: none;
      font-size: 19px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
    }

    .sign-in-btn:hover {
      text-decoration: underline;
    }

    .signup-container {
      max-width: 440px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .step-indicator {
      text-align: center;
      margin-bottom: 40px;
    }

    .step-text {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .step-content h1 {
      font-size: 32px;
      font-weight: 500;
      line-height: 1.1;
      margin-bottom: 20px;
      text-align: center;
    }

    .step-description {
      font-size: 18px;
      line-height: 1.4;
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    .signup-form {
      margin-top: 30px;
    }

    .input-group {
      position: relative;
      margin-bottom: 20px;
    }

    .signup-input {
      width: 100%;
      height: 60px;
      padding: 20px 20px 6px;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }

    .signup-input:focus {
      border-color: #0071eb;
    }

    .signup-input.error {
      border-color: #e87c03;
    }

    .input-label {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #8c8c8c;
      font-size: 16px;
      pointer-events: none;
      transition: all 0.2s;
    }

    .signup-input:focus + .input-label,
    .signup-input.has-value + .input-label {
      top: 12px;
      font-size: 11px;
      transform: none;
    }

    .show-password {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #8c8c8c;
      font-size: 14px;
      cursor: pointer;
      text-transform: uppercase;
    }

    .show-password:hover {
      color: #333;
    }

    .error-message {
      color: #e87c03;
      font-size: 13px;
      margin-top: 6px;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin: 20px 0;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .checkbox-group label {
      font-size: 15px;
      line-height: 1.4;
      color: #333;
    }

    .next-button {
      width: 100%;
      height: 64px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
      margin-top: 24px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .next-button:hover:not(:disabled) {
      background: #f40612;
    }

    .next-button:disabled {
      background: #8c8c8c;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Step 3 - Plan Selection */
    .plan-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .checkmark-icon {
      margin-bottom: 20px;
    }

    .plan-benefits {
      margin-top: 30px;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 18px;
    }

    .plans-container {
      display: flex;
      gap: 12px;
      margin-bottom: 30px;
    }

    .plan-card {
      flex: 1;
      padding: 20px 12px;
      border: 2px solid #d2d2d2;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }

    .plan-card.selected {
      border-color: #e50914;
      background: #e50914;
      color: white;
    }

    .plan-card.selected::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #e50914;
    }

    .plan-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .plan-quality {
      font-size: 14px;
      margin-bottom: 8px;
      opacity: 0.8;
    }

    .plan-price {
      font-size: 16px;
      font-weight: 600;
    }

    .plan-details {
      border: 1px solid #d2d2d2;
      border-radius: 8px;
      margin-bottom: 30px;
    }

    .detail-row {
      display: flex;
      padding: 16px 20px;
      border-bottom: 1px solid #d2d2d2;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-label {
      flex: 1;
      font-weight: 600;
    }

    .detail-values {
      flex: 2;
      display: flex;
      gap: 20px;
    }

    .detail-values span {
      flex: 1;
      text-align: center;
      opacity: 0.3;
    }

    .detail-values span.selected {
      opacity: 1;
      font-weight: 600;
    }

    .signup-footer {
      background: #f3f3f3;
      padding: 30px 0;
      margin-top: 60px;
    }

    .footer-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 45px;
    }

    .footer-contact {
      color: #737373;
      margin-bottom: 30px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .footer-links a {
      color: #737373;
      text-decoration: none;
      font-size: 13px;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    @media (max-width: 740px) {
      .signup-container {
        padding: 40px 20px;
      }

      .step-content h1 {
        font-size: 24px;
      }

      .step-description {
        font-size: 16px;
      }

      .plans-container {
        flex-direction: column;
      }

      .detail-row {
        flex-direction: column;
        gap: 10px;
      }

      .detail-values {
        justify-content: space-between;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class SignupComponent implements OnInit {
  currentStep: number = 1;
  email: string = '';
  password: string = '';
  receiveOffers: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  emailError: string = '';
  passwordError: string = '';
  selectedPlan: string = 'standard';

  plans = [
    {
      id: 'mobile',
      name: 'Mobile',
      quality: 'Good',
      price: '120',
      resolution: '480p',
      devices: 'Phone, tablet'
    },
    {
      id: 'basic',
      name: 'Basic',
      quality: 'Good',
      price: '165',
      resolution: '720p',
      devices: 'Phone, tablet, computer, TV'
    },
    {
      id: 'standard',
      name: 'Standard',
      quality: 'Better',
      price: '200',
      resolution: '1080p',
      devices: 'Phone, tablet, computer, TV'
    },
    {
      id: 'premium',
      name: 'Premium',
      quality: 'Best',
      price: '240',
      resolution: '4K+HDR',
      devices: 'Phone, tablet, computer, TV'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // Get email from query params if coming from landing page
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
        this.currentStep = 2; // Skip to password step if email provided
      }
    });
  }

  nextStep() {
    this.currentStep++;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.emailError = '';
    this.passwordError = '';

    if (!this.email || !this.email.includes('@')) {
      this.emailError = 'Please enter a valid email address.';
      return;
    }

    if (!this.password || this.password.length < 4) {
      this.passwordError = 'Your password must contain between 4 and 60 characters.';
      return;
    }

    this.isLoading = true;

    this.authService.signup(this.email, this.password, this.selectedPlan || 'Standard').subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.nextStep();
        } else {
          this.emailError = 'Something went wrong. Please try again.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.emailError = 'Signup failed. Please check your connection or try again later.';
      }
    });

  }

  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }

  completeSignup() {
    this.router.navigate(['/browse']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
