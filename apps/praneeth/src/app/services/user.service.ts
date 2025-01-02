import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  lastSignInCheck = true;
  cartQty = signal<number>(0);
}
