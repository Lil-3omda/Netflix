import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  @Input() videoId!: number;
  @Input() profileId!: number;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() variant: 'icon' | 'button' = 'icon';
  @Input() showText: boolean = false;

  isFavorite = false;
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // Subscribe to favorite status changes
    this.favoriteService.favoriteVideoIds$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favoriteIds => {
        this.isFavorite = favoriteIds.has(this.videoId);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFavorite(): void {
    if (this.isLoading || !this.profileId || !this.videoId) {
      return;
    }

    this.isLoading = true;

    this.favoriteService.toggleFavorite(this.profileId, this.videoId)
      .subscribe({
        next: (response) => {
          console.log('Favorite toggled:', response.message);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error toggling favorite:', error);
          this.isLoading = false;
          // Optionally show error message to user
        }
      });
  }

  get buttonText(): string {
    return this.isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
  }

  get buttonClass(): string {
    const baseClass = 'favorite-button';
    const sizeClass = `favorite-button--${this.size}`;
    const variantClass = `favorite-button--${this.variant}`;
    const statusClass = this.isFavorite ? 'favorite-button--active' : 'favorite-button--inactive';
    const loadingClass = this.isLoading ? 'favorite-button--loading' : '';
    
    return `${baseClass} ${sizeClass} ${variantClass} ${statusClass} ${loadingClass}`.trim();
  }
}