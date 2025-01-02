import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiUrl = 'http://localhost:3000/business';

  constructor(private http: HttpClient) {}

  getBusiness(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}