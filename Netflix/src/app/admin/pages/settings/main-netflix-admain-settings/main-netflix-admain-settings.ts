import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneralSettings } from '../general-settings/general-settings';
import { ContentManagement } from '../content-management/content-management';
import { NotificationSettings } from '../notification-settings/notification-settings';
import { SecuritySettings } from '../security-settings/security-settings';
import { SystemSettings } from '../system-settings/system-settings';
import { UserManagement } from '../user-management/user-management';
import { Settings } from '../settings';
import { Tab } from '../settings';
import { PopupService } from '../../../../shared/services/popup.service';
@Component({
  selector: 'app-main-netflix-admain-settings',
  imports: [CommonModule,FormsModule,GeneralSettings,ContentManagement,NotificationSettings,SecuritySettings,SystemSettings,UserManagement],
  templateUrl: './main-netflix-admain-settings.html',
  styleUrl: './main-netflix-admain-settings.css'
})
export class MainNetflixAdmainSettings {
 activeTab: string = 'general';

  settings: Settings = {
    siteName: 'Netflix Admin',
    siteDescription: 'Premium streaming platform',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    contentApproval: true,
    autoBackup: true,
    backupFrequency: 'daily',
    logLevel: 'info',
    cacheEnabled: true,
    compressionEnabled: true,
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    currency: 'USD'
  };

  tabs: Tab[] = [
    { id: 'general', label: 'General', icon: 'gear-fill' },
    { id: 'users', label: 'User Management', icon: 'people-fill' },
    { id: 'security', label: 'Security', icon: 'shield-fill' },
    { id: 'content', label: 'Content Management', icon: 'database-fill' },
    { id: 'notifications', label: 'Notifications', icon: 'bell-fill' },
    { id: 'system', label: 'System', icon: 'globe' }
  ];

  constructor(private popupService: PopupService) {}

  ngOnInit(): void {
    // Load settings from API
    this.loadSettings();
  }

  loadSettings(): void {
    // TODO: Implement API call to load settings
    console.log('Loading settings from API...');
  }

  updateSettings(changes: Partial<Settings>): void {
    this.settings = { ...this.settings, ...changes };
  }

  handleSave(): void {
    // TODO: Implement API call to save settings
    console.log('Settings to save:', this.settings);
            this.popupService.showSuccess('Settings saved successfully!', 'Settings Updated');
  }
}
