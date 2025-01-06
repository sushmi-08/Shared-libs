import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token'); // 'authToken' is the key where the token is stored in localStorage

    // Clone the request and set the Authorization header with the token if it exists
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '' // Attach token if available
      }
    });

    // Pass the cloned request to the next handler in the chain
    return next.handle(clonedRequest);
  }
}
