import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Settings } from '../settings';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { InputField } from '../input-field/input-field';
@Component({
  selector: 'app-system-settings',
  imports: [InputField,CommonModule,FormsModule,ToggleSwitch],
  templateUrl: './system-settings.html',
  styleUrl: './system-settings.css'
})
export class SystemSettings {
 @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  backupOptions = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  systemStatus = [
    { label: 'CPU Usage', value: '23%', colorClass: 'text-success' },
    { label: 'Memory Usage', value: '67%', colorClass: 'text-warning' },
    { label: 'Disk Usage', value: '89%', colorClass: 'text-danger' },
    { label: 'Uptime', value: '15 days, 4 hours', colorClass: 'text-white' }
  ];

  updateSetting(key: keyof Settings, value: any): void {
    this.settingsChange.emit({ [key]: value });
  }
}
