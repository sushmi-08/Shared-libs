import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@shared-libs/shared-lib';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private store:Store) { }


  isAuthenticated(): boolean {
    let user=false
    this.store.select(selectUser).subscribe(res=>{
        user=res.token?true:false
       })
    return user; 
  }

  // A simple method to log out the user
  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.router.navigate(['/'])
    ;
  }
 

  // A simple method to log in the user
  login(userData: any): void {
    localStorage.removeItem('token')

    localStorage.setItem('user', JSON.stringify(userData.user.data));
    localStorage.setItem('token', JSON.stringify(userData.user.token));
  }
}
