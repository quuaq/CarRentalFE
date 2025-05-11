import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'https://localhost:44321/api/Cars';

  constructor(private http: HttpClient) {}

  getAvailableCars(startDateTime: string, endDateTime: string) {
    return this.http.get<any[]>(`${this.apiUrl}/available?start=${startDateTime}&end=${endDateTime}`);
  }

  getAllCars() {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}
