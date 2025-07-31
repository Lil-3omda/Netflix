import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Profile {
  id: number;
  name: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfileSubject = new BehaviorSubject<Profile | null>(null);
  private profilesSubject = new BehaviorSubject<Profile[]>([]);
  
  currentProfile$ = this.currentProfileSubject.asObservable();
  profiles$ = this.profilesSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/Profile`;

  constructor(private http: HttpClient) {
    this.loadCurrentProfile();
  }

  private loadCurrentProfile(): void {
    const profileId = localStorage.getItem('profileId');
    if (profileId) {
      this.getProfileById(parseInt(profileId)).subscribe({
        next: (profile) => {
          this.currentProfileSubject.next(profile);
        },
        error: () => {
          localStorage.removeItem('profileId');
          this.currentProfileSubject.next(null);
        }
      });
    }
  }

  getProfilesByUserId(userId: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profile/${userId}`);
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/id?id=${id}`);
  }

  setCurrentProfile(profile: Profile): void {
    localStorage.setItem('profileId', profile.id.toString());
    this.currentProfileSubject.next(profile);
  }

  getCurrentProfile(): Profile | null {
    return this.currentProfileSubject.value;
  }

  clearCurrentProfile(): void {
    localStorage.removeItem('profileId');
    this.currentProfileSubject.next(null);
  }

  loadUserProfiles(userId: string): void {
    this.getProfilesByUserId(userId).subscribe({
      next: (profiles) => {
        this.profilesSubject.next(profiles);
      },
      error: (error) => {
        console.error('Error loading profiles:', error);
        this.profilesSubject.next([]);
      }
    });
  }

  getUserProfiles(): Profile[] {
    return this.profilesSubject.value;
  }
}