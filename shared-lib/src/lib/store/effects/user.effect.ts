import { catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { User } from '../../models/user.model';
import { lastSignInAction, userAction } from '../actions/user.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.userLogin),
      switchMap(({ email, password }) =>
        this.http
          .get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
          .pipe(
            map((users) => {
              if (users.length > 0) {
                return userAction.userLoginSuccess({ user: users[0] });
              } else {
                return userAction.userLoginFailure({ error: 'Invalid credentials' });
              }
            }),
            catchError(() => of(userAction.userLoginFailure({ error: 'Server error' })))
          )
      )
    )
  );

  updateLastSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lastSignInAction.updateLastSignIn),
      switchMap(({ userId }) => {
        const lastSignedInAt = new Date().toISOString();
        return this.http
          .patch<User>(`http://localhost:3000/users/${userId}`, { lastLogInAt: lastSignedInAt })
          .pipe(
            map((user) => lastSignInAction.updateLastSignInSuccess({ user })),
            catchError(() =>
              of(
                lastSignInAction.updateLastSignInFailure({
                  error: 'Failed to update last sign-in',
                })
              )
            )
          );
      })
    )
  );
}
