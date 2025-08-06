import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieCategory {
  private baseUrl = 'https://localhost:7140/api/Videos';
   private apiUrl = 'https://localhost:7140/api/Category/names';
   private allMoviesUrl = 'https://localhost:7140/api/Videos';
  constructor(private http: HttpClient) {}


   getAllMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.allMoviesUrl}`);
  }
 
  getTopViewed(count: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/TopViews?count=${count}`);
  }

  getMoviesByCategory(category: string): Observable<{ id: number, name: string, videos: any[] }> {
  return this.http.get<{ id: number, name: string, videos: any[] }>(`https://localhost:7140/api/Category/${category}`);
}
getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);

}
}
