import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface PasswordConfirmConfig {
  title: string;
  message: string;
  onConfirm: (password: string) => void;
  onCancel?: () => void;
}

@Component({
  selector: 'app-password-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="popup-overlay" *ngIf="currentConfig" (click)="onOverlayClick($event)">
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="10" rx="2" ry="2" fill="#F59E0B"/>
              <circle cx="12" cy="7" r="4" stroke="#F59E0B" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <h3 class="popup-title">{{ currentConfig.title }}</h3>
        </div>
        
        <div class="popup-body">
          <p class="popup-message">{{ currentConfig.message }}</p>
          
          <div class="form-group">
            <label for="adminPassword">Enter your admin password to confirm:</label>
            <input
              type="password"
              id="adminPassword"
              [(ngModel)]="password"
              name="adminPassword"
              class="form-input"
              placeholder="Admin password"
              (keyup.enter)="onConfirm()"
              autocomplete="current-password">
          </div>
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </div>
        
        <div class="popup-footer">
          <button class="popup-btn popup-btn-cancel" (click)="onCancel()" [disabled]="isLoading">
            Cancel
          </button>
          <button class="popup-btn popup-btn-confirm" (click)="onConfirm()" [disabled]="isLoading || !password.trim()">
            <span *ngIf="!isLoading">Confirm</span>
            <div *ngIf="isLoading" class="loading-spinner"></div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
      animation: fadeIn 0.2s ease-out;
    }

    .popup-container {
      background: #1a1a1a;
      border-radius: 16px;
      border: 1px solid #333;
      min-width: 450px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
      color: white;
    }

    .popup-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 24px 16px;
      border-bottom: 1px solid #333;
    }

    .popup-icon {
      flex-shrink: 0;
    }

    .popup-title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      flex-grow: 1;
    }

    .popup-body {
      padding: 20px 24px;
    }

    .popup-message {
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 20px 0;
      color: #e5e5e5;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #e50914;
      font-size: 14px;
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
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #e50914;
    }

    .error-message {
      color: #ef4444;
      font-size: 14px;
      margin-top: 8px;
    }

    .popup-footer {
      padding: 16px 24px 24px;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .popup-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      min-width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popup-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .popup-btn-confirm {
      background: #e50914;
      color: white;
    }

    .popup-btn-confirm:hover:not(:disabled) {
      background: #f40612;
    }

    .popup-btn-cancel {
      background: #333;
      color: white;
    }

    .popup-btn-cancel:hover:not(:disabled) {
      background: #555;
    }

    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff30;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .popup-container {
        min-width: unset;
        width: 95%;
        margin: 20px;
      }
      
      .popup-footer {
        flex-direction: column-reverse;
      }
      
      .popup-btn {
        width: 100%;
      }
    }
  `]
})
export class PasswordConfirmComponent implements OnInit {
  currentConfig: PasswordConfirmConfig | null = null;
  password = '';
  errorMessage = '';
  isLoading = false;

  private configSubject = new BehaviorSubject<PasswordConfirmConfig | null>(null);
  public config$ = this.configSubject.asObservable();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.config$.subscribe(config => {
      this.currentConfig = config;
      if (config) {
        this.password = '';
        this.errorMessage = '';
        this.isLoading = false;
      }
    });
  }

  show(config: PasswordConfirmConfig) {
    this.configSubject.next(config);
  }

  hide() {
    this.configSubject.next(null);
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  async onConfirm() {
    if (!this.password.trim() || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Verify admin password
      const verificationResult = await this.http.post<any>(`${environment.apiUrl}/Admin/verify-password`, {
        password: this.password
      }).toPromise();

      if (verificationResult.isValid) {
        if (this.currentConfig?.onConfirm) {
          this.currentConfig.onConfirm(this.password);
        }
        this.hide();
      } else {
        this.errorMessage = 'Invalid password. Please try again.';
      }
    } catch (error: any) {
      console.error('Password verification error:', error);
      this.errorMessage = error.error?.message || 'Failed to verify password. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  onCancel() {
    if (this.currentConfig?.onCancel) {
      this.currentConfig.onCancel();
    }
    this.hide();
  }
}

