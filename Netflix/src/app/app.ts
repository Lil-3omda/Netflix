import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
//     template: `
//     <div class="container-fluid">
//       <button class="btn btn-primary m-3" (click)="showModal = true">Open Netflix Modal</button>
//       <app-netflix-modal
//         [isVisible]="showModal"
//         (closeModal)="showModal = false">
//       </app-netflix-modal>
//     </div>
//   `,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
}
