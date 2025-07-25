import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoriteService, FavoriteDto } from '../../core/services/favorite.service';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FavoriteButtonComponent],
  template: `
    <div class="favorites-page">
      <div class="container">
        <div class="page-header">
          <h1 class="page-title">
            <i class="fas fa-heart"></i>
            قائمة المفضلة
          </h1>
          <p class="page-subtitle">الأفلام والمسلسلات المحفوظة في مفضلتك</p>
        </div>

        <!-- Loading State -->
        <div class="loading-container" *ngIf="isLoading">
          <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
            <p>جاري تحميل المفضلة...</p>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="!isLoading && favorites.length === 0">
          <div class="empty-icon">
            <i class="far fa-heart"></i>
          </div>
          <h2>لا توجد عناصر في المفضلة</h2>
          <p>ابدأ بإضافة الأفلام والمسلسلات المفضلة لديك</p>
          <button class="browse-btn" routerLink="/browse">
            <i class="fas fa-search"></i>
            تصفح المحتوى
          </button>
        </div>

        <!-- Favorites Grid -->
        <div class="favorites-grid" *ngIf="!isLoading && favorites.length > 0">
          <div class="grid-header">
            <span class="results-count">{{ favorites.length }} عنصر في المفضلة</span>
            <div class="view-options">
              <button class="view-btn" 
                      [class.active]="viewMode === 'grid'"
                      (click)="viewMode = 'grid'">
                <i class="fas fa-th"></i>
              </button>
              <button class="view-btn" 
                      [class.active]="viewMode === 'list'"
                      (click)="viewMode = 'list'">
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>

          <div class="favorites-container" [class]="viewMode + '-view'">
            <div class="favorite-item" 
                 *ngFor="let favorite of favorites; trackBy: trackByVideoId">
              
              <!-- Grid View -->
              <div class="grid-card" *ngIf="viewMode === 'grid'">
                <div class="card-image">
                  <img [src]="getVideoThumbnail(favorite.videoId)" 
                       [alt]="favorite.videoTitle"
                       (error)="onImageError($event)">
                  <div class="card-overlay">
                    <div class="overlay-actions">
                      <button class="play-btn" (click)="playVideo(favorite.videoId)">
                        <i class="fas fa-play"></i>
                      </button>
                      <app-favorite-button 
                        [profileId]="currentProfileId"
                        [videoId]="favorite.videoId"
                        [videoTitle]="favorite.videoTitle"
                        [videoDescription]="favorite.videoDescription"
                        (favoriteChanged)="onFavoriteChanged(favorite.id, $event)">
                      </app-favorite-button>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <h3 class="card-title">{{ favorite.videoTitle }}</h3>
                  <p class="card-description">{{ truncateText(favorite.videoDescription, 100) }}</p>
                </div>
              </div>

              <!-- List View -->
              <div class="list-card" *ngIf="viewMode === 'list'">
                <div class="list-image">
                  <img [src]="getVideoThumbnail(favorite.videoId)" 
                       [alt]="favorite.videoTitle"
                       (error)="onImageError($event)">
                </div>
                <div class="list-content">
                  <h3 class="list-title">{{ favorite.videoTitle }}</h3>
                  <p class="list-description">{{ favorite.videoDescription }}</p>
                </div>
                <div class="list-actions">
                  <button class="play-btn" (click)="playVideo(favorite.videoId)">
                    <i class="fas fa-play"></i>
                    تشغيل
                  </button>
                  <app-favorite-button 
                    [profileId]="currentProfileId"
                    [videoId]="favorite.videoId"
                    [videoTitle]="favorite.videoTitle"
                    [videoDescription]="favorite.videoDescription"
                    (favoriteChanged)="onFavoriteChanged(favorite.id, $event)">
                  </app-favorite-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .favorites-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
      color: white;
      padding: 80px 0 40px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .page-header {
      text-align: center;
      margin-bottom: 40px;
    }

    .page-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: #e50914;
    }

    .page-title i {
      margin-right: 15px;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: #b3b3b3;
      margin: 0;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
    }

    .loading-spinner {
      text-align: center;
    }

    .loading-spinner i {
      font-size: 3rem;
      color: #e50914;
      margin-bottom: 20px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon i {
      font-size: 5rem;
      color: #333;
      margin-bottom: 30px;
    }

    .empty-state h2 {
      font-size: 2rem;
      margin-bottom: 15px;
      color: #fff;
    }

    .empty-state p {
      font-size: 1.1rem;
      color: #b3b3b3;
      margin-bottom: 30px;
    }

    .browse-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .browse-btn:hover {
      background: #f40612;
    }

    .browse-btn i {
      margin-right: 10px;
    }

    .grid-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 1px solid #333;
    }

    .results-count {
      font-size: 1.1rem;
      color: #b3b3b3;
    }

    .view-options {
      display: flex;
      gap: 10px;
    }

    .view-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .view-btn.active {
      background: #e50914;
    }

    .view-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .view-btn.active:hover {
      background: #f40612;
    }

    /* Grid View Styles */
    .grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
    }

    .grid-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .grid-card:hover {
      transform: translateY(-5px);
    }

    .card-image {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .grid-card:hover .card-overlay {
      opacity: 1;
    }

    .overlay-actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .play-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      color: #000;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .play-btn:hover {
      background: white;
      transform: scale(1.1);
    }

    .card-content {
      padding: 20px;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: white;
    }

    .card-description {
      color: #b3b3b3;
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0;
    }

    /* List View Styles */
    .list-view {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .list-card {
      display: flex;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .list-card:hover {
      transform: translateX(5px);
    }

    .list-image {
      width: 200px;
      height: 120px;
      flex-shrink: 0;
    }

    .list-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .list-content {
      flex: 1;
      padding: 20px;
    }

    .list-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 10px;
      color: white;
    }

    .list-description {
      color: #b3b3b3;
      line-height: 1.5;
      margin: 0;
    }

    .list-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      gap: 15px;
    }

    .list-view .play-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
      width: auto;
      height: auto;
      border-radius: 4px;
    }

    .list-view .play-btn:hover {
      background: #f40612;
    }

    .list-view .play-btn i {
      margin-right: 8px;
    }

    @media (max-width: 768px) {
      .grid-view {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 20px;
      }

      .list-card {
        flex-direction: column;
      }

      .list-image {
        width: 100%;
        height: 200px;
      }

      .list-actions {
        flex-direction: row;
        justify-content: center;
      }

      .page-title {
        font-size: 2rem;
      }
    }
  `]
})
export class FavoritesPageComponent implements OnInit {
  favorites: FavoriteDto[] = [];
  isLoading = true;
  viewMode: 'grid' | 'list' = 'grid';
  currentProfileId = 1; // يجب أن يأتي من authentication service

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.isLoading = true;
    this.favoriteService.getFavoritesByProfileId(this.currentProfileId).subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.isLoading = false;
      }
    });
  }

  onFavoriteChanged(favoriteId: number, isFavorite: boolean): void {
    if (!isFavorite) {
      // إزالة من القائمة إذا تم حذفه من المفضلة
      this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
    }
  }

  playVideo(videoId: number): void {
    // تنفيذ تشغيل الفيديو - يجب أن يتم التوجيه لصفحة المشغل
    console.log('Playing video:', videoId);
    // TODO: Implement navigation to video player
  }

  getVideoThumbnail(videoId: number): string {
    // إرجاع رابط الصورة المصغرة للفيديو
    return `https://picsum.photos/400/225?random=${videoId}`;
  }

  onImageError(event: any): void {
    // في حالة فشل تحميل الصورة، استخدم صورة افتراضية
    event.target.src = 'https://via.placeholder.com/400x225/333333/ffffff?text=No+Image';
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  trackByVideoId(index: number, item: FavoriteDto): number {
    return item.videoId;
  }
}