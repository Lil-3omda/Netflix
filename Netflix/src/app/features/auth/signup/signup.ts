import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  maxProfiles: number;
  features: string[];
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="signup-page">
      <div class="signup-background">
        <!-- <img src="assets/images/zjgs096khv591.jpg" alt="Background" class="bg-image"> -->
        <div class="bg-overlay"></div>
      </div>

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
            <button class="signin-link" (click)="goToLogin()">Sign In</button>
          </div>
        </div>
      </header>

      <div class="signup-container">
        <!-- Step 1: Email -->
        <div class="signup-form-wrapper" *ngIf="currentStep === 1">
          <form class="signup-form" (ngSubmit)="onEmailSubmit()">
            <h1>Create a password to start your membership</h1>
            <p class="step-description">Just a few more steps and you're done! We hate paperwork, too.</p>

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
                type="text"
                id="fullName"
                [(ngModel)]="fullName"
                name="fullName"
                required
                class="signup-input"
                [class.has-value]="fullName.length > 0"
                [class.error]="nameError">
              <label for="fullName" class="input-label">Full Name</label>
              <div class="error-message" *ngIf="nameError">{{ nameError }}</div>
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

            <button type="submit" class="continue-button" [disabled]="isLoading">
              <span *ngIf="!isLoading">Continue</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>
          </form>
        </div>

        <!-- Step 2: OTP Verification -->
        <div class="signup-form-wrapper" *ngIf="currentStep === 2">
          <form class="signup-form" (ngSubmit)="onOtpSubmit()">
            <h1>Verify your email</h1>
            <p class="step-description">We sent a verification code to {{ email }}. Enter it below to verify your account.</p>

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
                placeholder="Enter 6-digit code">
              <div class="error-message" *ngIf="otpError">{{ otpError }}</div>
            </div>

            <button type="submit" class="continue-button" [disabled]="isLoading || otpCode.length !== 6">
              <span *ngIf="!isLoading">Verify & Continue</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>

            <div class="resend-section">
              <p>Didn't receive the code?</p>
              <button type="button" class="resend-button" (click)="resendOtp()" [disabled]="isLoading">
                Resend Code
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Plan Selection -->
        <div class="signup-form-wrapper plan-selection" *ngIf="currentStep === 3">
          <div class="plan-header">
            <h1>Choose the plan that's right for you</h1>
            <div class="plan-benefits">
              <div class="benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Watch all you want. Ad-free.</span>
              </div>
              <div class="benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Recommendations just for you.</span>
              </div>
              <div class="benefit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Change or cancel your plan anytime.</span>
              </div>
            </div>
          </div>

          <div class="plans-container">
            <div class="plans-grid">
              <div
                class="plan-card"
                *ngFor="let plan of subscriptionPlans"
                [class.selected]="selectedPlan === plan.id"
                (click)="selectPlan(plan.id)">

                <div class="plan-header-card">
                  <h3>{{ plan.name }}</h3>
                  <div class="plan-price">EGP {{ plan.price }}<span>/month</span></div>
                </div>

                <div class="plan-features">
                  <div class="feature" *ngFor="let feature of plan.features">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="#46d369" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ feature }}</span>
                  </div>
                </div>

                <div class="plan-details">
                  <p><strong>{{ plan.maxProfiles }}</strong> profiles</p>
                  <p><strong>{{ getQualityText(plan.name) }}</strong> video quality</p>
                  <p><strong>{{ getResolutionText(plan.name) }}</strong></p>
                </div>
              </div>
            </div>

            <button
              class="continue-button"
              (click)="proceedToPayment()"
              [disabled]="!selectedPlan || isLoading">
              <span *ngIf="!isLoading">Continue</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>
          </div>
        </div>

        <!-- Step 4: Payment -->
        <div class="signup-form-wrapper payment-step" *ngIf="currentStep === 4">
          <div class="payment-container">
            <h1>Set up your payment</h1>
            <p class="step-description">Your membership starts immediately after payment.</p>

            <!-- Selected Plan Summary -->
            <div class="plan-summary" *ngIf="getSelectedPlanDetails()">
              <h3>{{ getSelectedPlanDetails()?.name }} Plan</h3>
              <div class="plan-price">EGP {{ getSelectedPlanDetails()?.price }}/month</div>
              <p>{{ getSelectedPlanDetails()?.maxProfiles }} profiles included</p>
            </div>

            <!-- Payment Method Selection -->
            <div class="payment-methods">
              <h3>Choose your payment method</h3>

              <div class="payment-method"
                   [class.selected]="paymentMethod === 'card'"
                   (click)="selectPaymentMethod('card')">
                <div class="method-header">
                  <div class="radio-button">
                    <div class="radio-inner" *ngIf="paymentMethod === 'card'"></div>
                  </div>
                  <span>Credit or Debit Card</span>
                  <div class="card-icons">
                    <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="Visa">
                    <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="Mastercard">
                  </div>
                </div>

                <!-- Card Details Form -->
                <div class="card-details" *ngIf="paymentMethod === 'card'">
                  <div class="input-group">
                    <input
                      type="text"
                      [(ngModel)]="cardNumber"
                      placeholder="Card number"
                      class="payment-input"
                      maxlength="19"
                      (input)="formatCardNumber($event)">
                  </div>

                  <div class="card-row">
                    <div class="input-group">
                      <input
                        type="text"
                        [(ngModel)]="expiryDate"
                        placeholder="MM/YY"
                        class="payment-input"
                        maxlength="5"
                        (input)="formatExpiryDate($event)">
                    </div>
                    <div class="input-group">
                      <input
                        type="text"
                        [(ngModel)]="cvv"
                        placeholder="CVV"
                        class="payment-input"
                        maxlength="4">
                    </div>
                  </div>

                  <div class="input-group">
                    <input
                      type="text"
                      [(ngModel)]="cardholderName"
                      placeholder="Cardholder name"
                      class="payment-input">
                  </div>
                </div>
              </div>

              <!-- <div class="payment-method"
                   [class.selected]="paymentMethod === 'cash'"
                   (click)="selectPaymentMethod('cash')">
                <div class="method-header">
                  <div class="radio-button">
                    <div class="radio-inner" *ngIf="paymentMethod === 'cash'"></div>
                  </div>
                  <span>Cash Payment</span>
                  <div class="cash-icon">💰</div>
                </div>

                <div class="cash-details" *ngIf="paymentMethod === 'cash'">
                  <p>Pay with cash at any Paymob partner location.</p>
                  <p class="cash-note">You'll receive a payment code after clicking "Start Membership".</p>
                </div>
              </div> -->
            </div>


            <button
              class="start-membership-button"
              (click)="processPayment()"
              [disabled]="!paymentMethod || isLoading || isProcessingPayment">
              <span *ngIf="!isLoading && !isProcessingPayment">Start Membership</span>
              <span *ngIf="isProcessingPayment">Processing Payment...</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>

            <div class="payment-security">
              <div class="security-text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#46d369"/>
                  <path d="M10 15L7 12L8.41 10.59L10 12.17L15.59 6.58L17 8L10 15Z" fill="white"/>
                </svg>
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Step -->
        <div class="signup-form-wrapper success-step" *ngIf="currentStep === 5">
          <div class="success-content">
            <div class="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#46d369"/>
                <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1>Welcome to Netflix!</h1>
            <p>Your account has been created successfully. You can now enjoy unlimited movies and TV shows!</p>

            <div class="success-details">
              <div class="detail-item">
                <strong>Plan:</strong> {{ getSelectedPlanDetails()?.name }}
              </div>
              <div class="detail-item">
                <strong>Price:</strong> EGP {{ getSelectedPlanDetails()?.price }}/month
              </div>
              <div class="detail-item">
                <strong>Profiles:</strong> Up to {{ getSelectedPlanDetails()?.maxProfiles }}
              </div>
            </div>

            <button class="start-watching-button" (click)="goToProfiles()">
              Start Watching
            </button>
          </div>
        </div>
      </div>

      <!-- Payment Processing Modal -->
      <div class="payment-modal" *ngIf="showPaymentModal">
        <div class="modal-content">
          <div class="payment-processing">
            <div class="processing-spinner"></div>
            <h3>Processing your payment...</h3>
            <p>Please wait while we set up your Netflix account.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      position: relative;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.75)
      ),
      url('/assets/images/zjgs096khv591.jpg');
      backgorund-size: cover;
      background-position: center;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .signup-background {
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

    .signup-header {
      position: relative;
      z-index: 10;
      padding: 20px 0;
      border-bottom: 1px solid #333;
    }

    .header-content {
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 3%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      height: 45px;
      width: auto;
      fill: #e50914;
    }

    .signin-link {
      background: none;
      border: none;
      color: white;
      font-size: 19px;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
    }

    .signin-link:hover {
      text-decoration: underline;
    }

    .signup-container {
      position: relative;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
      padding: 60px 20px;
    }

    .signup-form-wrapper {
      background: rgba(0,0,0,0.75);
      border-radius: 4px;
      padding: 60px 68px 40px;
      max-width: 450px;
      width: 100%;
    }

    .plan-selection {
      max-width: 950px;
      padding: 40px;
    }

    .payment-step {
      max-width: 500px;
    }

    .success-step {
      max-width: 600px;
      text-align: center;
    }

    .signup-form h1 {
      color: white;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .step-description {
      color: #8c8c8c;
      font-size: 18px;
      margin-bottom: 20px;
      line-height: 1.4;
    }

    .input-group {
      position: relative;
      margin-bottom: 16px;
    }

    .signup-input {
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

    .signup-input:focus {
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
      pointer-events: none;
      transition: all 0.2s;
    }

    .signup-input:focus + .input-label,
    .signup-input.has-value + .input-label {
      top: 12px;
      font-size: 11px;
      transform: none;
    }

    .otp-input {
      text-align: center;
      font-size: 24px;
      letter-spacing: 8px;
      padding: 16px 20px;
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

    .continue-button,
    .start-membership-button,
    .start-watching-button {
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

    .continue-button:hover:not(:disabled),
    .start-membership-button:hover:not(:disabled),
    .start-watching-button:hover:not(:disabled) {
      background: #f40612;
    }

    .continue-button:disabled,
    .start-membership-button:disabled {
      background: #8c8c8c;
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

    .resend-section {
      text-align: center;
      margin-top: 20px;
    }

    .resend-section p {
      color: #8c8c8c;
      margin-bottom: 10px;
    }

    .resend-button {
      background: none;
      border: none;
      color: #0071eb;
      cursor: pointer;
      text-decoration: underline;
    }

    /* Plan Selection Styles */
    .plan-header h1 {
      text-align: center;
      margin-bottom: 20px;
    }

    .plan-benefits {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 30px;
    }

    .benefit {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .plan-card {
      background: #222;
      border: 2px solid #333;
      border-radius: 8px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .plan-card:hover {
      border-color: #e50914;
    }

    .plan-card.selected {
      border-color: #e50914;
      background: rgba(229, 9, 20, 0.1);
    }

    .plan-header-card {
      text-align: center;
      margin-bottom: 20px;
    }

    .plan-header-card h3 {
      font-size: 24px;
      margin-bottom: 8px;
      color: #e50914;
    }

    .plan-price {
      font-size: 20px;
      font-weight: 600;
    }

    .plan-price span {
      font-size: 14px;
      color: #8c8c8c;
    }

    .plan-features {
      margin-bottom: 20px;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .plan-details p {
      margin: 4px 0;
      color: #8c8c8c;
      font-size: 14px;
    }

    /* Payment Styles */
    .plan-summary {
      background: rgba(229, 9, 20, 0.1);
      border: 1px solid rgba(229, 9, 20, 0.3);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
    }

    .plan-summary h3 {
      margin-bottom: 8px;
      color: #e50914;
    }

    .plan-summary .plan-price {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .payment-methods h3 {
      margin-bottom: 20px;
      font-size: 20px;
    }

    .payment-method {
      border: 1px solid #333;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.2s;
    }

    .payment-method:hover {
      border-color: #555;
    }

    .payment-method.selected {
      border-color: #e50914;
    }

    .method-header {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 12px;
    }

    .radio-button {
      width: 20px;
      height: 20px;
      border: 2px solid #8c8c8c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .payment-method.selected .radio-button {
      border-color: #e50914;
    }

    .radio-inner {
      width: 10px;
      height: 10px;
      background: #e50914;
      border-radius: 50%;
    }

    .card-icons {
      margin-left: auto;
      display: flex;
      gap: 8px;
    }

    .card-icons img {
      height: 24px;
    }

    .cash-icon {
      margin-left: auto;
      font-size: 24px;
    }

    .card-details,
    .cash-details {
      padding: 0 16px 16px;
      border-top: 1px solid #333;
      margin-top: 16px;
      padding-top: 16px;
    }

    .payment-input {
      width: 100%;
      padding: 12px 16px;
      background: #333;
      border: 1px solid #555;
      border-radius: 4px;
      color: white;
      font-size: 16px;
      margin-bottom: 12px;
    }

    .payment-input:focus {
      outline: none;
      border-color: #e50914;
    }

    .card-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .cash-details p {
      margin: 8px 0;
      color: #8c8c8c;
    }

    .cash-note {
      font-size: 14px;
      font-style: italic;
    }

    .developer-notice {
      background: rgba(255, 193, 7, 0.1);
      border: 1px solid rgba(255, 193, 7, 0.3);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .notice-content {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .notice-content strong {
      color: #ffc107;
    }

    .notice-content p {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #8c8c8c;
    }

    .payment-security {
      text-align: center;
      margin-top: 20px;
    }

    .security-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #8c8c8c;
      font-size: 14px;
    }

    /* Success Styles */
    .success-content {
      text-align: center;
    }

    .success-icon {
      margin-bottom: 24px;
    }

    .success-content h1 {
      color: #46d369;
      margin-bottom: 16px;
    }

    .success-content p {
      color: #8c8c8c;
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 1.4;
    }

    .success-details {
      background: #222;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: left;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 16px;
    }

    .detail-item:last-child {
      margin-bottom: 0;
    }

    /* Payment Modal */
    .payment-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: #141414;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }

    .payment-processing h3 {
      margin: 20px 0 10px 0;
      color: white;
    }

    .payment-processing p {
      color: #8c8c8c;
      margin-bottom: 10px;
    }

    .processing-note {
      color: #ffc107 !important;
      font-size: 14px !important;
    }

    .processing-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid #333;
      border-top: 4px solid #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .signup-form-wrapper {
        padding: 40px 20px;
      }

      .plans-grid {
        grid-template-columns: 1fr;
      }

      .card-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SignupComponent implements OnInit {
  currentStep: number = 1;

  // Form data
  email: string = '';
  fullName: string = '';
  password: string = '';
  otpCode: string = '';

  // Payment data
  selectedPlan: number | null = null;
  paymentMethod: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardholderName: string = '';

  // UI states
  showPassword: boolean = false;
  isLoading: boolean = false;
  isProcessingPayment: boolean = false;
  showPaymentModal: boolean = false;
  isDeveloperMode: boolean = false;

  // Error messages
  emailError: string = '';
  nameError: string = '';
  passwordError: string = '';
  otpError: string = '';

  // Data
  subscriptionPlans: SubscriptionPlan[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Check if developer mode is enabled
    this.isDeveloperMode = true; // You can make this configurable

    // Get email from query params if coming from landing page
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
      if (params['step']) {
        this.currentStep = parseInt(params['step']);
      }
    });

    this.loadSubscriptionPlans();
  }

  loadSubscriptionPlans() {
    this.http.get<SubscriptionPlan[]>(`${environment.apiUrl}/Subscription/plans`).subscribe({
      next: (plans) => {
        this.subscriptionPlans = plans.map(plan => ({
          ...plan,
          features: this.getPlanFeatures(plan.name)
        }));
      },
      error: (error) => {
        console.error('Error loading plans:', error);
        // Fallback plans
        this.subscriptionPlans = [
          {
            id: 1,
            name: 'Basic',
            price: 100,
            maxProfiles: 3,
            features: ['Good video quality', 'Watch on 1 device', 'Download on 1 device']
          },
          {
            id: 2,
            name: 'Standard',
            price: 170,
            maxProfiles: 5,
            features: ['Great video quality', 'Watch on 2 devices', 'Download on 2 devices']
          },
          {
            id: 3,
            name: 'Premium',
            price: 240,
            maxProfiles: 7,
            features: ['Best video quality', 'Watch on 4 devices', 'Download on 4 devices', '4K + HDR']
          }
        ];
      }
    });
  }

  getPlanFeatures(planName: string): string[] {
    switch (planName.toLowerCase()) {
      case 'basic':
        return ['Good video quality', 'Watch on 1 device', 'Download on 1 device'];
      case 'standard':
        return ['Great video quality', 'Watch on 2 devices', 'Download on 2 devices'];
      case 'premium':
        return ['Best video quality', 'Watch on 4 devices', 'Download on 4 devices', '4K + HDR'];
      default:
        return ['Unlimited streaming', 'Multiple devices', 'HD quality'];
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onEmailSubmit() {
    this.clearErrors();

    if (!this.validateStep1()) return;

    this.isLoading = true;

    // Register user
    this.authService.signup(this.fullName, this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.requiresVerification) {
          this.currentStep = 2;
        } else {
          this.emailError = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error?.message?.includes('already exists')) {
          this.emailError = 'An account with this email already exists. Please sign in instead.';
        } else {
          this.emailError = error.error?.message || 'Registration failed. Please try again.';
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
        if (response.token && response.user) {
          // Store user data
          localStorage.setItem('netflix_token', response.token);
          localStorage.setItem('netflix_user', JSON.stringify(response.user));

          this.currentStep = 3; // Go to plan selection
        } else {
          this.otpError = 'Verification failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.otpError = error.error?.message || 'Invalid verification code. Please try again.';
      }
    });
  }

  resendOtp() {
    this.isLoading = true;
    this.otpError = '';

    this.authService.resendOtp(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Show success message or update UI
        alert('Verification code sent successfully!');
      },
      error: (error) => {
        this.isLoading = false;
        this.otpError = 'Failed to resend code. Please try again.';
      }
    });
  }

  selectPlan(planId: number) {
    this.selectedPlan = planId;
  }

  proceedToPayment() {
    if (!this.selectedPlan) return;
    this.currentStep = 4;
  }

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardNumber = formattedValue;
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.expiryDate = value;
  }

  async processPayment() {
    if (!this.paymentMethod || !this.selectedPlan) return;

    this.isProcessingPayment = true;
    this.showPaymentModal = true;

    try {
      const selectedPlanDetails = this.getSelectedPlanDetails();
      if (!selectedPlanDetails) {
        throw new Error('Selected plan not found');
      }

      const user = JSON.parse(localStorage.getItem('netflix_user') || '{}');

      if (this.isDeveloperMode) {
        // Developer mode: Simulate payment
        await this.simulatePayment(selectedPlanDetails, user);
      } else {
        // Production mode: Real payment
        await this.processRealPayment(selectedPlanDetails, user);
      }
    } catch (error) {
      console.error('Payment error:', error);
      this.isProcessingPayment = false;
      this.showPaymentModal = false;
      alert('Payment failed. Please try again.');
    }
  }

  private async simulatePayment(plan: SubscriptionPlan, user: any) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      // Create subscription
      const subscriptionData = {
        userId: user.id,
        planId: plan.id
      };

      await this.http.post(`${environment.apiUrl}/Subscription/subscribe-and-bootstrap`, subscriptionData).toPromise();

      // Simulate payment success
      const paymentResponse = await this.http.post(`${environment.apiUrl}/Paymob/simulate-success`, {
        email: this.email,
        name: this.fullName,
        amountCents: plan.price * 100,
        userId: user.id,
        planId: plan.id
      }).toPromise();

      console.log('🔧 Developer mode payment simulation:', paymentResponse);

      this.isProcessingPayment = false;
      this.showPaymentModal = false;
      this.currentStep = 5; // Success step

    } catch (error) {
      console.error('Simulation error:', error);
      throw error;
    }
  }

  private async processRealPayment(plan: SubscriptionPlan, user: any) {
    const paymentRequest = {
      amountCents: plan.price * 100,
      email: this.email,
      name: this.fullName,
      phone: '+201000000000' // You might want to collect this in the form
    };

    const response = await this.http.post<any>(`${environment.apiUrl}/Paymob/initiate`, paymentRequest).toPromise();

    if (response.success) {
      // Redirect to Paymob payment page
      window.location.href = response.redirectUrl;
    } else {
      throw new Error('Payment initiation failed');
    }
  }

  getSelectedPlanDetails(): SubscriptionPlan | null {
    return this.subscriptionPlans.find(plan => plan.id === this.selectedPlan) || null;
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

  private validateStep1(): boolean {
    let isValid = true;

    if (!this.email || !this.email.includes('@')) {
      this.emailError = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!this.fullName || this.fullName.trim().length < 2) {
      this.nameError = 'Please enter your full name.';
      isValid = false;
    }

    if (!this.password || this.password.length < 4) {
      this.passwordError = 'Your password must contain between 4 and 60 characters.';
      isValid = false;
    }

    return isValid;
  }

  private clearErrors() {
    this.emailError = '';
    this.nameError = '';
    this.passwordError = '';
    this.otpError = '';
  }

  goToProfiles() {
    this.router.navigate(['/Profile']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
