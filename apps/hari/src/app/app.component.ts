import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { userAction } from '@shared-libs/shared-lib';


@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule,CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLoginPage=false
  constructor(private router:Router,private store:Store){}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if the current route is 'login'
      this.isLoginPage = this.router.url.includes('/login');
    });
  }
    logOut(){
      // this.authService.logout()
      this.store.dispatch(userAction.logout())
      this.router.navigate(['/'])
    }

}
