import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getAllMovies() {
    return this.http.get<any>(`https://localhost:7140/api/Videos`);
  }
}
