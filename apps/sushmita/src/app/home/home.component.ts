import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(private store: Store, private router: Router, private elementRef: ElementRef){}


    email = '';
    password =  '';
    

  onSubmit() {
    console.log(this.email);
    this.store.dispatch(userAction.userLogin({ email: this.email, password: this.password }));
    this.router.navigate(['/grocery']);
  }

  
}
