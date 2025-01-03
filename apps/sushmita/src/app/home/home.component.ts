import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(private store: Store, private router: Router, private elementRef: ElementRef){}

  userCredentials: any = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.store.dispatch(userAction.userLogin(this.userCredentials));
    this.router.navigate(['/grocery']);
  }

  
}
