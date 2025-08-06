import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { MovieSliderSectionComponent } from '../../../shared/movie-slider/movie-slider';
import { NetflixModel } from '../../../components/netflix-model/netflix-model';
import { FormsModule } from '@angular/forms';
import { MovieCategory } from '../../../core/services/movie-category';
import { Navbar } from "../../../layout/navbar/navbar";
import { Category } from "../../../shared/category/category";
import { HomePageServices } from '../../../core/services/home-page-services';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PopupService } from '../../../shared/services/popup.service';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, FormsModule, MovieSliderSectionComponent, Navbar, NetflixModel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {
@ViewChild('slider', { static: false }) slider!: ElementRef;


top10Movies: any[] = [];
data: any[] = [];
personalizedData: any[] = [];
subscriptionNotification: any = null;
  showTrailer = false;
    heroMovie: any; // أول فيلم من top 10

  sanitizedTrailerUrl: SafeResourceUrl = '';
constructor(
  private movieService: MovieCategory, 
  private router: Router,
  private sanitizer: DomSanitizer, 
  private homeservices: HomePageServices,
  private popupService: PopupService
) {}

showTrailerNow(): void {
  this.showTrailer = true;
  const rawUrl = this.top10Movies[0]?.trailerUrl?.replace('"', '');
  this.setTrailerUrl(rawUrl); // تأكد إنها هنا
}
  ngOnInit(): void {

    this.movieService.getTopViewed(10).subscribe({
      next: (data:any) => {
        this.top10Movies = data;
                this.heroMovie = data[0];
        this.setTrailerUrl(this.heroMovie?.trailerUrl);
      },
      error: (err:any) => {
        console.error('Error fetching top 10:', err);
      }
    });
    this.loadPersonalizedCategories();
    this.checkSubscriptionExpiration();
  }
setTrailerUrl(url: string): void {
  if (!url) return;

  const videoId = this.extractYouTubeId(url);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
}

extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
goToMovie(id: number) {
  this.router.navigate(['/watchMovie', id]);
  this.showTrailer = false;
}

backToHero(): void {
  this.showTrailer = false;
}
scrollLeft() {
  this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight() {
  this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
}

checkSubscriptionExpiration() {
  const userData = localStorage.getItem('netflix_user');
  if (userData) {
    const user = JSON.parse(userData);
    const userId = user.id;
    
    this.homeservices.getSubscriptionExpirationStatus(userId).subscribe({
      next: (response: any) => {
        if (response.showNotification) {
          this.subscriptionNotification = response;
          this.showSubscriptionPopup(response);
        }
      },
      error: (err: any) => {
        console.error('Error checking subscription expiration:', err);
      }
    });
  }
}

private showSubscriptionPopup(notification: any) {
  const title = notification.isExpired ? 'Subscription Expired' : 'Subscription Expiring Soon';
  const message = notification.isExpired 
    ? `Your ${notification.planName} subscription has expired. Your access has been suspended. Renew your subscription to continue watching.`
    : `Your ${notification.planName} subscription expires in ${notification.daysUntilExpiration} day(s). Don't miss out on your favorite shows and movies! Renew now to continue enjoying unlimited streaming.`;
  
  this.popupService.showConfirm(
    message,
    () => {
      this.renewSubscription();
    },
    () => {
      // User dismissed the popup
      console.log('Subscription popup dismissed');
    },
    title,
    'Renew Now',
    'Dismiss'
  );
}

renewSubscription() {
  this.router.navigate(['/signup'], {
    queryParams: { step: 4, renewal: true }
  });
}

loadPersonalizedCategories() {
  const userData = localStorage.getItem('netflix_user');
  if (userData) {
    const user = JSON.parse(userData);
    const userId = user.id;
    
    // First try to get personalized categories based on watch history
    this.homeservices.getPersonalizedHomepage(userId).subscribe({
      next: (personalizedData: any) => {
        if (personalizedData && personalizedData.length > 0) {
          this.personalizedData = personalizedData;
          console.log('Personalized categories loaded:', this.personalizedData);
        } else {
          // Fall back to default categories if no watch history
          this.loadDefaultCategories();
        }
      },
      error: (err: any) => {
        console.error('Error loading personalized categories:', err);
        // Fall back to default categories on error
        this.loadDefaultCategories();
      }
    });
  } else {
    // Fall back to default categories if no user data
    this.loadDefaultCategories();
  }
}

loadDefaultCategories() {
  this.homeservices.getCategories().subscribe({
    next: data => {
      this.data = data;
      console.log('Default categories loaded:', this.data);
    },
    error: err => {
      console.error('Error loading default categories:', err);
    }
  });
}

  rating = 9.3;
  isModalOpen:boolean = false;
  selectedMovie:any=null;
  openMovieModal(movie:any) {
    console.log('modal opened!');
    this.selectedMovie= movie;
    this.isModalOpen = true;
  }


  handleMovieClick(movie:any){
    this.selectedMovie= movie;
    console.log('movie clicked:',movie);
  }


closeMovieModal() {
    console.log('modal close!');
    this.isModalOpen = false;
    this.selectedMovie= null;
  }
    showModal = false;
    // this.isModalOpen = false;
}
