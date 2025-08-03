import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AiChatbotComponent } from './features/communication/components/ai-chatbot/ai-chatbot.component';

import { NetflixUser } from './admin/pages/netflix-user/netflix-user';
import { UserManagement } from './admin/pages/settings/user-management/user-management';
import { MainNetflixAdmainSettings } from './admin/pages/settings/main-netflix-admain-settings/main-netflix-admain-settings';

import { AuthService } from './core/services/auth.service';
import { ProfileService } from './core/services/profile.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    AiChatbotComponent,UserManagement
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Netflix';
  hideChatbot = false;

  private router = inject(Router);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  constructor() {
    this.handleInitialNavigation();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.hideChatbot = ['/admin', '/login', '/signup'].some(path => url.startsWith(path));
    });
  }

  private handleInitialNavigation(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getCurrentUser();
    const currentUrl = this.router.url;

    // if (currentUrl === '/' || currentUrl === '/dashboard') {
    //   if (isAuthenticated && user) {
    //     if (user.isAdmin) {
    //       this.router.navigate(['/admin/dashboard']);
    //     } else {
    //       const profileId = localStorage.getItem('profileId');
    //       if (profileId) {
    //         this.router.navigate(['/Home']);
    //       } else {
    //         this.router.navigate(['/Profile']);
    //       }
    //     }
    //   }
    // }
  }
}
