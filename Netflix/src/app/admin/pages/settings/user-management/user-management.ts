import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Settings } from '../settings';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import { InputField } from '../input-field/input-field';
@Component({
  selector: 'app-user-management',
  imports: [CommonModule,FormsModule,ToggleSwitch,InputField],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement {
  @Input() settings!: Settings;
  @Output() settingsChange = new EventEmitter<Partial<Settings>>();

  updateSetting(key: keyof Settings, value: any): void {
    this.settingsChange.emit({ [key]: value });
  }
}
