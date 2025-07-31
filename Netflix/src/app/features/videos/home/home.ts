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
  showTrailer = false;
    heroMovie: any; // أول فيلم من top 10

  sanitizedTrailerUrl: SafeResourceUrl = '';
constructor(private movieService: MovieCategory,     private router: Router,
 private sanitizer: DomSanitizer, private homeservices:HomePageServices) {}

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
    this.loadCategories();
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



  loadCategories() {
    this.homeservices.getCategories().subscribe({
      next:data=>{
        this.data = data;
        console.log('Categories loaded:', this.data);
      },
      error: err => {
        console.error('Error loading categories:', err);
      }
    })

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
