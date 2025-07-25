import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FavoriteDto {
  id: number;
  videoId: number;
  videoTitle: string;
  videoDescription: string;
}

export interface AddFavoriteDto {
  profileId: number;
  videoId: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/favorite`;

  constructor(private http: HttpClient) { }

  // جلب المفضلة لملف شخصي معين
  getFavoritesByProfileId(profileId: number): Observable<FavoriteDto[]> {
    return this.http.get<FavoriteDto[]>(`${this.apiUrl}/profile/${profileId}`);
  }

  // إضافة فيديو للمفضلة
  addFavorite(dto: AddFavoriteDto): Observable<{message: string}> {
    return this.http.post<{message: string}>(this.apiUrl, dto);
  }

  // حذف فيديو من المفضلة
  removeFavorite(profileId: number, videoId: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/${profileId}/${videoId}`);
  }

  // التحقق من وجود فيديو في المفضلة
  isFavorite(profileId: number, videoId: number): Observable<boolean> {
    return new Observable(observer => {
      this.getFavoritesByProfileId(profileId).subscribe({
        next: (favorites) => {
          const found = favorites.some(fav => fav.videoId === videoId);
          observer.next(found);
          observer.complete();
        },
        error: (err) => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}