import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7140/api/Favorite';

  constructor(private http: HttpClient) {}

  getFavorites(profileId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profile/${profileId}`);
  }

  addFavorite(profileId: number, videoId: number): Observable<any> {
    return this.http.post(this.baseUrl, { profileId, videoId });
  }

  removeFavorite(profileId: number, videoId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${profileId}/${videoId}`);
  }
}
