import { Component } from '@angular/core';

@Component({
  selector: 'app-netflix-terms',
  imports: [],
  templateUrl: './netflix-terms.html',
  styleUrl: './netflix-terms.css'
})
export class NetflixTerms {
  constructor() { }

  onBackToHelp(): void {
    // Navigation logic here
    console.log('Navigate to Help Home');
  }

  onPrint(): void {
    window.print();
}

}
