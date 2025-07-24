import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactForm } from './contact-form/contact-form';
import { ContactFoter } from './contact-foter/contact-foter';

@Component({
  selector: 'app-netflix-contact',
  imports: [CommonModule,FormsModule,ContactForm,ContactFoter],
  templateUrl: './netflix-contact.html',
  styleUrl: './netflix-contact.css'
})
export class NetflixContact {
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
