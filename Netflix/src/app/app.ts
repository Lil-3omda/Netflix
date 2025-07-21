import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/videos/home/home';
import { MovieSlider } from './shared/movie-slider/movie-slider';
import { RouterModule } from '@angular/router';
import { Category } from './shared/category/category';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Home,MovieSlider,RouterModule,Category],
  import { SignupComponent } from "./features/auth/signup/signup";
  import { Login } from "./features/auth/login/login";

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
}
