import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(private store: Store, private router: Router, private elementRef: ElementRef, private service: UserService){}


    email = '';
    password =  '';
    

  onSubmit() {
    //console.log(this.email);
    this.service.signIn({email: this.email, password: this.password}).subscribe((response) => {
      if (response.result) {
        localStorage.setItem('token', response.token)
      }
    })
    
    this.store.dispatch(userAction.userLogin({ email: this.email, password: this.password }));
    this.router.navigate(['/grocery']);
  }

  
}
