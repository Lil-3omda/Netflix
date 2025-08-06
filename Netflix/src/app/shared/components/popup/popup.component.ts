import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupService, PopupConfig } from '../../services/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" *ngIf="currentPopup" (click)="onOverlayClick($event)">
      <div class="popup-container" [ngClass]="'popup-' + currentPopup.type">
        <div class="popup-header">
          <div class="popup-icon">
            <svg *ngIf="currentPopup.type === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#10B981"/>
              <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg *ngIf="currentPopup.type === 'error'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#EF4444"/>
              <path d="m15 9-6 6m0-6 6 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg *ngIf="currentPopup.type === 'warning'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill="#F59E0B"/>
              <path d="M12 9v4m0 4h.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg *ngIf="currentPopup.type === 'info'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
              <path d="m9 12 2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg *ngIf="currentPopup.type === 'confirm'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#F59E0B"/>
              <path d="M12 16v-4m0-4h.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="popup-title">{{ currentPopup.title }}</h3>
          <button class="popup-close" (click)="closePopup()" *ngIf="currentPopup.type !== 'confirm'">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="m18 6-12 12m0-12 12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="popup-body">
          <p class="popup-message">{{ currentPopup.message }}</p>
        </div>
        
        <div class="popup-footer" *ngIf="currentPopup.type === 'confirm'">
          <button class="popup-btn popup-btn-cancel" (click)="onCancel()">
            {{ currentPopup.cancelText || 'Cancel' }}
          </button>
          <button class="popup-btn popup-btn-confirm" (click)="onConfirm()">
            {{ currentPopup.confirmText || 'Confirm' }}
          </button>
        </div>
        
        <div class="popup-footer" *ngIf="currentPopup.type !== 'confirm'">
          <button class="popup-btn popup-btn-primary" (click)="closePopup()">
            OK
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
      z-index: 10000;
      animation: fadeIn 0.2s ease-out;
    }

    .popup-container {
      background: #1a1a1a;
      border-radius: 16px;
      border: 1px solid #333;
      min-width: 400px;
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
      position: relative;
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

    .popup-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s;
    }

    .popup-close:hover {
      color: white;
    }

    .popup-body {
      padding: 20px 24px;
    }

    .popup-message {
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
      color: #e5e5e5;
      white-space: pre-line;
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
    }

    .popup-btn-primary {
      background: #e50914;
      color: white;
    }

    .popup-btn-primary:hover {
      background: #f40612;
      transform: translateY(-1px);
    }

    .popup-btn-confirm {
      background: #e50914;
      color: white;
    }

    .popup-btn-confirm:hover {
      background: #f40612;
    }

    .popup-btn-cancel {
      background: #333;
      color: white;
    }

    .popup-btn-cancel:hover {
      background: #555;
    }

    .popup-success .popup-header {
      border-bottom-color: rgba(16, 185, 129, 0.3);
    }

    .popup-error .popup-header {
      border-bottom-color: rgba(239, 68, 68, 0.3);
    }

    .popup-warning .popup-header {
      border-bottom-color: rgba(245, 158, 11, 0.3);
    }

    .popup-info .popup-header {
      border-bottom-color: rgba(59, 130, 246, 0.3);
    }

    .popup-confirm .popup-header {
      border-bottom-color: rgba(245, 158, 11, 0.3);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
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
export class PopupComponent implements OnInit, OnDestroy {
  currentPopup: PopupConfig | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.subscription = this.popupService.popup$.subscribe(popup => {
      this.currentPopup = popup;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closePopup() {
    this.popupService.hide();
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      if (this.currentPopup?.type !== 'confirm') {
        this.closePopup();
      }
    }
  }

  onConfirm() {
    if (this.currentPopup?.onConfirm) {
      this.currentPopup.onConfirm();
    }
    this.closePopup();
  }

  onCancel() {
    if (this.currentPopup?.onCancel) {
      this.currentPopup.onCancel();
    }
    this.closePopup();
  }
}