// libs/state/src/lib/effects/company.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BusinessActions } from '../actions/business.actions';
import { Business, User } from '../../models/business.model';
import { HttpClient } from '@angular/common/http';
import { createActionGroup } from '@ngrx/store';
import { userAction } from '../actions/user.action';


@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private http:HttpClient
  ) {}


 
  
    // login$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(userAction.userLogin),
    //     switchMap(({ email, password }) =>
    //       this.http
    //         .get<User[]>(`http://localhost:4000/users?email=${email}&password=${password}`)
    //         .pipe(
    //           map((user) => {
    //             if (user) {
    //               return userAction.userLoginSuccess({ user: user[0] });
    //             } else {
    //               return userAction.userLoginFailure({ error: 'Invalid credentials' });
    //             }
    //           }),
    //           catchError(() => of(userAction.userLoginFailure({ error: 'Server error' })))
    //         )
    //     )
    //   )
    // );
    login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(userAction.userLogin),
        switchMap(({ email, password }) =>
          this.http
            .post<any>(`http://localhost:3000/auth/login`,{email,password})
            .pipe(
              map((user) => {

                if (user) {

                  return userAction.userLoginSuccess({ user: user.response});
                } else {
                  return userAction.userLoginFailure({ error: 'Invalid credentials' });
                }
              }),
              catchError(() => of(userAction.userLoginFailure({ error: 'Server error' })))
            )
        )
      )
    );
  

}
