import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  // Dummy function to simulate authentication check
  isAuthenticated(): boolean {
    // You can check the user's authentication status here, for example:
    // - Check if a JWT token exists in localStorage
    // - Check if the user data exists in the session
    return !!localStorage.getItem('user');  // Assuming user data is saved in localStorage
  }

  // A simple method to log out the user
  logout(): void {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    ;
  }

  // A simple method to log in the user
  login(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }
}
