// src/app/services/profiles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IProfile {
  id: number;
  name: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  private apiUrl = 'https://localhost:7140/api/Profile';

  constructor(private http: HttpClient) {}

  getProfiles(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(this.apiUrl);
  }


  getProfileById(id: number): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}/id?id=${id}`);
  }


  getProfilesByUserId(userId: string): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(`${this.apiUrl}/profile/${userId}`);
  }

  createProfile(profile: { name: string; userId: string }): Observable<IProfile> {
    return this.http.post<IProfile>(`${this.apiUrl}`, profile);
  }

  updateProfile(id: number, profile: { name: string; userId: number }): Observable<IProfile> {
    return this.http.put<IProfile>(`${this.apiUrl}/${id}`, profile);
  }

  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
