// libs/state/src/lib/effects/company.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BusinessActions } from '../actions/business.actions';
import { Business } from '../../models/business.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class BusinessEffects {
  constructor(
    private actions$: Actions,
    private http:HttpClient
  ) {}


  business$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessActions.loadBusiness),
      switchMap(({userId}) =>
        this.http
          .get<Business>(`http://localhost:3000/user/${userId}/business`)
          .pipe(
            map((business) => {
              if (business) {
                console.log("business",business)
                return BusinessActions.loadBusinessSuccess({business});
              } else {
                return BusinessActions.loadBusinessFailure({ error: 'Failed to load business' });
              }
            }),
            catchError(() => of(BusinessActions.loadBusinessFailure({ error: 'Server error' })))
          )
      )
    )
  );

  removeBusiness$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BusinessActions.removeBusiness),
      switchMap(({ userId,subbrandId }) =>
        this.http.post<any>(`http://localhost:3000/user/subbrand/delete`, {userId,subbrandId}).pipe(
          map((response) => {
            if (response) {
                console.log("response",response.response.business)
              return BusinessActions.removeBusinessSuccess({ business:response.response.business});
            } else {
              return BusinessActions.removeBusinessFailure({ error: 'Failed to remove business' });
            }
          }),
          catchError(() => of(BusinessActions.removeBusinessFailure({ error: 'Server error' })))
        )
      )
    )
  );


  
}
