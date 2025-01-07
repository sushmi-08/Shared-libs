import { catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Product } from '../../models/product.model';
import { productAction } from '../actions/product.action';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  product$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productAction.loadProducts),
      switchMap(() =>
        this.http
          .get<any>(`http://localhost:3001/api/getProducts`)
          .pipe(
            map((items) => {
              if (items.products.length > 0) {
                return productAction.loadProductsSuccess({products: items.products});
              } else {
                return productAction.loadProductsFailure({ error: 'Failed to load products' });
              }
            }),
            catchError(() => of(productAction.loadProductsFailure({ error: 'Server error' })))
          )
      )
    )
  );
}
