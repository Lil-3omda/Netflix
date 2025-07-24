import { Component } from '@angular/core';
import { TermFooter } from './term-footer/term-footer';
import { NetflixTerms } from './netflix-terms/netflix-terms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-service-center',
  imports: [TermFooter,NetflixTerms,CommonModule,FormsModule],
  templateUrl: './customer-service-center.html',
  styleUrl: './customer-service-center.css'
})
export class CustomerServiceCenter {
  onLogin() {
    // Handle login logic here
    console.log('Login clicked');
  }

  onJoinNetflix() {
    // Handle join Netflix logic here
    console.log('Join Netflix clicked');
  }

  constructor() { }
}
