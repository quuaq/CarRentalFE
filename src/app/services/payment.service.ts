import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentDTO {
  payment_ID?: number;
  reservation_ID: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://localhost:44321/api/payments';

  constructor(private http: HttpClient) {}

  createPayment(payment: PaymentDTO): Observable<PaymentDTO> {
    return this.http.post<PaymentDTO>(`${this.apiUrl}`, payment);
  }
}
