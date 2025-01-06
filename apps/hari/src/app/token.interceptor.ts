import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { filter, Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '@shared-libs/shared-lib';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store:Store){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
     return this.store.select(selectToken).pipe(
      // Wait until the token is available
      filter(token => token !== null),
      switchMap(token => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}` // Add the token to the Authorization header
          }
        });
        return next.handle(clonedRequest); // Pass the modified request to the next handler
      })
    );
}
}
