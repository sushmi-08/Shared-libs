import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { User } from "../../models/user.model";
import { userAction } from "../actions/user-sush.action";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.userLogin),
      mergeMap(({ email, password }) =>
        this.http
          .get<User[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
          .pipe(
            map((users) => {
              if (users.length > 0) {
                return userAction.userLoginSuccess({  user: users[0] });
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