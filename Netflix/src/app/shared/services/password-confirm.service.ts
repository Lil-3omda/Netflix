import { Injectable } from '@angular/core';
import { PasswordConfirmComponent, PasswordConfirmConfig } from '../components/password-confirm/password-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordConfirmService {
  private component?: PasswordConfirmComponent;

  setComponent(component: PasswordConfirmComponent) {
    this.component = component;
  }

  show(config: PasswordConfirmConfig) {
    if (this.component) {
      this.component.show(config);
    }
  }

  hide() {
    if (this.component) {
      this.component.hide();
    }
  }
}