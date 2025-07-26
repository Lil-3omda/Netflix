import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { Settings } from '../settings';
@Component({
  selector: 'app-security-settings',
  imports: [CommonModule,ToggleSwitch],
  templateUrl: './security-settings.html',
  styleUrl: './security-settings.css'
})
export class SecuritySettings {
  @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  securityEvents = [
    'Failed login attempt from IP: 192.168.1.100',
    'Admin password changed successfully',
    'New admin account created'
  ];

  updateSetting(key: keyof Settings, value: any): void {
    this.settingsChange.emit({ [key]: value });
  }
}
