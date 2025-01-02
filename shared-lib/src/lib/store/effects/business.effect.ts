// libs/state/src/lib/effects/company.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BusinessService } from '../../services/business.service';
import { loadBusiness, loadBusinessFailure, loadBusinessSuccess } from '../actions/business.actions';

@Injectable()
export class BusinessEffects {
  constructor(
    private actions$: Actions,
    private businessService:BusinessService
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBusiness),
      switchMap(() =>
        this.businessService.getBusiness().pipe(
            
          map(business => loadBusinessSuccess({ business })),
          catchError(error => of(loadBusinessFailure({ error: error.message })))
        )
      )
    )
  );
}
