export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorAuth: boolean;
  maxLoginAttempts: number;
  sessionTimeout: number;
  contentApproval: boolean;
  autoBackup: boolean;
  backupFrequency: string;
  logLevel: string;
  cacheEnabled: boolean;
  compressionEnabled: boolean;
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: string;
}


