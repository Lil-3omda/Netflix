import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WatchProgress {
  id: number;
  profileId: number;
  videoId: number;
  currentTime: string; // TimeSpan as string (e.g., "00:15:30")
}

export interface CreateOrUpdateWatchProgress {
  profileId: number;
  videoId: number;
  currentTime: string; // TimeSpan as string
}

@Injectable({
  providedIn: 'root'
})
export class WatchProgressService {
  private apiUrl = `${environment.apiUrl}/WatchProgress`;

  constructor(private http: HttpClient) {}

  getProgress(profileId: number, videoId: number): Observable<WatchProgress> {
    return this.http.get<WatchProgress>(`${this.apiUrl}/${profileId}/${videoId}`);
  }

  updateProgress(progress: CreateOrUpdateWatchProgress): Observable<any> {
    return this.http.post<any>(this.apiUrl, progress);
  }

  // Helper method to convert seconds to TimeSpan string
  secondsToTimeSpan(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Helper method to convert TimeSpan string to seconds
  timeSpanToSeconds(timeSpan: string): number {
    const parts = timeSpan.split(':');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    const seconds = parseInt(parts[2]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  }
}