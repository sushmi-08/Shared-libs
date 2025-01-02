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
      switchMap(() =>
        this.http
          .get<Business>(`http://localhost:4000/business`)
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
  //   loadCompanies$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadBusiness),
//       switchMap(() =>
//         this.businessService.getBusiness().pipe(
            
//           map(business => loadBusinessSuccess({ business })),
//           catchError(error => of(loadBusinessFailure({ error: error.message })))
//         )
//       )
//     )
//   );


  
}
