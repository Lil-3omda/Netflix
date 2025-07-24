import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  issueDescription: string = '';

  handleLinkClick(action: string, event: Event): void {
    event.preventDefault();
    console.log('Quick link clicked:', action);
    // Handle navigation or action here
  }
}
