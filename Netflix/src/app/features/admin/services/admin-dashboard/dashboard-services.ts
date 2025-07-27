import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServices {
  
  constructor(private http: HttpClient) {}
  getDashboardData() {
    return this.http.get<any>(`https://localhost:7140/api/AdminDashboard/statistics`);
  }

  getTop10Content() {
    return this.http.get<any>(`https://localhost:7140/api/Videos/TopViews?count=10`);
  }

  getMoviesStatistics() {
    return this.http.get<any>(`https://localhost:7140/api/AdminDashboard/movies/statistics`);
  }

  getCategoriesNames(){
    return this.http.get<any>(`https://localhost:7140/api/Category/names`);
  }

  getCategories() {
    return this.http.get<any>(`https://localhost:7140/api/Category`);
  }

  getAllMovies() {
    return this.http.get<any>(`https://localhost:7140/api/AdminDashboard/videos`);
  }

  getPublishedMovies() {
    return this.http.get<any>(`https://localhost:7140/api/Videos`);
  }

  getDeletedMovies() {
   return this.http.get<any>(`https://localhost:7140/api/AdminDashboard/deleted-videos`); 
  }

  uploadMovie(data: any): Observable<HttpEvent<any>> {
    return this.http.post<any>('https://localhost:7140/api/AdminDashboard/upload',data)
  }

  

}
