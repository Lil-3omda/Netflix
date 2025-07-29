import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { Favorite, VideoInfo } from '../../models/favorite.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  @Input() profileId!: number;
  @Input() showTitle: boolean = true;
  @Input() maxItems?: number;
  @Input() layout: 'grid' | 'row' = 'grid';

  favorites: Favorite[] = [];
  isLoading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    
    // Subscribe to favorites changes
    this.favoriteService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favorites => {
        this.favorites = this.maxItems ? favorites.slice(0, this.maxItems) : favorites;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFavorites(): void {
    if (!this.profileId) {
      console.warn('Profile ID is required to load favorites');
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.favoriteService.getFavoritesByProfileId(this.profileId)
      .subscribe({
        next: (favorites) => {
          this.favorites = this.maxItems ? favorites.slice(0, this.maxItems) : favorites;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading favorites:', error);
          this.error = 'Failed to load favorites. Please try again.';
          this.isLoading = false;
        }
      });
  }

  onVideoClick(video: VideoInfo): void {
    // Navigate to video detail page
    this.router.navigate(['/video', video.id]);
  }

  onRemoveFavorite(videoId: number): void {
    this.favoriteService.removeFromFavorites(this.profileId, videoId)
      .subscribe({
        next: (response) => {
          console.log('Removed from favorites:', response.message);
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
  }

  refresh(): void {
    this.loadFavorites();
  }

  getVideoImageUrl(video: VideoInfo): string {
    return video.imageUrl || '/assets/images/default-video-thumbnail.jpg';
  }

  formatDuration(duration: string): string {
    if (!duration) return '';
    
    // If duration is in minutes, convert to readable format
    const minutes = parseInt(duration);
    if (!isNaN(minutes)) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    }
    
    return duration;
  }

  getVideoTypeDisplay(type: number): string {
    switch (type) {
      case 0: return 'Movie';
      case 1: return 'Series';
      case 2: return 'Documentary';
      default: return 'Video';
    }
  }

  trackByVideoId(index: number, favorite: Favorite): number {
    return favorite.videoId;
  }
}