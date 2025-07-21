import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/videos/home/home';
import { MovieSlider } from './shared/movie-slider/movie-slider';
import { RouterModule } from '@angular/router';
import { Category } from './shared/category/category';




// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet,Navbar,Home,MovieSlider,RouterModule,Category],
//   import { SignupComponent } from "./features/auth/signup/signup";
//   import { Login } from "./features/auth/login/login";
//   import { NetflixModel } from './components/netflix-model/netflix-model';
//     template: `
//     <div class="container-fluid">
//       <button class="btn btn-primary m-3" (click)="showModal = true">Open Netflix Modal</button>
//       <app-netflix-modal
//         [isVisible]="showModal"
//         (closeModal)="showModal = false">
//       </app-netflix-modal>
//     </div>
//   `,
//   imports: [RouterOutlet,Navbar,Home,MovieSliderSectionComponent,SignupComponent,Login,NetflixModel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
    showModal = false;
}
