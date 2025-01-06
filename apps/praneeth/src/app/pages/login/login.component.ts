import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  constructor (private store: Store, private router: Router, private elementRef: ElementRef, public service: UserService) { }

  userCredentials: any = {
    email: '',
    password: '',
  };

  private vantaEffect: any;

  ngAfterViewInit(): void {
    this.vantaEffect = NET({
      el: this.elementRef.nativeElement.querySelector('#vanta-bg'),
      THREE: THREE,
      color: 0xcf2962,
      backgroundColor: 0x24453e,
      maxDistance: 20,
      spacing: 14,
      showDots: false,
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  isFormValid(): boolean {
    return this.userCredentials.email.length > 3 && this.userCredentials.password > 3;
  }

  onSubmit() {
    this.service.signIn(this.userCredentials).subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token);
    })
    
    this.store.dispatch(userAction.userLogin(this.userCredentials));
    this.router.navigate(['/home']);
  }

}
