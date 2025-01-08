import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadGroceries,
  loadGroceriesFailure,
  loadGroceriesSuccess,
//   loadGroceriesSuccess,
//   loadGroceriesFailure,
} from '../actions/grocery.action';
import { Grocery } from '../../models/grocery.model';

@Injectable()
export class GroceriesEffects {
  //private apiUrl = 'http://localhost:3001/groceries';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadGroceries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroceries),
      mergeMap(() =>
        this.http.get<any>(`http://localhost:3001/api/getGrocery`).pipe(
          map((items) => loadGroceriesSuccess({ groceries: items.res })),
          catchError(() => of(loadGroceriesFailure()))
        )
      )
    )
  );
}
