import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Favorite, AddFavoriteDto, FavoriteResponse } from '../models/favorite.interface';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/Favorite`;
  private favoritesSubject = new BehaviorSubject<Favorite[]>([]);
  private favoriteVideoIdsSubject = new BehaviorSubject<Set<number>>(new Set());
  
  // Public observables
  favorites$ = this.favoritesSubject.asObservable();
  favoriteVideoIds$ = this.favoriteVideoIdsSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Get all favorites for a specific profile
   */
  getFavoritesByProfileId(profileId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.apiUrl}/profile/${profileId}`)
      .pipe(
        tap(favorites => {
          this.favoritesSubject.next(favorites);
          // Update the set of favorite video IDs for quick lookup
          const videoIds = new Set(favorites.map(f => f.videoId));
          this.favoriteVideoIdsSubject.next(videoIds);
        }),
        catchError(error => {
          console.error('Error fetching favorites:', error);
          throw error;
        })
      );
  }

  /**
   * Add a video to favorites
   */
  addToFavorites(profileId: number, videoId: number): Observable<FavoriteResponse> {
    const dto: AddFavoriteDto = { profileId, videoId };
    
    return this.http.post<FavoriteResponse>(this.apiUrl, dto)
      .pipe(
        tap(response => {
          // Update local state
          const currentFavorites = this.favoritesSubject.value;
          const newFavorite: Favorite = {
            id: Date.now(), // Temporary ID until we refresh from server
            profileId,
            videoId,
            addedAt: new Date()
          };
          this.favoritesSubject.next([...currentFavorites, newFavorite]);
          
          // Update favorite video IDs set
          const currentIds = this.favoriteVideoIdsSubject.value;
          currentIds.add(videoId);
          this.favoriteVideoIdsSubject.next(new Set(currentIds));
        }),
        catchError(error => {
          console.error('Error adding to favorites:', error);
          throw error;
        })
      );
  }

  /**
   * Remove a video from favorites
   */
  removeFromFavorites(profileId: number, videoId: number): Observable<FavoriteResponse> {
    return this.http.delete<FavoriteResponse>(`${this.apiUrl}/${profileId}/${videoId}`)
      .pipe(
        tap(response => {
          // Update local state
          const currentFavorites = this.favoritesSubject.value;
          const updatedFavorites = currentFavorites.filter(f => f.videoId !== videoId);
          this.favoritesSubject.next(updatedFavorites);
          
          // Update favorite video IDs set
          const currentIds = this.favoriteVideoIdsSubject.value;
          currentIds.delete(videoId);
          this.favoriteVideoIdsSubject.next(new Set(currentIds));
        }),
        catchError(error => {
          console.error('Error removing from favorites:', error);
          throw error;
        })
      );
  }

  /**
   * Check if a video is in favorites
   */
  isVideoFavorite(videoId: number): boolean {
    return this.favoriteVideoIdsSubject.value.has(videoId);
  }

  /**
   * Toggle favorite status for a video
   */
  toggleFavorite(profileId: number, videoId: number): Observable<FavoriteResponse> {
    if (this.isVideoFavorite(videoId)) {
      return this.removeFromFavorites(profileId, videoId);
    } else {
      return this.addToFavorites(profileId, videoId);
    }
  }

  /**
   * Get current favorites without making API call
   */
  getCurrentFavorites(): Favorite[] {
    return this.favoritesSubject.value;
  }

  /**
   * Clear favorites (useful for profile switching)
   */
  clearFavorites(): void {
    this.favoritesSubject.next([]);
    this.favoriteVideoIdsSubject.next(new Set());
  }

  /**
   * Refresh favorites from server
   */
  refreshFavorites(profileId: number): void {
    this.getFavoritesByProfileId(profileId).subscribe();
  }
}