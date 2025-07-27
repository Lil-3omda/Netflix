import { Component } from '@angular/core';
import { Navbar } from './layout/navbar/navbar';
import { HttpClient } from '@angular/common/http';

import { Router, NavigationEnd, RouterOutlet,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { AiChatbotComponent } from './features/communication/components/ai-chatbot/ai-chatbot.component';
import { NetflixUser } from './admin/pages/netflix-user/netflix-user';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,Navbar,RouterModule,CommonModule,AiChatbotComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Netflix';
  hideChatbot = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.hideChatbot = ['/admin', '/login', '/signup'].some(path => url.startsWith(path));
    });
  }
}
