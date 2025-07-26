import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Home } from './features/videos/home/home';
import { MovieSliderSectionComponent } from './shared/movie-slider/movie-slider';
import { SignupComponent } from "./features/auth/signup/signup";
 import { Login } from "./features/auth/login/login";
import { NetflixModel } from './components/netflix-model/netflix-model';
import { NetflixCenter } from './pages/netflix-center/netflix-center';
import { NetflixCategoryFilter } from './shared/netflix-category-filter/netflix-category-filter';
import { ContentGrid } from './components/content-grid/content-grid';
import { NewsSection } from './components/news-section/news-section';
import { NetflixCenterBanar } from './components/netflix-center-banar/netflix-center-banar';
import { Footer } from './pages/netflix-center/footer/footer';
import { CustomerServiceCenter } from './pages/customer-service-center/customer-service-center';
import { NetflixTerms } from './pages/customer-service-center/netflix-terms/netflix-terms';
import { TermFooter } from './pages/customer-service-center/term-footer/term-footer';
import { NetflixContact } from './pages/netflix-contact/netflix-contact';
import { MainNetflixAdmainSettings } from './admin/pages/settings/main-netflix-admain-settings/main-netflix-admain-settings';

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
  imports: [RouterOutlet,Navbar,Home,MovieSliderSectionComponent,SignupComponent,Login,NetflixModel,NetflixCenter,NetflixCategoryFilter,ContentGrid,NewsSection,NetflixCenterBanar,Footer,CustomerServiceCenter,NetflixTerms,TermFooter,NetflixContact,MainNetflixAdmainSettings],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
}
