import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';
import { VideoProgressComponent } from '../../shared/components/video-progress/video-progress.component';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [CommonModule, RouterModule, FavoriteButtonComponent, VideoProgressComponent],
  template: `
    <div class="demo-container">
      <div class="container">
        <h1 class="demo-title">مثال على استخدام المكونات الجديدة</h1>
        
        <!-- Demo Cards -->
        <div class="demo-cards">
          
          <!-- Favorite Button Demo -->
          <div class="demo-card">
            <h2 class="card-title">زر المفضلة</h2>
            <p class="card-description">
              يمكن استخدام هذا الزر في أي مكان لإضافة/حذف فيديو من المفضلة
            </p>
            
            <div class="demo-content">
              <div class="video-mock">
                <img src="https://picsum.photos/300/200?random=1" alt="فيديو تجريبي">
                <div class="video-overlay">
                  <app-favorite-button
                    [profileId]="currentProfileId"
                    [videoId]="1"
                    [videoTitle]="'فيلم الأكشن المثير'"
                    [videoDescription]="'فيلم مليء بالإثارة والتشويق'"
                    (favoriteChanged)="onFavoriteChanged('فيلم الأكشن المثير', $event)">
                  </app-favorite-button>
                </div>
              </div>
            </div>
            
            <div class="demo-code">
              <h4>كود المثال:</h4>
              <pre><code>&lt;app-favorite-button
  [profileId]="currentProfileId"
  [videoId]="1"
  [videoTitle]="'فيلم الأكشن المثير'"
  [videoDescription]="'فيلم مليء بالإثارة والتشويق'"
  (favoriteChanged)="onFavoriteChanged($event)"&gt;
&lt;/app-favorite-button&gt;</code></pre>
            </div>
          </div>

          <!-- Video Progress Demo -->
          <div class="demo-card">
            <h2 class="card-title">شريط تقدم المشاهدة</h2>
            <p class="card-description">
              يعرض ويحفظ تقدم المشاهدة تلقائياً مع إمكانية التحكم
            </p>
            
            <div class="demo-content">
              <app-video-progress
                [profileId]="currentProfileId"
                [videoId]="2"
                [videoDurationInSeconds]="3600"
                [currentVideoTime]="currentTime"
                [autoSaveInterval]="5"
                (seekRequested)="onSeekRequested($event)"
                (resumeRequested)="onResumeRequested()"
                (restartRequested)="onRestartRequested()">
              </app-video-progress>
              
              <!-- Simulator Controls -->
              <div class="simulator-controls">
                <h4>محاكي التشغيل:</h4>
                <div class="controls">
                  <button class="control-btn" (click)="simulatePlay()">
                    <i class="fas fa-play"></i>
                    {{ isSimulatorPlaying ? 'إيقاف' : 'تشغيل' }}
                  </button>
                  <button class="control-btn" (click)="resetSimulator()">
                    <i class="fas fa-redo"></i>
                    إعادة تعيين
                  </button>
                  <span class="time-display">
                    الوقت الحالي: {{ formatTime(currentTime) }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="demo-code">
              <h4>كود المثال:</h4>
              <pre><code>&lt;app-video-progress
  [profileId]="currentProfileId"
  [videoId]="2"
  [videoDurationInSeconds]="3600"
  [currentVideoTime]="currentTime"
  [autoSaveInterval]="5"
  (seekRequested)="onSeekRequested($event)"
  (resumeRequested)="onResumeRequested()"
  (restartRequested)="onRestartRequested()"&gt;
&lt;/app-video-progress&gt;</code></pre>
            </div>
          </div>

          <!-- Multiple Videos Demo -->
          <div class="demo-card full-width">
            <h2 class="card-title">عدة فيديوهات مع المكونات</h2>
            <p class="card-description">
              مثال على عرض عدة فيديوهات مع أزرار المفضلة
            </p>
            
            <div class="videos-grid">
              <div class="video-item" *ngFor="let video of demoVideos; trackBy: trackByVideoId">
                <div class="video-thumbnail">
                  <img [src]="video.thumbnail" [alt]="video.title">
                  <div class="video-actions">
                    <button class="play-btn" (click)="playVideo(video.id)">
                      <i class="fas fa-play"></i>
                    </button>
                    <app-favorite-button
                      [profileId]="currentProfileId"
                      [videoId]="video.id"
                      [videoTitle]="video.title"
                      [videoDescription]="video.description"
                      (favoriteChanged)="onFavoriteChanged(video.title, $event)">
                    </app-favorite-button>
                  </div>
                </div>
                <div class="video-info">
                  <h4 class="video-title">{{ video.title }}</h4>
                  <p class="video-description">{{ video.description }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Activity Log -->
        <div class="activity-log">
          <h3>سجل الأنشطة</h3>
          <div class="log-entries">
            <div class="log-entry" *ngFor="let entry of activityLog; trackBy: trackByLogId">
              <span class="log-time">{{ entry.time | date:'HH:mm:ss' }}</span>
              <span class="log-message">{{ entry.message }}</span>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="navigation-links">
          <h3>الصفحات الجديدة</h3>
          <div class="links">
            <a routerLink="/favorites" class="nav-link">
              <i class="fas fa-heart"></i>
              صفحة المفضلة
            </a>
            <a routerLink="/watch/1" class="nav-link">
              <i class="fas fa-play"></i>
              مشغل الفيديو
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
      color: white;
      padding: 40px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .demo-title {
      text-align: center;
      font-size: 2.5rem;
      color: #e50914;
      margin-bottom: 40px;
    }

    .demo-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .demo-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .demo-card.full-width {
      grid-column: 1 / -1;
    }

    .card-title {
      color: #e50914;
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    .card-description {
      color: #b3b3b3;
      margin-bottom: 25px;
      line-height: 1.6;
    }

    .demo-content {
      margin-bottom: 25px;
    }

    .video-mock {
      position: relative;
      max-width: 300px;
      margin: 0 auto 20px;
      border-radius: 8px;
      overflow: hidden;
    }

    .video-mock img {
      width: 100%;
      height: auto;
      display: block;
    }

    .video-overlay {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .simulator-controls {
      background: rgba(0, 0, 0, 0.3);
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .simulator-controls h4 {
      margin-bottom: 15px;
      color: #fff;
    }

    .controls {
      display: flex;
      gap: 15px;
      align-items: center;
      flex-wrap: wrap;
    }

    .control-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .control-btn:hover {
      background: #f40612;
    }

    .time-display {
      color: #b3b3b3;
      font-family: 'Courier New', monospace;
    }

    .videos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .video-item {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .video-item:hover {
      transform: translateY(-5px);
    }

    .video-thumbnail {
      position: relative;
      aspect-ratio: 16/9;
    }

    .video-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 10px;
    }

    .play-btn {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 35px;
      height: 35px;
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

    .video-info {
      padding: 15px;
    }

    .video-title {
      font-size: 1rem;
      margin-bottom: 8px;
      color: white;
    }

    .video-description {
      font-size: 0.85rem;
      color: #b3b3b3;
      line-height: 1.4;
      margin: 0;
    }

    .demo-code {
      background: #1a1a1a;
      border-radius: 8px;
      padding: 20px;
      border-left: 4px solid #e50914;
    }

    .demo-code h4 {
      margin-bottom: 15px;
      color: #fff;
    }

    .demo-code pre {
      margin: 0;
      overflow-x: auto;
    }

    .demo-code code {
      color: #f8f8f2;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .activity-log {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 25px;
      margin-bottom: 30px;
    }

    .activity-log h3 {
      color: #e50914;
      margin-bottom: 20px;
    }

    .log-entries {
      max-height: 200px;
      overflow-y: auto;
    }

    .log-entry {
      display: flex;
      gap: 15px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .log-entry:last-child {
      border-bottom: none;
    }

    .log-time {
      color: #b3b3b3;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      min-width: 80px;
    }

    .log-message {
      color: #fff;
    }

    .navigation-links {
      text-align: center;
    }

    .navigation-links h3 {
      color: #e50914;
      margin-bottom: 20px;
    }

    .links {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #e50914;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-link:hover {
      background: #f40612;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .demo-cards {
        grid-template-columns: 1fr;
      }

      .videos-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      .controls {
        flex-direction: column;
        align-items: flex-start;
      }

      .demo-title {
        font-size: 2rem;
      }
    }
  `]
})
export class ComponentsDemoComponent {
  currentProfileId = 1;
  currentTime = 0;
  isSimulatorPlaying = false;
  private simulatorInterval?: any;
  
