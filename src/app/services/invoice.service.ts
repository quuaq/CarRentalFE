import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InvoiceDetailDTO {
  invoice_ID: number;
  payment_ID: number;
  invoiceDate: string;
  totalAmount: number;

  user_ID: number;
  car_ID: number;
  carName: string;
  startDate: string;
  endDate: string;
  status: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'https://localhost:44321/api/Invoices';

  constructor(private http: HttpClient) {}

  getInvoiceDetail(paymentId: number): Observable<InvoiceDetailDTO> {
    return this.http.get<InvoiceDetailDTO>(`${this.apiUrl}/details/by-payment/${paymentId}`);
  }
  
  
  
}
