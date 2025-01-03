import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit(): void {
    if (this.email && this.password) {
      // Handle login logic here (e.g., call an API or store credentials)
      console.log('Login attempt with:', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });
    }
  }
}

