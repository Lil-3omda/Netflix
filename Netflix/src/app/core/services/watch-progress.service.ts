import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WatchProgressDto {
  id: number;
  profileId: number;
  videoId: number;
  currentTime: string; // TimeSpan as string in format "HH:mm:ss"
}

export interface CreateOrUpdateWatchProgressDto {
  profileId: number;
  videoId: number;
  currentTime: string; // TimeSpan as string in format "HH:mm:ss"
}

@Injectable({
  providedIn: 'root'
})
export class WatchProgressService {
  private apiUrl = `${environment.apiUrl}/watchprogress`;

  constructor(private http: HttpClient) { }

  // جلب تقدم المشاهدة لفيديو معين
  getProgress(profileId: number, videoId: number): Observable<WatchProgressDto | null> {
    return this.http.get<WatchProgressDto>(`${this.apiUrl}/${profileId}/${videoId}`)
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            return of(null); // إرجاع null إذا لم يوجد تقدم
          }
          throw err;
        })
      );
  }

  // حفظ/تحديث تقدم المشاهدة
  updateProgress(dto: CreateOrUpdateWatchProgressDto): Observable<{message: string}> {
    return this.http.post<{message: string}>(this.apiUrl, dto);
  }

  // حفظ تقدم المشاهدة بالثواني
  updateProgressInSeconds(profileId: number, videoId: number, currentTimeInSeconds: number): Observable<{message: string}> {
    const hours = Math.floor(currentTimeInSeconds / 3600);
    const minutes = Math.floor((currentTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(currentTimeInSeconds % 60);
    
    const timeSpanString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const dto: CreateOrUpdateWatchProgressDto = {
      profileId,
      videoId,
      currentTime: timeSpanString
    };

    return this.updateProgress(dto);
  }

  // تحويل TimeSpan string إلى ثوانٍ
  timeSpanToSeconds(timeSpan: string): number {
    const parts = timeSpan.split(':');
    if (parts.length !== 3) return 0;
    
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;
    
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  // تحويل الثوانٍ إلى TimeSpan string
  secondsToTimeSpan(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // حساب النسبة المئوية لتقدم المشاهدة
  getProgressPercentage(currentTimeInSeconds: number, totalDurationInSeconds: number): number {
    if (totalDurationInSeconds <= 0) return 0;
    return Math.min(100, (currentTimeInSeconds / totalDurationInSeconds) * 100);
  }
}