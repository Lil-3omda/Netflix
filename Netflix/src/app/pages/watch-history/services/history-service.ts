import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  baseUrl='https://localhost:7140/api/WatchHistory'

  getHistory():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Profile/${Number(localStorage.getItem('profileId'))}`);
  }

  addToHistory(reqBody):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`,reqBody);
  }
  
}
