import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageServices {

  constructor(private http:HttpClient){}

  getCategories(){
    return this.http.get<any>('https://localhost:7140/api/Category');
  }

  getPersonalizedHomepage(userId: string) {
    return this.http.get<any>(`https://localhost:7140/api/WatchHistory/PersonalizedHomepage/${userId}`);
  }

  getPersonalizedCategories(userId: string) {
    return this.http.get<any>(`https://localhost:7140/api/WatchHistory/PersonalizedCategories/${userId}`);
  }

  getSubscriptionExpirationStatus(userId: string) {
    return this.http.get<any>(`https://localhost:7140/api/Subscription/expiration-status/${userId}`);
  }
}
