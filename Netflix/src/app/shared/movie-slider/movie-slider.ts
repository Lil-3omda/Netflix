import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from 'src/app/pages/favorite/favoriteservice';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-slider.html',
  styleUrls: ['./movie-slider.css']
})
export class MovieSliderSectionComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  @Input() showRank: boolean = false;
  @Input() title: string = '';
  @Input() categoryName: string = '';
  @Input() isTop10: boolean = false;

  movies: any[] = [];
  profileId: number | null = null;
  isLoadingProfile: boolean = false;

  constructor(
    private movieService: MovieCategory,
    private http: HttpClient,
    private favoriteService: FavoriteService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loadProfileId();

    if (this.categoryName === 'Top 10') {
      this.loadTop10Movies();
    } else if (this.categoryName) {
      this.loadMoviesByCategory();
    }
  }

  loadProfileId(): void {
    this.isLoadingProfile = true;
    const hashedProfileId = localStorage.getItem('activeProfile');

    if (!hashedProfileId) {
      console.warn('No activeProfile found in localStorage');
      this.isLoadingProfile = false;
      return;
    }

    this.profileService.getProfileIdFromHash(hashedProfileId).subscribe({
      next: (profileId) => {
        this.profileId = profileId;
        localStorage.setItem('profileId', profileId.toString());
        this.isLoadingProfile = false;
        this.loadFavorites();
      },
      error: (err) => {
        console.error('Failed to get profile ID:', err);
        this.isLoadingProfile = false;
      }
    });
  }

  loadTop10Movies(): void {
    this.http.get<any[]>('https://localhost:7140/api/Videos/TopViews?count=10')
      .subscribe({
        next: (data) => {
          this.movies = data;
          this.loadFavorites();
        },
        error: (err) => console.error('Error loading top 10 movies:', err)
      });
  }

  loadMoviesByCategory(): void {
    this.movieService.getMoviesByCategory(this.categoryName)
      .subscribe({
        next: (data) => {
          this.movies = data.videos;
          this.loadFavorites();
        },
        error: (err) => console.error('Error loading movies by category:', err)
      });
  }

  loadFavorites(): void {
    if (!this.profileId || this.movies.length === 0) return;

    this.favoriteService.getFavorites(this.profileId).subscribe({
      next: (favs) => {
        const favIds = favs.map(f => f.videoId);
        this.movies.forEach(movie => {
          movie.isFavorite = favIds.includes(movie.id);
        });
      },
      error: (err) => console.error('Error loading favorites:', err)
    });
  }

  scrollLeft(): void {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
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

  async toggleFavorite(movie: any, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Wait for profileId if still loading
    if (this.isLoadingProfile) {
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!this.isLoadingProfile) {
            clearInterval(checkInterval);
            resolve(null);
          }
        }, 100);
      });
    }

    if (!this.profileId) {
      alert('Please select a profile first');
      return;
    }

    movie.isLoading = true;

    try {
      if (movie.isFavorite) {
        await this.favoriteService.removeFavorite(this.profileId, movie.id).toPromise();
      } else {
        await this.favoriteService.addFavorite(this.profileId, movie.id).toPromise();
      }
      movie.isFavorite = !movie.isFavorite;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorite. Please try again.');
    } finally {
      movie.isLoading = false;
    }
  }
}
