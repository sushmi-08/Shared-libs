import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectToken, userAction, userSelector } from '@shared-libs/shared-lib';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  token$: any;
  constructor(private store:Store, private router:Router,private authService:AuthService){
   
  }
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  ngOnInit(): void {
    this.token$=this.store.select(selectToken)

  }
  onSubmit(): void {
    if (this.email && this.password) {
  
      const credentials={email:this.email,password:this.password}
      this.store.dispatch(userAction.userLogin(credentials));
      // this.store.select(userSelector).subscribe(data=>{
    
      //   this.authService.login(data)

      // })
      
      // this.router.navigate(['/dashboard']);

      this.token$.pipe(
        tap(token => {
          if (token) {
            // If token is available, navigate to the home page
            this.router.navigate(['/dashboard']);
          }
        })
      ).subscribe();
    }
  }
}

