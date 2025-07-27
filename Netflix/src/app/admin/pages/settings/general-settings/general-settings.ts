import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { InputField } from '../input-field/input-field';
import { Settings } from '../settings';
@Component({
  selector: 'app-general-settings',
  imports: [CommonModule,FormsModule,ToggleSwitch,InputField],
  templateUrl: './general-settings.html',
  styleUrl: './general-settings.css'
})
export class GeneralSettings {
  @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ];

  updateSetting(key: keyof Settings, value: any): void {
    this.settingsChange.emit({ [key]: value });
  }
}
