import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/videos/home/home';
import { MovieSliderSectionComponent } from './shared/movie-slider/movie-slider';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Home,MovieSliderSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
}
