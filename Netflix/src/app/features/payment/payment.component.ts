import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from './payment.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-page">
      <div class="payment-container">
        <div class="payment-header">
          <h1>Complete Your Payment</h1>
          <p>Secure payment powered by Paymob</p>
        </div>

        <div class="payment-form" *ngIf="!isProcessing">
          <div class="plan-summary">
            <h3>Selected Plan: {{ selectedPlan.name }}</h3>
            <p class="plan-price">EGP {{ selectedPlan.price }}/month</p>
          </div>

          <form (ngSubmit)="initiatePayment()">
            <div class="form-group">
              <label for="name">Full Name</label>
              <input
                type="text"
                id="name"
                [(ngModel)]="paymentData.name"
                name="name"
                required
                class="form-input">
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                [(ngModel)]="paymentData.email"
                name="email"
                required
                class="form-input">
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                [(ngModel)]="paymentData.phone"
                name="phone"
                required
                class="form-input">
            </div>

            <button type="submit" class="pay-button" [disabled]="isLoading">
              <span *ngIf="!isLoading">Pay EGP {{ selectedPlan.price }}</span>
              <div *ngIf="isLoading" class="loading-spinner"></div>
            </button>
          </form>
        </div>

        <div class="processing-payment" *ngIf="isProcessing">
          <div class="processing-content">
            <div class="processing-spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we process your payment securely.</p>
          </div>
        </div>

        <div class="payment-security">
          <div class="security-badges">
            <div class="security-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" fill="#00D532"/>
                <path d="M10 15L7 12L8.41 10.59L10 12.17L15.59 6.58L17 8L10 15Z" fill="white"/>
              </svg>
              <span>SSL Secured</span>
            </div>
            <div class="security-badge">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" fill="#1976D2"/>
                <path d="M6 8H18M6 12H14" stroke="white" stroke-width="2"/>
              </svg>
              <span>Bank Grade Security</span>
            </div>
          </div>
          <p class="security-text">
            Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .payment-container {
      max-width: 500px;
      width: 100%;
      background: rgba(17, 17, 17, 0.9);
      border-radius: 16px;
      padding: 40px;
      border: 1px solid #333;
      backdrop-filter: blur(10px);
    }

    .payment-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .payment-header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #e50914;
    }

    .payment-header p {
      color: #999;
      font-size: 16px;
    }

    .plan-summary {
      background: rgba(229, 9, 20, 0.1);
      border: 1px solid rgba(229, 9, 20, 0.3);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
    }

    .plan-summary h3 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .plan-price {
      font-size: 24px;
      font-weight: 700;
      color: #e50914;
      margin: 0;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #e50914;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      background: #333;
      border: 1px solid #555;
      border-radius: 8px;
      color: white;
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #e50914;
    }

    .pay-button {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #e50914, #f40612);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }

    .pay-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(229, 9, 20, 0.4);
    }

    .pay-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #ffffff30;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .processing-payment {
      text-align: center;
      padding: 40px 20px;
    }

    .processing-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid #333;
      border-top: 4px solid #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    .processing-content h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .processing-content p {
      color: #999;
      font-size: 16px;
    }

    .payment-security {
      border-top: 1px solid #333;
      padding-top: 20px;
    }

    .security-badges {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 15px;
    }

    .security-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #999;
    }

    .security-text {
      text-align: center;
      font-size: 12px;
      color: #666;
      line-height: 1.4;
      margin: 0;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .payment-container {
        padding: 30px 20px;
      }

      .security-badges {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    }
  `]
})
export class PaymentComponent implements OnInit {
  selectedPlan = {
    name: 'Premium',
    price: 240
  };

  paymentData = {
    name: '',
    email: '',
    phone: ''
  };

  isLoading = false;
  isProcessing = false;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.route.queryParams.subscribe(params => {
        const userId = params['userId'];
        const planId = params['planId'];
      // You can now call the backend to create a payment session, etc.
    });
  }

  async initiatePayment() {
    if (!this.validateForm()) return;

    this.isLoading = true;

    try {
      const paymentRequest = {
        amountCents: this.selectedPlan.price * 100, // Convert to cents
        email: this.paymentData.email,
        name: this.paymentData.name,
        phone: this.paymentData.phone
      };

      const response = await this.paymentService.initiatePayment(paymentRequest).toPromise();

      if (response.success) {
        this.isProcessing = true;
        // Redirect to Paymob payment page
        window.location.href = response.redirectUrl;
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.paymentData.name.trim()) {
      alert('Please enter your full name');
      return false;
    }
    if (!this.paymentData.email.trim() || !this.paymentData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!this.paymentData.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    return true;
  }
}
