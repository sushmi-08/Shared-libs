import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  lastSignInCheck = true;
  cartQty = signal<number>(0);

  signIn(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/login', data);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/getProducts');
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

}
