import { Component } from '@angular/core';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-netflix-terms',
  imports: [],
  templateUrl: './netflix-terms.html',
  styleUrl: './netflix-terms.css'
})
export class NetflixTerms {
  constructor() { }

  onBackToHelp(): void {
    window.history.back();
  }

  onPrint(): void {
    window.print();
}

}
