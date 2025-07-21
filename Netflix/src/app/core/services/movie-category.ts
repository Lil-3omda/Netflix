import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieCategory {
  constructor(private http: HttpClient) {}


   getTop10(): Observable<any[]> {
    return this.http.get<any[]>('https://api.example.com/movies/top10');
  }

  getMoviesByCategory(category: string): Observable<[]> {
    return this.http.get<[]>(`https://api.example.com/movies?category=${category}`);
  }
}
