import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PopupConfig {
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupSubject = new BehaviorSubject<PopupConfig | null>(null);
  public popup$ = this.popupSubject.asObservable();

  showSuccess(message: string, title: string = 'Success') {
    this.popupSubject.next({
      title,
      message,
      type: 'success'
    });
  }

  showError(message: string, title: string = 'Error') {
    this.popupSubject.next({
      title,
      message,
      type: 'error'
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    this.popupSubject.next({
      title,
      message,
      type: 'warning'
    });
  }

  showInfo(message: string, title: string = 'Information') {
    this.popupSubject.next({
      title,
      message,
      type: 'info'
    });
  }

  showConfirm(
    message: string, 
    onConfirm: () => void, 
    onCancel?: () => void,
    title: string = 'Confirm',
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ) {
    this.popupSubject.next({
      title,
      message,
      type: 'confirm',
      confirmText,
      cancelText,
      onConfirm,
      onCancel
    });
  }

  hide() {
    this.popupSubject.next(null);
  }
}