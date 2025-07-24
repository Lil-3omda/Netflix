import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieCategory {
  constructor(private http: HttpClient) {}

 private baseUrl = 'https://localhost:7140/api/Category';
  
 
 getTop10(): Observable<any[]> {
    return this.http.get<any[]>('https://api.example.com/movies/top10');
  }

  getMoviesByCategory(category: string): Observable<{ id: number, name: string, videos: any[] }> {
  return this.http.get<{ id: number, name: string, videos: any[] }>(`https://localhost:7140/api/Category/${category}`);
}

}
