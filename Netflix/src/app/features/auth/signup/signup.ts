import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import{HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="signup-page" [class.white-bg]="currentStep >= 3">
      <!-- Steps 1-2: Dark theme header -->
      <header class="signup-header" *ngIf="currentStep < 3">
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

      <!-- Steps 3+: White theme header -->
      <header class="white-header" *ngIf="currentStep >= 3">
        <div class="header-content">
          <div class="netflix-logo" (click)="goHome()">
            <svg viewBox="0 0 111 30" class="logo-svg-red" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </div>
          <div class="header-actions">
            <button class="sign-out-btn" (click)="goToLogin()">Sign Out</button>
          </div>
        </div>
      </header>

      <div class="signup-container" [class.dark-theme]="currentStep < 3" [class.white-theme]="currentStep >= 3">
        <div class="signup-content" [class.dark-content]="currentStep < 3" [class.white-content]="currentStep >= 3">
          <!-- Logo for steps 1-2 -->
          <div class="signup-content-header" *ngIf="currentStep < 3">
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

          <!-- Step 3: Choose Plan (Netflix Style) -->
        <div class="plan-step" *ngIf="currentStep === 3">
          <div class="plan-step-header">
            <div class="step-indicator-white">
              <span class="step-text-black">Step <strong>2</strong> of <strong>3</strong></span>
            </div>
            <h1 class="plan-title">Choose the plan that's right for you</h1>
          </div>

          <div class="netflix-plans-container">
            <div class="plans-grid">
              <div class="netflix-plan-card" [class.selected]="selectedPlan === 'basic'" (click)="selectPlan('basic')">
                <h3>Basic</h3>
                <div>720p</div>
              </div>

              <div class="netflix-plan-card" [class.selected]="selectedPlan === 'standard'" (click)="selectPlan('standard')">
                <h3>Standard</h3>
                <div>1080p</div>
              </div>

              <div class="netflix-plan-card" [class.selected]="selectedPlan === 'premium'" (click)="selectPlan('premium')">
                <div class="most-popular">Most Popular</div>
                <h3>Premium</h3>
                <div>4K + HDR</div>
              </div>
            </div>

            <div class="plan-comparison">
              <div class="detail-row">
                <div class="detail-label">Monthly price</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'basic'">EGP 100</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'standard'">EGP 170</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'premium'">EGP 240</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Video and sound quality</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'basic'">Good</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'standard'">Great</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'premium'">Best</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Resolution</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'basic'">720p (HD)</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'standard'">1080p (Full HD)</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'premium'">4K + HDR</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Spatial audio</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'basic'">Not included</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'standard'">Not included</div>
                <div class="detail-value" [class.highlighted]="selectedPlan === 'premium'">Included</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Devices you can watch on</div>
                <div class="detail-value">TV, mobile, tablet</div>
                <div class="detail-value">TV, mobile, tablet</div>
                <div class="detail-value">TV, mobile, tablet</div>
              </div>
            </div>

            <div class="plan-footer-info">
              <p class="footer-text">HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities.</p>
              <p class="footer-text">Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.</p>
            </div>

            <button class="netflix-next-button" (click)="nextStep()" [disabled]="!selectedPlan">Next</button>
          </div>
        </div>


          <!-- Step 4: Payment Method Selection -->
          <div class="payment-step" *ngIf="currentStep === 4">
            <div class="payment-header">
              <div class="shield-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#e50914"/>
                  <path d="M10 15L7 12L8.41 10.59L10 12.17L15.59 6.58L17 8L10 15Z" fill="white"/>
                </svg>
              </div>
              <div class="step-indicator-white">
                <span class="step-text-black">Step <strong>3</strong> of <strong>3</strong></span>
              </div>
              <h1 class="payment-title">Choose how to pay</h1>
              <p class="payment-subtitle">Your payment is encrypted and you can change how you pay anytime.</p>
              <div class="security-text">
                <p><strong>Secure for peace of mind.</strong></p>
                <p><strong>Cancel easily online.</strong></p>
              </div>
            </div>

            <div class="payment-methods">
              <div class="payment-method" (click)="selectPaymentMethod('card')">
                <div class="payment-method-content">
                  <span class="payment-text">Credit or Debit Card</span>
                  <div class="payment-icons">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/ach/visa.png" alt="Visa" class="payment-icon">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/ach/mastercard.png" alt="Mastercard" class="payment-icon">
                  </div>
                </div>
                <div class="encrypted-badge">
                  <span>End-to-end encrypted</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8H20C21.1 8 22 8.9 22 10V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V10C2 8.9 2.9 8 4 8H6V6C6 3.8 7.8 2 10 2H14C16.2 2 18 3.8 18 6V8ZM16 8V6C16 4.9 15.1 4 14 4H10C8.9 4 8 4.9 8 6V8H16Z" fill="#999"/>
                  </svg>
                </div>
                <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>

              <!-- <div class="payment-method" (click)="selectPaymentMethod('cash')">
                <div class="payment-method-content">
                  <span class="payment-text">Pay Cash</span>
                  <div class="payment-icons">
                    <div class="cash-icon">💳</div>
                  </div>
                </div>
                <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div> -->
            </div>
          </div>

          <!-- Step 5: Credit Card Details -->
          <div class="card-step" *ngIf="currentStep === 5">
            <div class="card-header">
              <div class="back-link" (click)="previousStep()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="#0073e6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Change payment method</span>
              </div>
              <div class="step-indicator-white">
                <span class="step-text-black">Step <strong>3</strong> of <strong>3</strong></span>
              </div>
              <h1 class="card-title">Set up your credit or debit card</h1>
              <div class="card-icons">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/ach/visa.png" alt="Visa" class="payment-icon">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/ach/mastercard.png" alt="Mastercard" class="payment-icon">
              </div>
            </div>

            <form class="card-form" (ngSubmit)="completeSignup()">
              <div class="card-input-group">
                <input
                  type="text"
                  id="cardNumber"
                  [(ngModel)]="cardNumber"
                  name="cardNumber"
                  required
                  class="card-input"
                  placeholder="Card number"
                  maxlength="19">
                <div class="card-type-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" fill="#ccc"/>
                  </svg>
                </div>
              </div>

              <div class="card-row">
                <div class="card-input-group half">
                  <input
                    type="text"
                    id="expiryDate"
                    [(ngModel)]="expiryDate"
                    name="expiryDate"
                    required
                    class="card-input"
                    placeholder="Expiration date"
                    maxlength="5">
                </div>
                <div class="card-input-group half">
                  <input
                    type="text"
                    id="cvv"
                    [(ngModel)]="cvv"
                    name="cvv"
                    required
                    class="card-input"
                    placeholder="CVV"
                    maxlength="4">
                  <div class="cvv-help">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#999" stroke-width="2"/>
                      <path d="M9.09 9A3 3 0 0 1 12 7.5A3 3 0 0 1 15 9" stroke="#999" stroke-width="2" stroke-linecap="round"/>
                      <path d="M12 17V13" stroke="#999" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="card-input-group">
                <input
                  type="text"
                  id="nameOnCard"
                  [(ngModel)]="nameOnCard"
                  name="nameOnCard"
                  required
                  class="card-input"
                  placeholder="Name on card">
              </div>

              <div class="plan-summary">
                <div class="plan-price">EGP {{ getSelectedPlanPrice() }}/month</div>
                <div class="plan-name">{{ getSelectedPlanName() }}</div>
                <button type="button" class="change-plan" (click)="goToPlanSelection()">Change</button>
              </div>

              <div class="billing-info">
                <p>Your payments will be processed internationally. Additional bank fees may apply.</p>
                <p class="terms-text">By checking the checkbox below, you agree to our <a href="#" class="link">Terms of Use</a>, <a href="#" class="link">Privacy Statement</a>, and that you are over 18. Netflix will automatically continue your membership and charge the membership fee (currently EGP {{ getSelectedPlanPrice() }}/month) to your payment method until you cancel. You may cancel at any time to avoid future charges.</p>
              </div>

              <div class="agreement">
                <input type="checkbox" id="agreement" [(ngModel)]="agreementChecked" name="agreement" required>
                <label for="agreement">I agree.</label>
              </div>

              <button
                type="submit"
                class="start-membership-button"
                [disabled]="isLoading || !agreementChecked">
                <span *ngIf="!isLoading">Start Membership</span>
                <div *ngIf="isLoading" class="loading-spinner"></div>
              </button>

              <div class="recaptcha-text">
                <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" class="link">Learn more.</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Footer for white pages -->
      <footer class="white-footer" *ngIf="currentStep >= 3">
        <div class="footer-content">
          <div class="footer-question">Questions? Contact us.</div>
          <div class="footer-links">
            <div class="footer-column">
              <a href="#" class="footer-link">FAQ</a>
              <a href="#" class="footer-link">Cookie Preferences</a>
            </div>
            <div class="footer-column">
              <a href="#" class="footer-link">Help Center</a>
              <a href="#" class="footer-link">Corporate Information</a>
            </div>
            <div class="footer-column">
              <a href="#" class="footer-link">Terms of Use</a>
            </div>
            <div class="footer-column">
              <a href="#" class="footer-link">Privacy</a>
            </div>
          </div>
          <div class="language-selector">
            <select class="language-select">
              <option value="en">🌐 English</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      transition: all 0.3s ease;
    }

    .signup-page.white-bg {
      background: #f3f3f3;
      color: #333;
    }

    .signup-page:not(.white-bg) {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0.75)
      ),
      url('/assets/images/zjgs096khv591.jpg');
      background-size: cover;
      background-position: center;
      color: white;
    }

    /* Dark theme header (steps 1-2) */
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

    /* White theme header (steps 3+) */
    .white-header {
      background: white;
      border-bottom: 1px solid #e6e6e6;
      padding: 20px;
    }

    .logo-svg-red {
      width: 167px;
      height: 45px;
      fill: #e50914;
    }

    .sign-out-btn {
      background: none;
      color: #333;
      border: none;
      font-size: 19px;
      cursor: pointer;
      font-weight: 600;
    }

    .sign-out-btn:hover {
      text-decoration: underline;
    }

    /* Container styles */
    .signup-container.dark-theme {
      max-width: 450px;
      margin: 0 auto;
      padding: 60px 20px;
    }

    .signup-container.white-theme {
      max-width: 978px;
      margin: 0 auto;
      padding: 20px;
    }

    .signup-content.dark-content {
      background: rgba(0, 0, 0, 0.10);
      padding: 60px;
      border-radius: 4px;
      backdrop-filter: blur(10px);
    }

    .signup-content.white-content {
      background: transparent;
      padding: 20px;
    }

    /* Step indicators */
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

    .step-indicator-white {
      text-align: center;
      margin-bottom: 10px;
    }

    .step-text-black {
      font-size: 13px;
      text-transform: uppercase;
      color: #737373;
      letter-spacing: 1px;
    }

    /* Existing dark theme styles for steps 1-2 */
    .signup-logo {
      display: block;
      margin: 0 auto 40px auto;
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

    .next-button {
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

    .next-button:hover:not(:disabled) {
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

    /* Netflix Plan Selection Styles (Step 3) */
    .plan-step {
  max-width: 978px;
  margin: 0 auto;
  text-align: center;
}

.plan-step-header {
  margin-bottom: 30px;
}

.step-text-black {
  font-size: 13px;
  color: #737373;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.plan-title {
  font-size: 32px;
  font-weight: 600;
  color: #e50914;
  margin-top: 10px;
}

.netflix-plans-container {
  background: white;
  padding: 0 16px;
}

.plans-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  justify-content: space-between;
}

.netflix-plan-card {
  flex: 1;
  border: 2px solid #e6e6e6;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
  background-color: #fff;
  transition: 0.3s ease;
  position: relative;
}

.netflix-plan-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.netflix-plan-card div {
  font-size: 16px;
  color: #737373;
}

.netflix-plan-card:hover {
  border-color: #e50914;
  box-shadow: 0 0 0 2px #e50914;
  cursor: pointer;
}

.netflix-plan-card.selected {
  border-color: #e50914;
  box-shadow: 0 0 0 3px #e50914;
}

.most-popular {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e50914;
  color: white;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}

.plan-comparison {
  margin-top: 20px;
  width: 100%;
}

.detail-row {
  display: grid;
  grid-template-columns: 1fr repeat(3, 1fr);
  border-bottom: 1px solid #e6e6e6;
  min-height: 56px;
  align-items: center;
}

.detail-label {
  background: #f8f8f8;
  padding: 12px;
  font-weight: 500;
  color: #333;
  text-align: left;
}

.detail-value {
  padding: 12px;
  text-align: center;
  color: #737373;
  border-left: 1px solid #e6e6e6;
}

.detail-value.highlighted {
  color: #e50914;
  font-weight: 600;
  background-color: #fff4f4;
}

.plan-footer-info {
  text-align: left;
  margin: 30px 0;
}

.footer-text {
  font-size: 13px;
  color: #737373;
  margin-bottom: 10px;
  line-height: 1.4;
}

.netflix-next-button {
  background-color: #e50914;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 440px;
  margin: 0 auto 40px auto;
  display: block;
  transition: background-color 0.2s;
}

.netflix-next-button:hover:not(:disabled) {
  background-color: #f40612;
}

.netflix-next-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

    /* Payment Method Selection Styles (Step 4) */
    .payment-step {
      text-align: center;
      max-width: 440px;
      margin: 0 auto;
    }

    .payment-header {
      margin-bottom: 40px;
    }

    .shield-icon {
      margin-bottom: 20px;
    }

    .payment-title {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin: 10px 0;
    }

    .payment-subtitle {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
    }

    .security-text {
      font-size: 18px;
      color: #333;
    }

    .security-text p {
      margin: 5px 0;
    }

    .payment-methods {
      margin-bottom: 40px;
    }

    .payment-method {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      border: 1px solid #e6e6e6;
      padding: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .payment-method:hover {
      border-color: #0073e6;
    }

    .payment-method-content {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .payment-text {
      font-size: 18px;
      color: #333;
      margin-right: 15px;
    }

    .payment-icons {
      display: flex;
      gap: 8px;
    }

    .payment-icon {
      height: 24px;
      width: auto;
    }

    .cash-icon {
      font-size: 20px;
    }

    .encrypted-badge {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #737373;
      position: absolute;
      right: 50px;
    }

    .arrow-icon {
      color: #999;
    }

    /* Credit Card Form Styles (Step 5) */
    .card-step {
      max-width: 440px;
      margin: 0 auto;
    }

    .card-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .back-link {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #0073e6;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 20px;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .card-title {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin: 10px 0 20px 0;
    }

    .card-icons {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 30px;
    }

    .card-form {
      text-align: left;
    }

    .card-input-group {
      position: relative;
      margin-bottom: 15px;
    }

    .card-input-group.half {
      display: inline-block;
      width: calc(50% - 8px);
    }

    .card-input-group.half:first-child {
      margin-right: 16px;
    }

    .card-row {
      display: flex;
      gap: 16px;
      margin-bottom: 15px;
    }

    .card-input {
      width: 100%;
      height: 50px;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      padding: 0 45px 0 15px;
      font-size: 16px;
      color: #333;
      box-sizing: border-box;
    }

    .card-input:focus {
      outline: none;
      border-color: #0073e6;
    }

    .card-type-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .cvv-help {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .plan-summary {
      background: #f8f8f8;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .plan-price {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .plan-name {
      font-size: 14px;
      color: #737373;
    }

    .change-plan {
      background: none;
      border: none;
      color: #0073e6;
      cursor: pointer;
      font-size: 16px;
    }

    .change-plan:hover {
      text-decoration: underline;
    }

    .billing-info {
      margin: 20px 0;
    }

    .billing-info p {
      font-size: 13px;
      color: #737373;
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .terms-text {
      font-size: 13px !important;
      color: #737373 !important;
    }

    .agreement {
      display: flex;
      align-items: flex-start;
      margin: 20px 0;
      gap: 10px;
    }

    .agreement input[type="checkbox"] {
      margin-top: 2px;
    }

    .agreement label {
      font-size: 16px;
      color: #333;
      line-height: 1.4;
    }

    .start-membership-button {
      width: 100%;
      height: 64px;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
      transition: background-color 0.2s;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .start-membership-button:hover:not(:disabled) {
      background: #f40612;
    }

    .start-membership-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .recaptcha-text {
      text-align: center;
      margin-top: 20px;
    }

    .recaptcha-text p {
      font-size: 13px;
      color: #737373;
    }

    /* White Footer */
    .white-footer {
      background: #f3f3f3;
      border-top: 1px solid #e6e6e6;
      padding: 40px 0;
      margin-top: 60px;
    }

    .footer-content {
      max-width: 978px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-question {
      font-size: 16px;
      color: #737373;
      margin-bottom: 20px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    .footer-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-link {
      color: #737373;
      text-decoration: none;
      font-size: 13px;
    }

    .footer-link:hover {
      text-decoration: underline;
    }

    .language-selector {
      display: flex;
    }

    .language-select {
      background: white;
      border: 1px solid #8c8c8c;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .signup-content.dark-content {
        padding: 40px 30px;
      }

      .logo-svg, .logo-svg-red {
        width: 120px;
        height: 32px;
      }

      .header-content {
        padding: 0 20px;
      }

      .plans-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .detail-row {
        grid-template-columns: 1fr;
      }

      .detail-values {
        grid-template-columns: 1fr;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }

      .netflix-next-button,
      .start-membership-button {
        width: 100%;
      }

      .card-row {
        flex-direction: column;
      }

      .card-input-group.half {
        width: 100%;
        margin-right: 0;
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

  private userId: string | null = null;

  // Error messages
  fullNameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  otpError: string = '';

  // Plan selection
  selectedPlan: string = 'premium';

  // Payment details
  selectedPaymentMethod: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  nameOnCard: string = '';
  agreementChecked: boolean = false;

  resendCooldown: number = 0;
  private resendTimer?: any;

  planToIdMap: { [key: string]: number } = {
    basic: 1,
    standard: 2,
    premium: 3
  };

  plans = [
    { id: 'basic', name: 'Basic', quality: 'Good', price: '100', resolution: '720p (HD)', devices: 'TV, computer, mobile phone, tablet', simultaneousStreams: '1', downloads: '1' },
    { id: 'standard', name: 'Standard', quality: 'Great', price: '170', resolution: '1080p (Full HD)', devices: 'TV, computer, mobile phone, tablet', simultaneousStreams: '2', downloads: '2' },
    { id: 'premium', name: 'Premium', quality: 'Best', price: '240', resolution: '4K (Ultra HD) + HDR', devices: 'TV, computer, mobile phone, tablet', simultaneousStreams: '4', downloads: '6' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) this.email = params['email'];
    });
  }

  ngOnDestroy() {
    if (this.resendTimer) clearInterval(this.resendTimer);
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegisterSubmit() {
    this.clearErrors();

    if (!this.validateForm()) return;

    this.isLoading = true;

    this.authService.signup(this.fullName, this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.requiresVerification) {
          this.nextStep(); // Move to OTP verification
        } else {
          this.emailError = 'Registration failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.emailError = error.error?.message || 'Registration failed. Please try again.';
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
          this.userId = response.user.id;
          localStorage.setItem('userId', this.userId!);
          this.goToPlanSelection();
        } else {
          this.otpError = 'Verification failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.otpError = error.error?.message ?? 'Verification failed. Please try again.';
      }
    });
  }

  goToPlanSelection() {
    this.currentStep = 3;
  }

  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;

    if (method === 'card') {
      this.nextStep(); // Go to card details
    } else if (method === 'cash') {
      // For cash payment, simulate developer mode
      this.processDeveloperPayment();
    }
  }

  private processDeveloperPayment(): void {
  console.log('Processing developer mode payment...');
  this.isLoading = true;

  // Simulate payment processing delay
  setTimeout(() => {
    console.log('Developer payment completed successfully');
    this.confirmPlan();
  }, 2000);
}


 private async processPaymobPayment(): Promise<void> {
  if (!this.userId) {
    console.error('User ID not found.');
    return;
  }

  const planPrice = this.getSelectedPlanPrice();
  const amountCents = parseInt(planPrice) * 100; // Convert to cents

  try {
    this.isLoading = true;

    // Prepare flat payload as expected by backend
    const paymentPayload = {
      amountCents: amountCents,
      name: this.fullName,
      email: this.email,
      phone: '+201000000000' // You can later bind this to actual user input
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Call the backend
    const paymentResponse = await this.http
      .post<any>(`${environment.apiUrl}/Paymob/initiate`, paymentPayload, { headers })
      .toPromise();

    if (paymentResponse.success && paymentResponse.redirectUrl) {
      // In developer mode, simulate successful payment
      if (!environment.production) {
        console.log('Developer mode: Simulating successful payment');
        setTimeout(() => {
          this.confirmPlan();
        }, 1000);
      } else {
        // In production, redirect to Paymob
        window.location.href = paymentResponse.redirectUrl;
      }
    } else {
      throw new Error('Payment initialization failed');
    }
  } catch (error) {
    console.error('Payment processing failed:', error);
    this.isLoading = false;
    alert('Payment processing failed. Please try again.');
  }
}

  completeSignup() {
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (this.selectedPaymentMethod === 'card') {
      // Validate card details
      if (!this.validateCardDetails()) {
        return;
      }
      this.processPaymobPayment();
    } else {
      // Cash payment already processed in developer mode
      this.router.navigate(['/Home']);
    }
  }

  private validateCardDetails(): boolean {
    if (!this.cardNumber || this.cardNumber.length < 16) {
      alert('Please enter a valid card number');
      return false;
    }
    if (!this.expiryDate || this.expiryDate.length < 5) {
      alert('Please enter a valid expiry date');
      return false;
    }
    if (!this.cvv || this.cvv.length < 3) {
      alert('Please enter a valid CVV');
      return false;
    }
    if (!this.nameOnCard || this.nameOnCard.trim().length < 2) {
      alert('Please enter the name on card');
      return false;
    }
    if (!this.agreementChecked) {
      alert('Please agree to the terms and conditions');
      return false;
    }
    return true;
  }

  confirmPlan() {
  if (!this.userId) {
    console.error('User ID not found.');
    return;
  }

  const planId = this.planToIdMap[this.selectedPlan];
  console.log(`📡 Submitting subscription for userId=${this.userId}, planId=${planId}`);

  this.isLoading = true;

  this.http.post(`${environment.apiUrl}/Subscription/subscribe-and-bootstrap`, {
    userId: this.userId,
    planId: planId
  }).subscribe({
    next: () => {
      console.log('✅ Backend responded - subscription created');
      this.isLoading = false;

      // Store user authentication
      const userData = {
        id: this.userId,
        email: this.email,
        fullName: this.fullName,
        plan: this.selectedPlan,
        isEmailVerified: true
      };

      localStorage.setItem('netflix_user', JSON.stringify(userData));
      localStorage.setItem('netflix_token', 'temp_token_' + this.userId);

      // Navigate to home
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('❌ Failed to subscribe & create profile', err);
      this.isLoading = false;
      alert('Subscription failed. Please try again.');
    }
  });
}

  resendOtp() {
    if (this.resendCooldown > 0) return;

    this.authService.resendOtp(this.email).subscribe({
      next: () => {
        this.startResendCooldown();
        this.otpError = '';
      },
      error: () => {
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

  getSelectedPlanPrice(): string {
    const plan = this.plans.find(p => p.id === this.selectedPlan);
    return plan ? plan.price : '240';
  }

  getSelectedPlanName(): string {
    const plan = this.plans.find(p => p.id === this.selectedPlan);
    return plan ? plan.name : 'Premium';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
