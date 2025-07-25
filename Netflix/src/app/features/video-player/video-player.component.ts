import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';
import { VideoProgressComponent } from '../../shared/components/video-progress/video-progress.component';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, FavoriteButtonComponent, VideoProgressComponent],
  template: `
    <div class="video-player-container">
      <div class="video-wrapper">
        <video 
          #videoElement
          class="video-player"
          [src]="videoUrl"
          (loadedmetadata)="onVideoLoaded()"
          (timeupdate)="onTimeUpdate()"
          (ended)="onVideoEnded()"
          controls>
          متصفحك لا يدعم تشغيل الفيديو
        </video>
        
        <div class="video-overlay" [class.visible]="showOverlay">
          <div class="overlay-content">
            <div class="video-info">
              <h1 class="video-title">{{ videoTitle }}</h1>
              <p class="video-description">{{ videoDescription }}</p>
            </div>
            
            <div class="video-actions">
              <app-favorite-button
                [profileId]="currentProfileId"
                [videoId]="videoId"
                [videoTitle]="videoTitle"
                [videoDescription]="videoDescription"
                (favoriteChanged)="onFavoriteChanged($event)">
              </app-favorite-button>
              
              <button class="action-btn share-btn" (click)="shareVideo()">
                <i class="fas fa-share"></i>
                <span class="tooltip">مشاركة</span>
              </button>
              
              <button class="action-btn download-btn" (click)="downloadVideo()">
                <i class="fas fa-download"></i>
                <span class="tooltip">تحميل</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Progress Component -->
      <app-video-progress
        [profileId]="currentProfileId"
        [videoId]="videoId"
        [videoDurationInSeconds]="videoDuration"
        [currentVideoTime]="currentTime"
        [autoSaveInterval]="15"
        (seekRequested)="seekToTime($event)"
        (resumeRequested)="onResumeRequested()"
        (restartRequested)="onRestartRequested()">
      </app-video-progress>
      
      <!-- Video Details -->
      <div class="video-details">
        <div class="details-header">
          <h2 class="details-title">{{ videoTitle }}</h2>
          <div class="video-meta">
            <span class="duration">{{ formatDuration(videoDuration) }}</span>
            <span class="release-year">{{ releaseYear }}</span>
            <span class="rating">{{ rating }}</span>
          </div>
        </div>
        
        <div class="details-content">
          <p class="description">{{ videoDescription }}</p>
          
          <div class="tags">
            <span class="tag" *ngFor="let tag of tags">{{ tag }}</span>
          </div>
        </div>
        
        <div class="details-actions">
          <button class="primary-btn" (click)="togglePlayPause()">
            <i [class]="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            {{ isPlaying ? 'إيقاف مؤقت' : 'تشغيل' }}
          </button>
          
          <button class="secondary-btn" (click)="toggleFullscreen()">
            <i class="fas fa-expand"></i>
            ملء الشاشة
          </button>
          
          <button class="secondary-btn" (click)="adjustPlaybackSpeed()">
            <i class="fas fa-tachometer-alt"></i>
            السرعة: {{ playbackSpeed }}x
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-player-container {
      background: #000;
      color: white;
      min-height: 100vh;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      max-height: 70vh;
      background: #000;
    }

    .video-player {
      width: 100%;
      height: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    .video-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        transparent 30%,
        transparent 70%,
        rgba(0, 0, 0, 0.7) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .video-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .overlay-content {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .video-info h1 {
      font-size: 2rem;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }

    .video-info p {
      font-size: 1.1rem;
      max-width: 500px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
      line-height: 1.4;
    }

    .video-actions {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .action-btn {
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

    .action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: scale(1.1);
    }

    .action-btn .tooltip {
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
    }

    .action-btn:hover .tooltip {
      opacity: 1;
    }

    .video-details {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .details-header {
      margin-bottom: 30px;
    }

    .details-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 15px;
      color: #fff;
    }

    .video-meta {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: 1.1rem;
      color: #b3b3b3;
    }

    .video-meta span {
      padding: 5px 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    .details-content {
      margin-bottom: 30px;
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.6;
      color: #e5e5e5;
      margin-bottom: 20px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .tag {
      background: #e50914;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .details-actions {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .primary-btn, .secondary-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .primary-btn {
      background: #e50914;
      color: white;
    }

    .primary-btn:hover {
      background: #f40612;
      transform: translateY(-2px);
    }

    .secondary-btn {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .secondary-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    @media (max-width: 768px) {
      .overlay-content {
        flex-direction: column;
        gap: 20px;
      }

      .video-info h1 {
        font-size: 1.5rem;
      }

      .video-details {
        padding: 20px;
      }

      .details-title {
        font-size: 2rem;
      }

      .video-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .details-actions {
        justify-content: center;
      }
    }
  `]
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  // Video Data (would come from service/route params)
  videoId: number = 1;
  videoTitle: string = 'فيلم مثال';
  videoDescription: string = 'هذا وصف تجريبي للفيديو. يحتوي على معلومات مفصلة حول محتوى الفيديو والقصة والشخصيات.';
  videoUrl: string = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  releaseYear: number = 2023;
  rating: string = '8.5/10';
  tags: string[] = ['أكشن', 'إثارة', 'خيال علمي'];
  
  // Player State
  currentProfileId: number = 1;
  videoDuration: number = 0;
  currentTime: number = 0;
  isPlaying: boolean = false;
  playbackSpeed: number = 1;
  showOverlay: boolean = true;
  
  private overlayTimeout?: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get video ID from route params
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.videoId = +params['id'];
        this.loadVideoData();
      }
    });

    // Show overlay initially, then hide after 3 seconds
    this.showOverlayTemporarily();
  }

  ngOnDestroy(): void {
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
    }
  }

  private loadVideoData(): void {
    // هنا يتم تحميل بيانات الفيديو من الـ API
    console.log('Loading video data for ID:', this.videoId);
    // TODO: Implement API call to get video details
  }

  onVideoLoaded(): void {
    const video = this.videoElement.nativeElement;
    this.videoDuration = video.duration;
    console.log('Video loaded, duration:', this.videoDuration);
  }

  onTimeUpdate(): void {
    const video = this.videoElement.nativeElement;
    this.currentTime = video.currentTime;
    this.isPlaying = !video.paused;
    
    // Update progress component
    const progressComponent = document.querySelector('app-video-progress') as any;
    if (progressComponent?.updateCurrentTime) {
      progressComponent.updateCurrentTime(this.currentTime);
    }
  }

  onVideoEnded(): void {
    this.isPlaying = false;
    console.log('Video ended');
    // TODO: Handle video end (show recommendations, mark as watched, etc.)
  }

  seekToTime(timeInSeconds: number): void {
    const video = this.videoElement.nativeElement;
    video.currentTime = timeInSeconds;
    this.currentTime = timeInSeconds;
  }

  onResumeRequested(): void {
    this.togglePlayPause();
    this.showOverlayTemporarily();
  }

  onRestartRequested(): void {
    this.seekToTime(0);
    this.togglePlayPause();
    this.showOverlayTemporarily();
  }

  togglePlayPause(): void {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
    this.showOverlayTemporarily();
  }

  toggleFullscreen(): void {
    const video = this.videoElement.nativeElement;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }

  adjustPlaybackSpeed(): void {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(this.playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    this.playbackSpeed = speeds[nextIndex];
    
    const video = this.videoElement.nativeElement;
    video.playbackRate = this.playbackSpeed;
  }

  shareVideo(): void {
    // تنفيذ مشاركة الفيديو
    const shareUrl = `${window.location.origin}/watch/${this.videoId}`;
    if (navigator.share) {
      navigator.share({
        title: this.videoTitle,
        text: this.videoDescription,
        url: shareUrl
      });
    } else {
      // نسخ الرابط للحافظة
      navigator.clipboard.writeText(shareUrl);
      alert('تم نسخ رابط الفيديو');
    }
  }

  downloadVideo(): void {
    // تنفيذ تحميل الفيديو
    console.log('Download video:', this.videoId);
    // TODO: Implement download functionality
  }

  onFavoriteChanged(isFavorite: boolean): void {
    console.log('Favorite status changed:', isFavorite);
    // يمكن إضافة منطق إضافي هنا
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }

  private showOverlayTemporarily(): void {
    this.showOverlay = true;
    
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
    }
    
    this.overlayTimeout = setTimeout(() => {
      this.showOverlay = false;
    }, 3000);
  }
}