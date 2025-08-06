import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { Settings } from '../settings';
@Component({
  selector: 'app-content-management',
  imports: [CommonModule,ToggleSwitch],
  templateUrl: './content-management.html',
  styleUrl: './content-management.css'
})
export class ContentManagement {
  @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  uploadSettings = [
    'Max file size: 2GB',
    'Supported formats: MP4, AVI, MKV',
    'Quality: 1080p, 4K'
  ];

  contentStats = [
    { label: 'Total Movies', value: '8,542' },
    { label: 'Total Series', value: '1,234' },
    { label: 'Pending Approval', value: '45' },
    { label: 'Storage Used', value: '2.4TB' }
  ];

  updateSetting(key: keyof Settings, value: any): void {
    this.settingsChange.emit({ [key]: value });
  }
}
