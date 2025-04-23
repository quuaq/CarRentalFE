import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getAvailableCars(startDateTime: string, endDateTime: string) {
    return this.http.get<any[]>(`https://localhost:44321/api/Cars/available?start=${startDateTime}&end=${endDateTime}`);
  }

}
