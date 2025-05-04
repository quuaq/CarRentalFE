import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservationDTO {
  reservation_ID?: number;
  user_ID: number;
  car_ID: number;
  carName?: string; // ? işareti bunu opsiyonel yapar 
  startDate: string;
  endDate: string;
  totalPrice: number;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'https://localhost:44321/api/Reservation';

  constructor(private http: HttpClient) { }

  //  Yeni rezervasyon oluştur
  createReservation(reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.apiUrl, reservation);
  }

  //  Kullanıcıya ait rezervasyonları getir
  getReservationsByUser(userId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.apiUrl}/user/${userId}`);
  }

  //  Belirli rezervasyonu ID'ye göre getir 
  getReservation(id: number): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(`${this.apiUrl}/${id}`);
  }

  //  Rezervasyonu sil 
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  
  

}
