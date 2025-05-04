import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; 
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44321/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); 
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.nameid ? parseInt(decoded.nameid) : null;
    } catch (error) {
      console.error('Token çözümleme hatası:', error);
      return null;
    }
  }
  
  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
  
    try {
      const decoded: any = jwtDecode(token);  // düzeltildi
      return decoded.role && decoded.role === 'Admin';
    } catch (error) {
      console.error('Token çözümleme hatası:', error);
      return false;
    }
  }
  
  
  
}
