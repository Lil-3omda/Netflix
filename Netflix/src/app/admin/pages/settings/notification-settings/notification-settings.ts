import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../settings';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
@Component({
  selector: 'app-notification-settings',
  imports: [CommonModule,ToggleSwitch],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.css'
})
export class NotificationSettings {
  @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  notificationTypes = [
    'New user registrations',
    'Payment failures',
    'Content uploads',
    'System errors',
    'Security alerts'
  ];

  updateSetting(key: keyof Settings, value: any): void {
    const target = value.target as HTMLInputElement;
    this.settingsChange.emit({ [key]: target.checked });
  }
}
