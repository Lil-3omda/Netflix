import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../core/services/favorite.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="toggleFavorite()" 
      [disabled]="isLoading"
      class="favorite-btn"
      [class.is-favorite]="isFavorite"
      [class.loading]="isLoading">
      
      <i [class]="iconClass"></i>
      <span class="tooltip">{{ tooltipText }}</span>
    </button>
  `,
  styles: [`
    .favorite-btn {
      position: relative;
      background: rgba(42, 42, 42, 0.6);
      border: 2px solid #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .favorite-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    .favorite-btn.is-favorite {
      background: #e50914;
      border-color: #e50914;
    }

    .favorite-btn.is-favorite:hover {
      background: #f40612;
    }

    .favorite-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .favorite-btn i {
      font-size: 16px;
    }

    .loading {
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .tooltip {
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;
    }

    .favorite-btn:hover .tooltip {
      opacity: 1;
    }

    .tooltip::before {
      content: '';
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid rgba(0, 0, 0, 0.8);
    }
  `]
})
export class FavoriteButtonComponent implements OnInit {
  @Input() profileId!: number;
  @Input() videoId!: number;
  @Input() videoTitle?: string;
  @Input() videoDescription?: string;
  @Output() favoriteChanged = new EventEmitter<boolean>();
  
  isFavorite = false;
  isLoading = false;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.checkFavoriteStatus();
  }

  get iconClass(): string {
    if (this.isLoading) {
      return 'fas fa-spinner fa-spin';
    }
    return this.isFavorite ? 'fas fa-heart' : 'far fa-heart';
  }

  get tooltipText(): string {
    if (this.isLoading) {
      return 'جاري التحديث...';
    }
    return this.isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة';
  }

  private checkFavoriteStatus(): void {
    if (!this.profileId || !this.videoId) return;
    
    this.isLoading = true;
    this.favoriteService.isFavorite(this.profileId, this.videoId).subscribe({
      next: (isFav) => {
        this.isFavorite = isFav;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error checking favorite status:', err);
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(): void {
    if (this.isLoading || !this.profileId || !this.videoId) return;

    this.isLoading = true;

    if (this.isFavorite) {
      // حذف من المفضلة
      this.favoriteService.removeFavorite(this.profileId, this.videoId).subscribe({
        next: (response) => {
          this.isFavorite = false;
          this.isLoading = false;
          this.favoriteChanged.emit(false);
          console.log(response.message);
        },
        error: (err) => {
          console.error('Error removing favorite:', err);
          this.isLoading = false;
        }
      });
    } else {
      // إضافة للمفضلة
      const dto = {
        profileId: this.profileId,
        videoId: this.videoId
      };

      this.favoriteService.addFavorite(dto).subscribe({
        next: (response) => {
          this.isFavorite = true;
          this.isLoading = false;
          this.favoriteChanged.emit(true);
          console.log(response.message);
        },
        error: (err) => {
          console.error('Error adding favorite:', err);
          this.isLoading = false;
        }
      });
    }
  }
}