  activityLog: Array<{id: number, time: Date, message: string}> = [];
  private logId = 1;

  demoVideos = [
    {
      id: 3,
      title: 'مسلسل الدراما المثير',
      description: 'مسلسل يحكي قصة مليئة بالأحداث المثيرة',
      thumbnail: 'https://picsum.photos/400/225?random=3'
    },
    {
      id: 4,
      title: 'فيلم الكوميديا الممتع',
      description: 'فيلم كوميدي يضمن لك الضحك والمتعة',
      thumbnail: 'https://picsum.photos/400/225?random=4'
    },
    {
      id: 5,
      title: 'وثائقي الطبيعة',
      description: 'رحلة ساحرة في عالم الطبيعة الخلاب',
      thumbnail: 'https://picsum.photos/400/225?random=5'
    },
    {
      id: 6,
      title: 'فيلم الخيال العلمي',
      description: 'مغامرة في المستقبل مع تقنيات متطورة',
      thumbnail: 'https://picsum.photos/400/225?random=6'
    }
  ];

  onFavoriteChanged(videoTitle: string, isFavorite: boolean): void {
    const message = isFavorite 
      ? `تم إضافة "${videoTitle}" للمفضلة`
      : `تم حذف "${videoTitle}" من المفضلة`;
    
    this.addLogEntry(message);
  }

