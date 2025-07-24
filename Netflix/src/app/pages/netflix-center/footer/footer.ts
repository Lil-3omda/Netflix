import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  companyLinks = [
    'About Netflix',
    'Newsroom',
    'Company Assets',
    'Start watching'
  ];

  connectLinks = [
    'Contact Us'
  ];

  legalLinks = [
    'Terms and Conditions',
    'Privacy',
    'Cookie Preferences'
  ];

  constructor() { }
}
