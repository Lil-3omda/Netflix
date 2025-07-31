import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from 'src/app/pages/favorite/favoriteservice';


@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSliderSectionComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
 @Input() showRank: boolean = false;
 @Input() title: string = '';
  @Input() categoryName: string = '';
  @Input() isTop10: boolean = false;

  movies: any[] = [];

profileId: number = 0;

  constructor(private movieService: MovieCategory, private http: HttpClient, private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.profileId = Number(localStorage.getItem('profileId')) || 0;

     if (this.categoryName === 'Top 10') {

      this.http.get<any[]>('https://localhost:7140/api/Videos/TopViews?count=10')
        .subscribe(data => {
          this.movies = data;
          this.loadFavorites();
        });
    } else if (this.categoryName) {

      this.movieService.getMoviesByCategory(this.categoryName)
        .subscribe(data => {
          this.movies = data.videos;
          this.loadFavorites();
        });
    }
  }


  // Load favorites for the current profile
  loadFavorites(): void {
  if (!this.profileId || this.movies.length === 0) return;

  this.favoriteService.getFavorites(this.profileId).subscribe(favs => {
    const favIds = favs.map(f => f.videoId);
    this.movies.forEach(movie => {
      movie.isFavorite = favIds.includes(movie.id);
    });
  });

  }


  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const slider = this.slider.nativeElement;
    const scrollAmount = 300;
    const currentScroll = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (currentScroll + 5 >= maxScroll) {

      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }


// Toggle favorite status
  toggleFavorite(movie: any, event: Event) {
  event.stopPropagation();
  event.preventDefault();

  if (movie.isFavorite) {
    this.favoriteService.removeFavorite(this.profileId, movie.id).subscribe(() => {
      movie.isFavorite = false;
    });
  } else {
    this.favoriteService.addFavorite(this.profileId, movie.id).subscribe(() => {
      movie.isFavorite = true;
    });
  }
}

}
