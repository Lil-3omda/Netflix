import { Component, Input } from '@angular/core';

// Example interface for video data (you might already have this)
interface Video {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  type: number;
  categoryName: string;
}

@Component({
  selector: 'app-video-card-with-favorites',
  template: `
    <div class="video-card">
      <!-- Video Thumbnail -->
      <div class="video-thumbnail">
        <img [src]="video.imageUrl" [alt]="video.title" class="thumbnail-image">
        
        <!-- Overlay with controls -->
        <div class="video-overlay">
          <!-- Play Button -->
          <button class="play-btn" (click)="onPlay()">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </button>
          
          <!-- Favorite Button - This is the key integration -->
          <app-favorite-button 
            [videoId]="video.id"
            [profileId]="currentProfileId"
            size="medium"
            variant="icon">
          </app-favorite-button>
        </div>
      </div>
      
      <!-- Video Info -->
      <div class="video-info">
        <h3 class="video-title">{{ video.title }}</h3>
        <p class="video-description">{{ video.description }}</p>
        
        <!-- Action Buttons -->
        <div class="video-actions">
          <button class="primary-btn" (click)="onPlay()">
            Play
          </button>
          
          <!-- Alternative: Button variant of favorite -->
          <app-favorite-button 
            [videoId]="video.id"
            [profileId]="currentProfileId"
            variant="button"
            [showText]="true"
            size="small">
          </app-favorite-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-card {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      background: #1a1a1a;
      transition: transform 0.3s ease;
    }
    
    .video-card:hover {
      transform: scale(1.05);
    }
    
    .video-thumbnail {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
    }
    
    .thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .video-card:hover .video-overlay {
      opacity: 1;
    }
    
    .play-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #000;
    }
    
    .play-btn svg {
      width: 20px;
      height: 20px;
      margin-left: 2px;
    }
    
    .video-info {
      padding: 16px;
    }
    
    .video-title {
      font-size: 16px;
      font-weight: 600;
      color: white;
      margin: 0 0 8px 0;
    }
    
    .video-description {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 16px 0;
      line-height: 1.4;
    }
    
    .video-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
    
    .primary-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }
    
    .primary-btn:hover {
      background: #f40612;
    }
  `]
})
export class VideoCardWithFavoritesComponent {
  @Input() video!: Video;
  @Input() currentProfileId: number = 1; // This should come from your profile service

  onPlay(): void {
    // Handle play action
    console.log('Playing video:', this.video.title);
    // Navigate to video player or open modal
  }
}