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
            <span class="step-text">STEP <strong>{{ currentStep }}</strong> OF <strong>4</strong></span>
          </div>

          <!-- Step 1: Registration Info -->
          <div class="step-content" *ngIf="currentStep === 1">
            <h1>Create your account</h1>
            <p class="step-description">
              Just a few more steps and you're done!<br>
              We hate paperwork, too.
            </p>

            <form class="signup-form" (ngSubmit)="onRegisterSubmit()">
              <div class="input-group">
                <input
                  type="text"
                  id="fullName"
                  [(ngModel)]="fullName"
                  name="fullName"
                  required
                  class="signup-input"
                  [class.has-value]="fullName.length > 0"
                  [class.error]="fullNameError">
                <label for="fullName" class="input-label">Full Name</label>
                <div class="error-message" *ngIf="fullNameError">{{ fullNameError }}</div>
              </div>

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
                <span *ngIf="!isLoading">Create Account</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>
            </form>
          </div>

          <!-- Step 2: OTP Verification -->
          <div class="step-content" *ngIf="currentStep === 2">
            <h1>Verify your email</h1>
            <p class="step-description">
              We've sent a verification code to <strong>{{ email }}</strong><br>
              Please enter the 6-digit code below to continue.
            </p>

            <form class="signup-form" (ngSubmit)="onOtpSubmit()">
              <div class="input-group">
                <input
                  type="text"
                  id="otpCode"
                  [(ngModel)]="otpCode"
                  name="otpCode"
                  required
                  maxlength="6"
                  class="signup-input otp-input"
                  [class.has-value]="otpCode.length > 0"
                  [class.error]="otpError"
                  placeholder="000000">
                <label for="otpCode" class="input-label">Verification Code</label>
                <div class="error-message" *ngIf="otpError">{{ otpError }}</div>
              </div>

              <div class="resend-section">
                <span>Didn't receive the code? </span>
                <button type="button" class="resend-btn" (click)="resendOtp()" [disabled]="resendCooldown > 0">
                  <span *ngIf="resendCooldown === 0">Resend Code</span>
                  <span *ngIf="resendCooldown > 0">Resend in {{ resendCooldown }}s</span>
                </button>
              </div>

              <button type="submit" class="next-button" [disabled]="isLoading || otpCode.length !== 6">
                <span *ngIf="!isLoading">Verify Email</span>
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
                <div class="plan-resolution">{{ plan.resolution }}</div>
                <div class="plan-devices">{{ plan.devices }}</div>
              </div>
            </div>

            <button class="next-button" (click)="nextStep()" [disabled]="!selectedPlan">Next</button>
          </div>

          <!-- Step 4: Success -->
          <div class="step-content" *ngIf="currentStep === 4">
            <div class="success-content">
              <div class="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#00C851"/>
                  <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1>Welcome to Netflix!</h1>
              <p class="success-description">
                Your account has been created successfully.<br>
                You're all set to start watching!
              </p>
              <button class="complete-button" (click)="completeSignup()">
                Start Watching
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.75)
      ),
      url('/assets/images/zjgs096khv591.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }

    .signup-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      width: 167px;
      height: 45px;
      fill: #e50914;
    }

    .sign-in-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 7px 17px;
      border-radius: 3px;
      font-weight: 400;
      font-size: 16px;
      cursor: pointer;
      text-decoration: none;
      transition: background-color 0.2s;
    }

    .sign-in-btn:hover {
      background: #f40612;
    }

    .signup-container {
      max-width: 450px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .signup-content {
      background: rgba(0, 0, 0, 0.10);
      padding: 60px;
      border-radius: 4px;
      backdrop-filter: blur(10px);
    }

    .signup-logo {
      display: block;
      margin: 0 auto 40px auto;
    }

    .step-indicator {
      text-align: center;
      margin-bottom: 20px;
    }

    .step-text {
      font-size: 13px;
      text-transform: uppercase;
      color: #737373;
      letter-spacing: 1px;
    }

    .step-content h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      text-align: center;
    }

    .step-description {
      font-size: 18px;
      color: #737373;
      text-align: center;
      margin-bottom: 30px;
      line-height: 1.4;
    }

    .signup-form {
      width: 100%;
    }

    .input-group {
      position: relative;
      margin-bottom: 20px;
    }

    .signup-input {
      width: 100%;
      height: 50px;
      background: #333;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      padding: 16px 20px 0;
      box-sizing: border-box;
      transition: background-color 0.15s ease;
    }

    .signup-input:focus {
      outline: none;
      background: #454545;
    }

    .signup-input.error {
      border-bottom: 2px solid #e87c03;
    }

    .input-label {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #8c8c8c;
      font-size: 16px;
      transition: all 0.15s ease;
      pointer-events: none;
    }

    .signup-input:focus + .input-label,
    .signup-input.has-value + .input-label {
      top: 10px;
      font-size: 11px;
      transform: translateY(0);
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
    }

    .show-password:hover {
      color: white;
    }

    .otp-input {
      text-align: center;
      font-size: 24px;
      letter-spacing: 8px;
      font-weight: bold;
    }

    .resend-section {
      text-align: center;
      margin: 20px 0;
      font-size: 14px;
      color: #737373;
    }

    .resend-btn {
      background: none;
      border: none;
      color: #e50914;
      cursor: pointer;
      text-decoration: underline;
      font-size: 14px;
    }

    .resend-btn:disabled {
      color: #737373;
      cursor: not-allowed;
      text-decoration: none;
    }

    .resend-btn:hover:not(:disabled) {
      color: #f40612;
    }

    .error-message {
      color: #e87c03;
      font-size: 13px;
      margin-top: 6px;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
    }

    .checkbox-group input[type="checkbox"] {
      margin-right: 10px;
      margin-top: 2px;
    }

    .checkbox-group label {
      font-size: 13px;
      color: #b3b3b3;
      line-height: 1.4;
    }

    .next-button, .complete-button {
      width: 100%;
      height: 48px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .next-button:hover:not(:disabled), .complete-button:hover {
      background: #f40612;
    }

    .next-button:disabled {
      background: #454545;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff30;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .plan-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .checkmark-icon {
      margin-bottom: 20px;
    }

    .plan-benefits {
      margin-top: 20px;
    }

    .benefit-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .benefit-item svg {
      margin-right: 10px;
    }

    .plans-container {
      display: grid;
      gap: 15px;
      margin-bottom: 30px;
    }

    .plan-card {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .plan-card:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .plan-card.selected {
      border-color: #e50914;
      background: rgba(229, 9, 20, 0.1);
    }

    .plan-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .plan-quality {
      color: #00C851;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .plan-price {
      font-size: 16px;
      font-weight: bold;
      color: #e50914;
      margin-bottom: 5px;
    }

    .plan-resolution, .plan-devices {
      font-size: 13px;
      color: #b3b3b3;
      margin-bottom: 3px;
    }

    .success-content {
      text-align: center;
    }

    .success-icon {
      margin-bottom: 30px;
    }

    .success-description {
      font-size: 18px;
      color: #b3b3b3;
      margin-bottom: 40px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .signup-content {
        padding: 40px 30px;
      }

      .logo-svg {
        width: 120px;
        height: 32px;
      }

      .header-content {
        padding: 0 20px;
      }
    }
  `]
})
export class SignupComponent implements OnInit {
  currentStep: number = 1;
  fullName: string = '';
  email: string = '';
  password: string = '';
  otpCode: string = '';
  receiveOffers: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;

  // Error messages
  fullNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  otpError: string = '';

  selectedPlan: string = 'standard';
  resendCooldown: number = 0;
  private resendTimer?: any;

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
      }
    });
  }

  ngOnDestroy() {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
    }
  }

  nextStep() {
    this.currentStep++;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegisterSubmit() {
    this.clearErrors();

    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    this.authService.signup(this.fullName, this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.requiresVerification) {
          this.nextStep(); // Go to OTP verification step
        } else {
          this.emailError = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error?.message) {
          this.emailError = error.error.message;
        } else {
          this.emailError = 'Registration failed. Please try again.';
        }
      }
    });
  }

  onOtpSubmit() {
    this.otpError = '';

    if (!this.otpCode || this.otpCode.length !== 6) {
      this.otpError = 'Please enter a valid 6-digit verification code.';
      return;
    }

    this.isLoading = true;

    this.authService.verifyOtp(this.email, this.otpCode).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          this.nextStep(); // Go to plan selection
        } else {
          this.otpError = 'Verification failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error?.message) {
          this.otpError = error.error.message;
        } else {
          this.otpError = 'Verification failed. Please try again.';
        }
      }
    });
  }

  resendOtp() {
    if (this.resendCooldown > 0) return;

    this.authService.resendOtp(this.email).subscribe({
      next: (response) => {
        this.startResendCooldown();
        // Clear any existing OTP error
        this.otpError = '';
      },
      error: (error) => {
        this.otpError = 'Failed to resend code. Please try again.';
      }
    });
  }

  private startResendCooldown() {
    this.resendCooldown = 30;
    this.resendTimer = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(this.resendTimer);
      }
    }, 1000);
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.fullName || this.fullName.trim().length < 2) {
      this.fullNameError = 'Please enter your full name.';
      isValid = false;
    }

    if (!this.email || !this.email.includes('@')) {
      this.emailError = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!this.password || this.password.length < 4) {
      this.passwordError = 'Your password must contain between 4 and 60 characters.';
      isValid = false;
    }

    return isValid;
  }

  private clearErrors() {
    this.fullNameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.otpError = '';
  }

  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }

  completeSignup() {
    this.router.navigate(['/Home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
