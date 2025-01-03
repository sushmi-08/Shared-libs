import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private store:Store, private router:Router){}
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  ngOnInit(): void {

  }
  onSubmit(): void {
    if (this.email && this.password) {
  
      const credentials={email:this.email,password:this.password}
      this.store.dispatch(userAction.userLogin(credentials));
      this.router.navigate(['/dashboard']);
    }
  }
}

