import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { PopupService } from '../../../shared/services/popup.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-background">
        <!-- <img src="assets/images/zjgs096khv591.jpg" alt="Background" class="bg-image"> -->
        <div class="bg-overlay"></div>
      </div>

      <header class="login-header">
        <div class="header-content">
          <div class="netflix-logo" (click)="goHome()">
            <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </div>
        </div>
      </header>

      <div class="login-container">
        <div class="login-form-wrapper">
          <form class="login-form" (ngSubmit)="onSubmit()">
            <h1>Sign In</h1>

            <div class="input-group">
              <input
                type="email"
                id="email"
                [(ngModel)]="email"
                name="email"
                required
                class="login-input"
                [class.has-value]="email.length > 0"
                [class.error]="emailError">
              <label for="email" class="input-label">Email or phone number</label>
              <div class="error-message" *ngIf="emailError">{{ emailError }}</div>
            </div>

            <div class="input-group">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                [(ngModel)]="password"
                name="password"
                required
                class="login-input"
                [class.has-value]="password.length > 0"
                [class.error]="passwordError">
              <label for="password" class="input-label">Password</label>
              <button type="button" class="show-password" (click)="togglePassword()">
                {{ showPassword ? 'HIDE' : 'SHOW' }}
              </button>
              <div class="error-message" *ngIf="passwordError">{{ passwordError }}</div>
            </div>

            <button type="submit" class="sign-in-button" [disabled]="isLoading">
              <span *ngIf="!isLoading">Sign In</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>

            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" [(ngModel)]="rememberMe" name="remember">
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="need-help" (click)="showForgotPasswordForm()">Need help?</a>
            </div>

            <div class="form-footer">
              <div class="signup-link">
                New to Netflix? <a (click)="goToSignup()">Sign up now</a>.
              </div>
              <div class="recaptcha-text">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                <a href="#">Learn more</a>.
              </div>
            </div>
          </form>
        </div>
      </div>

      <footer class="login-footer">
        <div class="footer-content">
          <p class="footer-contact">Questions? Call 1-844-505-2993</p>
          <div class="footer-links">
            <a href="#">FAQ</a>
            <a href="#">Help Center</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie Preferences</a>
            <a href="#">Corporate Information</a>
          </div>
          <div class="language-selector">
            <select class="language-select">
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </footer>

      <!-- Forgot Password Modal -->
      <div class="modal-overlay" *ngIf="showForgotPassword" (click)="closeForgotPassword()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Reset Password</h2>
            <button class="close-btn" (click)="closeForgotPassword()">×</button>
          </div>

          <div class="modal-body" *ngIf="!showResetPassword">
            <p>Enter your email address and we'll send you a verification code to reset your password.</p>
            <form (ngSubmit)="onForgotPasswordSubmit()">
              <div class="input-group">
                <input
                  type="email"
                  [(ngModel)]="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  required
                  class="modal-input"
                  placeholder="Email address">
                <div class="error-message" *ngIf="forgotPasswordError">{{ forgotPasswordError }}</div>
              </div>
              <button type="submit" class="modal-button" [disabled]="isLoading">
                <span *ngIf="!isLoading">Send Code</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>
            </form>
          </div>

          <div class="modal-body" *ngIf="showResetPassword">
            <p>Enter the verification code sent to {{ forgotPasswordEmail }} and your new password.</p>
            <form (ngSubmit)="onResetPasswordSubmit()">
              <div class="input-group">
                <input
                  type="text"
                  [(ngModel)]="resetOtpCode"
                  name="resetOtpCode"
                  required
                  maxlength="6"
                  class="modal-input"
                  placeholder="Verification code">
                <div class="error-message" *ngIf="resetOtpError">{{ resetOtpError }}</div>
              </div>

              <div class="input-group">
                <input
                  type="password"
                  [(ngModel)]="newPassword"
                  name="newPassword"
                  required
                  class="modal-input"
                  placeholder="New password">
              </div>

              <div class="input-group">
                <input
                  type="password"
                  [(ngModel)]="confirmPassword"
                  name="confirmPassword"
                  required
                  class="modal-input"
                  placeholder="Confirm new password">
                <div class="error-message" *ngIf="resetPasswordError">{{ resetPasswordError }}</div>
              </div>

              <button type="submit" class="modal-button" [disabled]="isLoading">
                <span *ngIf="!isLoading">Reset Password</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>

              <button type="button" class="modal-button-secondary" (click)="backToEmailStep()">
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      position: relative;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.75)
      ),
      url('/assets/images/zjgs096khv591.jpg');
      background-size: cover;
      background-position: center;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .login-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.10);
    }

    .login-header {
      position: relative;
      z-index: 10;
      padding: 20px 0;
    }

    .header-content {
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

    .login-container {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 200px);
      padding: 60px 20px;
    }

    .login-form-wrapper {
      background: rgba(0,0,0,0.75);
      border-radius: 4px;
      padding: 60px 68px 40px;
      max-width: 450px;
      width: 100%;
    }

    .login-form h1 {
      color: white;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 28px;
    }

    .input-group {
      position: relative;
      margin-bottom: 16px;
    }

    .login-input {
      width: 100%;
      height: 50px;
      padding: 16px 20px 0;
      background: #333;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      outline: none;
      transition: background 0.2s;
    }

    .login-input:focus {
      background: #454545;
    }

    .login-input.error {
      border-bottom: 2px solid #e87c03;
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

    .login-input:focus + .input-label,
    .login-input.has-value + .input-label {
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
      color: white;
    }

    .error-message {
      color: #e87c03;
      font-size: 13px;
      margin-top: 6px;
    }

    .sign-in-button {
      width: 100%;
      height: 48px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      margin: 24px 0 12px;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sign-in-button:hover:not(:disabled) {
      background: #f40612;
    }

    .sign-in-button:disabled {
      background: #8c8c8c;
      cursor: not-allowed;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .remember-me input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }

    .remember-me label {
      color: #b3b3b3;
      font-size: 13px;
    }

    .need-help {
      color: #b3b3b3;
      text-decoration: none;
      font-size: 13px;
    }

    .need-help:hover {
      text-decoration: underline;
    }

    .form-footer {
      margin-top: 80px;
    }

    .signup-link {
      color: #737373;
      font-size: 16px;
      margin-bottom: 30px;
    }

    .signup-link a {
      color: white;
      text-decoration: none;
      cursor: pointer;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }

    .recaptcha-text {
      color: #8c8c8c;
      font-size: 13px;
      line-height: 1.4;
    }

    .recaptcha-text a {
      color: #0071eb;
      text-decoration: none;
    }

    .recaptcha-text a:hover {
      text-decoration: underline;
    }

    .login-footer {
      position: relative;
      z-index: 10;
      background: rgba(0,0,0,0.75);
      padding: 30px 0;
      margin-top: 90px;
    }

    .footer-content {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 45px;
    }

    .footer-contact {
      color: #999;
      margin-bottom: 30px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    .footer-links a {
      color: #999;
      text-decoration: none;
      font-size: 13px;
    }

    .footer-links a:hover {
      text-decoration: underline;
    }

    .language-select {
      background: transparent;
      border: 1px solid #aaa;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
    }

    /* Modal Styles */
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
      max-width: 450px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #333;
    }

    .modal-header h2 {
      color: white;
      margin: 0;
      font-size: 24px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #999;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: white;
    }

    .modal-body {
      padding: 20px;
    }

    .modal-body p {
      color: #b3b3b3;
      margin-bottom: 20px;
      line-height: 1.4;
    }

    .modal-input {
      width: 100%;
      height: 50px;
      padding: 16px 20px;
      background: #333;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      outline: none;
      margin-bottom: 16px;
    }

    .modal-input::placeholder {
      color: #8c8c8c;
    }

    .modal-input:focus {
      background: #454545;
    }

    .modal-button {
      width: 100%;
      height: 48px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-button:hover:not(:disabled) {
      background: #f40612;
    }

    .modal-button:disabled {
      background: #8c8c8c;
      cursor: not-allowed;
    }

    .modal-button-secondary {
      width: 100%;
      height: 48px;
      background: transparent;
      color: #b3b3b3;
      border: 1px solid #333;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }

    .modal-button-secondary:hover {
      background: #333;
      color: white;
    }

    @media (max-width: 740px) {
      .login-form-wrapper {
        background: transparent;
        padding: 20px;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }

      .modal-content {
        width: 95%;
        margin: 10px;
      }
    }
  `]
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  emailError: string = '';
  passwordError: string = '';
  showForgotPassword: boolean = false;
  showResetPassword: boolean = false;
  forgotPasswordEmail: string = '';
  resetOtpCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  resetToken: string = '';
  forgotPasswordError: string = '';
  resetOtpError: string = '';
  resetPasswordError: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private popupService: PopupService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Get email from query params if coming from landing page
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.emailError = '';
    this.passwordError = '';

    if (!this.email) {
      this.emailError = 'Please enter a valid email or phone number.';
      return;
    }

    if (!this.password) {
      this.passwordError = 'Your password must contain between 4 and 60 characters.';
      return;
    }

    this.isLoading = true;

    // Use auth service for login
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token && response.user) {
          // Check if user is admin
          if (response.user.isAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            // Check subscription status first
            this.checkSubscriptionStatus(response.user.id);
          }
        } else {
          this.emailError = 'Sorry, we can\'t find an account with this email address. Please try again or create a new account.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error?.requiresVerification) {
          this.emailError = 'Please verify your email before logging in. Check your email for the verification code and complete the signup process.';
        } else if (err.error?.message) {
          this.emailError = err.error.message;
        } else if (err.status === 401) {
          this.emailError = 'Sorry, we can\'t find an account with this email address. Please try again or create a new account.';
        } else {
          this.emailError = 'An error occurred. Please try again later.';
        }
        console.error(err);
      }
    });
  }

  private checkSubscriptionStatus(userId: string) {
    // Check subscription status
    this.http.get<any>(`${environment.apiUrl}/Subscription/user-subscription/${userId}`).subscribe({
      next: (subscriptionResponse) => {
        if (subscriptionResponse && subscriptionResponse.planName) {
          // User has active subscription, proceed normally
          const profileId = localStorage.getItem('profileId');
          if (profileId) {
            this.router.navigate(['/Home']);
          } else {
            this.router.navigate(['/Profile']);
          }
        } else {
          // No active subscription, redirect to step 4
          this.router.navigate(['/signup'], {
            queryParams: {
              step: 4,
              message: 'Your subscription has expired. Please choose a new plan to continue.',
              expired: true
            }
          });
        }
      },
      error: (err) => {
        console.error('Error checking subscription status:', err);
        // On error, redirect to step 4 as a precaution
        this.router.navigate(['/signup'], {
          queryParams: {
            step: 4,
            message: 'Please choose a plan to continue.',
            expired: true
          }
        });
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  showForgotPasswordForm() {
    this.showForgotPassword = true;
    this.forgotPasswordEmail = this.email; // Pre-fill with login email if available
  }

  closeForgotPassword() {
    this.showForgotPassword = false;
    this.showResetPassword = false;
    this.forgotPasswordEmail = '';
    this.resetOtpCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.resetToken = '';
    this.forgotPasswordError = '';
    this.resetOtpError = '';
    this.resetPasswordError = '';
  }

  onForgotPasswordSubmit() {
    this.forgotPasswordError = '';

    if (!this.forgotPasswordEmail) {
      this.forgotPasswordError = 'Please enter your email address.';
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showResetPassword = true;
      },
      error: (error) => {
        this.isLoading = false;
        this.forgotPasswordError = error.error?.message || 'Failed to send reset code. Please try again.';
      }
    });
  }

  onResetPasswordSubmit() {
    this.resetPasswordError = '';
    this.resetOtpError = '';

    if (!this.resetOtpCode || this.resetOtpCode.length !== 6) {
      this.resetOtpError = 'Please enter a valid 6-digit verification code.';
      return;
    }

    if (!this.newPassword || this.newPassword.length < 4) {
      this.resetPasswordError = 'Password must be at least 4 characters long.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.resetPasswordError = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    // First verify the OTP
    this.authService.verifyResetOtp(this.forgotPasswordEmail, this.resetOtpCode).subscribe({
      next: (response) => {
        this.resetToken = response.resetToken;

        // Then reset the password
        this.authService.resetPassword(this.forgotPasswordEmail, this.resetToken, this.newPassword).subscribe({
          next: (resetResponse) => {
            this.isLoading = false;
            this.closeForgotPassword();
            this.popupService.showSuccess('Password reset successfully! You can now login with your new password.', 'Password Reset Complete');
          },
          error: (error) => {
            this.isLoading = false;
            this.resetPasswordError = error.error?.message || 'Failed to reset password. Please try again.';
          }
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.resetOtpError = error.error?.message || 'Invalid or expired verification code.';
      }
    });
  }

  backToEmailStep() {
    this.showResetPassword = false;
    this.resetOtpCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.resetOtpError = '';
    this.resetPasswordError = '';
  }
}
