import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="netflix-page">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
        Settings
      </h1>
      <p class="text-gray-400 mt-2">Configure system settings and preferences</p>
      <div class="mt-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 text-center">
        <p class="text-gray-300">Settings component coming soon...</p>
      </div>
    </div>
  `,
  styles: [`
    .netflix-page {
      animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class SettingsComponent {}
