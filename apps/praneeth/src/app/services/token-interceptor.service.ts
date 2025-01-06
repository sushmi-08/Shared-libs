import { Observable } from 'rxjs';

import {
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { UserService } from './user.service';

export const tokenInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const userService = inject(UserService);
  const token = userService.getToken();

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token || ''}`,
    },
  });

  return next(clonedReq);
};
