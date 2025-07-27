import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/Paymob`;

  constructor(private http: HttpClient) {}

  initiatePayment(paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/initiate`, paymentData);
  }

  verifyPayment(transactionId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify/${transactionId}`, {});
  }

  getPaymentStatus(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${orderId}`);
  }
}
