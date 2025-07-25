import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchProgressService } from '../../../core/services/watch-progress.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="video-progress-container" *ngIf="showProgress">
      <div class="progress-bar-wrapper">
        <div class="progress-info">
          <span class="time-text">{{ currentTimeDisplay }} / {{ totalTimeDisplay }}</span>
          <span class="percentage-text">{{ progressPercentage.toFixed(0) }}%</span>
        </div>
        
        <div class="progress-bar" 
             (click)="seekToPosition($event)"
             #progressBar>
          <div class="progress-track"></div>
          <div class="progress-fill" 
               [style.width.%]="progressPercentage"></div>
          <div class="progress-thumb" 
               [style.left.%]="progressPercentage"
               *ngIf="progressPercentage > 0"></div>
        </div>
        
        <div class="progress-actions">
          <button class="resume-btn" 
                  (click)="resumeWatching()"
                  *ngIf="hasProgress && progressPercentage < 95">
            <i class="fas fa-play"></i>
            استئناف المشاهدة
          </button>
          
          <button class="restart-btn" 
                  (click)="restartVideo()"
                  *ngIf="hasProgress">
            <i class="fas fa-redo"></i>
            إعادة تشغيل
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .video-progress-container {
      background: rgba(0, 0, 0, 0.8);
      padding: 15px;
      border-radius: 8px;
      margin: 10px 0;
    }

    .progress-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      color: #fff;
      font-size: 14px;
    }

    .progress-bar-wrapper {
      width: 100%;
    }

    .progress-bar {
      position: relative;
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      cursor: pointer;
      margin-bottom: 15px;
    }

    .progress-track {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .progress-fill {
      position: absolute;
      height: 100%;
      background: linear-gradient(90deg, #e50914, #f40612);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .progress-thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      transition: left 0.3s ease;
    }

    .progress-bar:hover .progress-thumb {
      width: 16px;
      height: 16px;
    }

    .progress-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .resume-btn, .restart-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .resume-btn:hover, .restart-btn:hover {
      background: #f40612;
      transform: translateY(-2px);
    }

    .restart-btn {
      background: rgba(255, 255, 255, 0.1);
    }

    .restart-btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .time-text {
      font-family: 'Courier New', monospace;
    }

    .percentage-text {
      font-weight: bold;
    }
  `]
})
export class VideoProgressComponent implements OnInit, OnDestroy {
  @Input() profileId!: number;
  @Input() videoId!: number;
  @Input() videoDurationInSeconds: number = 0;
  @Input() autoSaveInterval: number = 10; // حفظ كل 10 ثوانٍ
  @Input() currentVideoTime: number = 0; // الوقت الحالي من video player
  @Input() showProgress: boolean = true;
  
  @Output() seekRequested = new EventEmitter<number>();
  @Output() resumeRequested = new EventEmitter<void>();
  @Output() restartRequested = new EventEmitter<void>();

  progressPercentage: number = 0;
  hasProgress: boolean = false;
  savedProgress: number = 0; // التقدم المحفوظ في قاعدة البيانات
  
  private autoSaveSubscription?: Subscription;

  constructor(private watchProgressService: WatchProgressService) {}

  ngOnInit(): void {
    this.loadProgress();
    this.startAutoSave();
  }

  ngOnDestroy(): void {
    this.stopAutoSave();
    this.saveCurrentProgress(); // حفظ أخير عند إغلاق المكون
  }

  get currentTimeDisplay(): string {
    return this.formatTime(this.currentVideoTime);
  }

  get totalTimeDisplay(): string {
    return this.formatTime(this.videoDurationInSeconds);
  }

  private loadProgress(): void {
    if (!this.profileId || !this.videoId) return;

    this.watchProgressService.getProgress(this.profileId, this.videoId).subscribe({
      next: (progress) => {
        if (progress) {
          this.savedProgress = this.watchProgressService.timeSpanToSeconds(progress.currentTime);
          this.progressPercentage = this.watchProgressService.getProgressPercentage(
            this.savedProgress, 
            this.videoDurationInSeconds
          );
          this.hasProgress = true;
        } else {
          this.hasProgress = false;
          this.progressPercentage = 0;
        }
      },
      error: (err) => {
        console.error('Error loading progress:', err);
        this.hasProgress = false;
      }
    });
  }

  private startAutoSave(): void {
    this.stopAutoSave(); // تأكد من عدم وجود subscription سابق
    
    this.autoSaveSubscription = interval(this.autoSaveInterval * 1000).subscribe(() => {
      this.saveCurrentProgress();
    });
  }

  private stopAutoSave(): void {
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe();
      this.autoSaveSubscription = undefined;
    }
  }

  private saveCurrentProgress(): void {
    if (!this.profileId || !this.videoId || this.currentVideoTime <= 0) return;

    // تحديث النسبة المئوية بناءً على الوقت الحالي
    this.progressPercentage = this.watchProgressService.getProgressPercentage(
      this.currentVideoTime,
      this.videoDurationInSeconds
    );

    this.watchProgressService.updateProgressInSeconds(
      this.profileId,
      this.videoId,
      this.currentVideoTime
    ).subscribe({
      next: (response) => {
        this.savedProgress = this.currentVideoTime;
        this.hasProgress = true;
        console.log('Progress saved:', response.message);
      },
      error: (err) => {
        console.error('Error saving progress:', err);
      }
    });
  }

  seekToPosition(event: MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    const seekTime = (percentage / 100) * this.videoDurationInSeconds;
    this.seekRequested.emit(seekTime);
  }

  resumeWatching(): void {
    if (this.hasProgress) {
      this.seekRequested.emit(this.savedProgress);
      this.resumeRequested.emit();
    }
  }

  restartVideo(): void {
    this.seekRequested.emit(0);
    this.restartRequested.emit();
    
    // حفظ التقدم كـ 0
    if (this.profileId && this.videoId) {
      this.watchProgressService.updateProgressInSeconds(this.profileId, this.videoId, 0).subscribe({
        next: () => {
          this.savedProgress = 0;
          this.progressPercentage = 0;
          this.hasProgress = false;
        },
        error: (err) => console.error('Error resetting progress:', err)
      });
    }
  }

  // دالة لتحديث الوقت الحالي من video player
  updateCurrentTime(timeInSeconds: number): void {
    this.currentVideoTime = timeInSeconds;
    this.progressPercentage = this.watchProgressService.getProgressPercentage(
      timeInSeconds,
      this.videoDurationInSeconds
    );
  }

  // دالة مساعدة لتنسيق الوقت
  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }
}