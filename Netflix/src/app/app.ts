import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AiChatbotComponent } from './features/communication/components/ai-chatbot/ai-chatbot.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    AiChatbotComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Netflix';
  hideChatbot = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    const role = this.authService.getUserRole();
    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl.toLowerCase() === '/home') {
      if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if (role === 'User') {
        this.router.navigate(['/home']);
      }
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.hideChatbot = ['/admin', '/login', '/signup'].some(path => url.startsWith(path));
    });
  }

}
