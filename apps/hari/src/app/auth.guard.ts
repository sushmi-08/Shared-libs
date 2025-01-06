import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { selectToken } from '@shared-libs/shared-lib';
  // Import your auth service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router,private store:Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean { 
    return this.store.select(selectToken).pipe(
      map((token: any) => {
        if (token) {
          return true;  // Allow access if the token is present
        } else {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
          return false;
        }
      })
    );
    }
  }