  onSeekRequested(timeInSeconds: number): void {
    this.currentTime = timeInSeconds;
    this.addLogEntry(`تم الانتقال إلى الوقت ${this.formatTime(timeInSeconds)}`);
  }

  onResumeRequested(): void {
    this.addLogEntry('تم طلب استئناف المشاهدة');
  }

  onRestartRequested(): void {
    this.currentTime = 0;
    this.addLogEntry('تم إعادة تشغيل الفيديو');
  }

  simulatePlay(): void {
    if (this.isSimulatorPlaying) {
      // إيقاف المحاكي
      this.isSimulatorPlaying = false;
      if (this.simulatorInterval) {
        clearInterval(this.simulatorInterval);
        this.simulatorInterval = undefined;
      }
      this.addLogEntry('تم إيقاف محاكي التشغيل');
    } else {
      // تشغيل المحاكي
      this.isSimulatorPlaying = true;
      this.simulatorInterval = setInterval(() => {
        this.currentTime += 1;
        if (this.currentTime >= 3600) { // توقف عند نهاية الفيديو
          this.simulatePlay(); // إيقاف المحاكي
        }
      }, 1000);
      this.addLogEntry('تم تشغيل محاكي التشغيل');
    }
  }

  resetSimulator(): void {
    this.currentTime = 0;
    if (this.isSimulatorPlaying) {
      this.simulatePlay(); // إيقاف إذا كان يعمل
    }
    this.addLogEntry('تم إعادة تعيين محاكي التشغيل');
  }

  playVideo(videoId: number): void {
    this.addLogEntry(`تم طلب تشغيل الفيديو رقم ${videoId}`);
    // هنا يمكن التوجيه لصفحة المشغل
    // this.router.navigate(['/watch', videoId]);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
  }

  trackByVideoId(index: number, video: any): number {
    return video.id;
  }

  trackByLogId(index: number, entry: any): number {
    return entry.id;
  }

  private addLogEntry(message: string): void {
    this.activityLog.unshift({
      id: this.logId++,
      time: new Date(),
      message: message
    });

    // حفظ آخر 10 إدخالات فقط
    if (this.activityLog.length > 10) {
      this.activityLog = this.activityLog.slice(0, 10);
    }
  }
}