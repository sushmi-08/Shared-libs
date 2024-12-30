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
          .get<Product[]>(`http://localhost:3000/products`)
          .pipe(
            map((items) => {
              if (items.length > 0) {
                return productAction.loadProductsSuccess({products: items});
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
