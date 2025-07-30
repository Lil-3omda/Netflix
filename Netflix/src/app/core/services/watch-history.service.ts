import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchHistoryService {
  private apiUrl = 'https://localhost:7140/api/WatchHistory';

  constructor(private http: HttpClient) {}

  addToHistory(profileId: number, videoId: number): Observable<any> {
    const payload = {
      profileId,
      videoId,
      watchedAt: new Date().toISOString()
    };

    return this.http.post(this.apiUrl, payload);
  }

  isMovieWatched(profileId: number, videoId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('profileId', profileId.toString())
      .set('videoId', videoId.toString());

    return this.http.get<boolean>(`${this.apiUrl}/isWatched`, { params });
  }
}
