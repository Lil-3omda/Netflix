import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Moviedetails {
  
  private baseUrl = 'https://localhost:7140/api/Videos/';
  constructor(private http: HttpClient) {}


  
 
  getmovieDetatils(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}${id}`);
  }

}
