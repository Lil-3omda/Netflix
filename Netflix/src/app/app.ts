import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/videos/home/home';

import { MovieSliderSectionComponent } from './shared/movie-slider/movie-slider';
import { SignupComponent } from "./features/auth/signup/signup";
 import { Login } from "./features/auth/login/login";
import { NetflixModel } from './components/netflix-model/netflix-model';

@Component({
  selector: 'app-root',
    template: `
    <div class="container-fluid">
      <button class="btn btn-primary m-3" (click)="showModal = true">Open Netflix Modal</button>
      <app-netflix-modal
        [isVisible]="showModal"
        (closeModal)="showModal = false">
      </app-netflix-modal>
    </div>
  `,
  imports: [RouterOutlet,Navbar,Home,MovieSliderSectionComponent,SignupComponent,Login,NetflixModel],



  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
    showModal = false;
}
