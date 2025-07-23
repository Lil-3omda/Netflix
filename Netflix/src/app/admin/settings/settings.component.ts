import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1>System Settings</h1>
      </div>

      <div class="settings-content">
        <div class="settings-section">
          <h3>General Settings</h3>
          <div class="setting-group">
            <label>
              <span>Site Name</span>
              <input type="text" [(ngModel)]="settings.siteName" class="setting-input">
            </label>
            
            <label>
              <span>Admin Email</span>
              <input type="email" [(ngModel)]="settings.adminEmail" class="setting-input">
            </label>
            
            <label>
              <span>Maintenance Mode</span>
              <input type="checkbox" [(ngModel)]="settings.maintenanceMode">
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>Content Settings</h3>
          <div class="setting-group">
            <label>
              <span>Max Upload Size (MB)</span>
              <input type="number" [(ngModel)]="settings.maxUploadSize" class="setting-input">
            </label>
            
            <label>
              <span>Auto-approve Content</span>
              <input type="checkbox" [(ngModel)]="settings.autoApproveContent">
            </label>
            
            <label>
              <span>Content Moderation</span>
              <select [(ngModel)]="settings.contentModeration" class="setting-select">
                <option value="strict">Strict</option>
                <option value="moderate">Moderate</option>
                <option value="lenient">Lenient</option>
              </select>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>User Management</h3>
          <div class="setting-group">
            <label>
              <span>Allow User Registration</span>
              <input type="checkbox" [(ngModel)]="settings.allowRegistration">
            </label>
            
            <label>
              <span>Email Verification Required</span>
              <input type="checkbox" [(ngModel)]="settings.emailVerification">
            </label>
            
            <label>
              <span>Default Subscription</span>
              <select [(ngModel)]="settings.defaultSubscription" class="setting-select">
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>Chatbot Configuration</h3>
          <div class="setting-group">
            <label>
              <span>Enable Chatbot</span>
              <input type="checkbox" [(ngModel)]="settings.chatbotEnabled">
            </label>
            
            <label>
              <span>Auto-response Delay (seconds)</span>
              <input type="number" [(ngModel)]="settings.autoResponseDelay" class="setting-input">
            </label>
            
            <label>
              <span>Escalation Threshold</span>
              <input type="number" [(ngModel)]="settings.escalationThreshold" class="setting-input">
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h3>API Configuration</h3>
          <div class="setting-group">
            <label>
              <span>API Rate Limit (requests/hour)</span>
              <input type="number" [(ngModel)]="settings.apiRateLimit" class="setting-input">
            </label>
            
            <label>
              <span>Enable API Logging</span>
              <input type="checkbox" [(ngModel)]="settings.apiLogging">
            </label>
            
            <label>
              <span>API Version</span>
              <select [(ngModel)]="settings.apiVersion" class="setting-select">
                <option value="v1">Version 1.0</option>
                <option value="v2">Version 2.0</option>
                <option value="v3">Version 3.0 (Beta)</option>
              </select>
            </label>
          </div>
        </div>

        <div class="settings-actions">
          <button (click)="saveSettings()" class="save-btn">Save Settings</button>
          <button (click)="resetSettings()" class="reset-btn">Reset to Defaults</button>
          <button (click)="exportSettings()" class="export-btn">Export Configuration</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .settings-header h1 {
      margin: 0 0 30px 0;
      color: #E50914;
    }

    .settings-content {
      max-width: 800px;
    }

    .settings-section {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
      margin-bottom: 25px;
    }

    .settings-section h3 {
      margin: 0 0 20px 0;
      color: #E50914;
      font-size: 1.2rem;
    }

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .setting-group label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .setting-group label span {
      font-weight: 500;
      min-width: 200px;
    }

    .setting-input, .setting-select {
      padding: 10px 15px;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      min-width: 200px;
    }

    .setting-input:focus, .setting-select:focus {
      outline: none;
      border-color: #E50914;
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: #E50914;
    }

    .settings-actions {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }

    .save-btn, .reset-btn, .export-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .save-btn {
      background: #E50914;
      color: white;
    }

    .reset-btn {
      background: #6b7280;
      color: white;
    }

    .export-btn {
      background: #3b82f6;
      color: white;
    }

    .save-btn:hover {
      background: #b8070f;
    }

    .reset-btn:hover {
      background: #4b5563;
    }

    .export-btn:hover {
      background: #2563eb;
    }

    @media (max-width: 768px) {
      .setting-group label {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      
      .setting-group label span {
        min-width: auto;
      }
      
      .setting-input, .setting-select {
        min-width: auto;
      }
      
      .settings-actions {
        flex-direction: column;
      }
    }
  `]
})
export class SettingsComponent {
  settings = {
    siteName: 'Netflix Admin',
    adminEmail: 'admin@netflix.com',
    maintenanceMode: false,
    maxUploadSize: 500,
    autoApproveContent: false,
    contentModeration: 'moderate',
    allowRegistration: true,
    emailVerification: true,
    defaultSubscription: 'basic',
    chatbotEnabled: true,
    autoResponseDelay: 2,
    escalationThreshold: 3,
    apiRateLimit: 1000,
    apiLogging: true,
    apiVersion: 'v2'
  };

  saveSettings(): void {
    console.log('Saving settings:', this.settings);
    // Implement save logic
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset to default values
      console.log('Resetting settings to defaults');
    }
  }

  exportSettings(): void {
    const dataStr = JSON.stringify(this.settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'netflix-admin-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }
}