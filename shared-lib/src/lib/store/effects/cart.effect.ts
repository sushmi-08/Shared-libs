import { catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { User } from '../../models/user.model';
import {
	addToCartActions,
	cartQtyActions,
	removeFromCartActions,
} from '../actions/cart.action';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  incrementCartQty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartQtyActions.incrementCartQty),
      switchMap(({ userId }) =>
        this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
          switchMap((user) => {
            const updatedCount = (user.cartItemCount || 0) + 1;
            return this.http
              .patch(`http://localhost:3000/users/${userId}`, { cartItemCount: updatedCount })
              .pipe(
                map(() => cartQtyActions.incrementCartQtySuccess({ cartItemCount: updatedCount })),
                catchError(() => of(cartQtyActions.incrementCartQtyFailure({ error: 'Failed to increment cart quantity' })))
              );
          })
        )
      )
    )
  );

  decrementCartQty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartQtyActions.decrementCartQty),
      switchMap(({ userId }) =>
        this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
          switchMap((user) => {
            const updatedCount = Math.max((user.cartItemCount || 0) - 1, 0);
            return this.http
              .patch(`http://localhost:3000/users/${userId}`, { cartItemCount: updatedCount })
              .pipe(
                map(() => cartQtyActions.decrementCartQtySuccess({ cartItemCount: updatedCount })),
                catchError(() => of(cartQtyActions.decrementCartQtyFailure({ error: 'Failed to decrement cart quantity' })))
              );
          })
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCartActions.addToCart),
      switchMap(({ userId, productId, productName }) =>
        this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
          switchMap((user) => {
            const existingItem = user.cartItems.find((item) => item.id === productId);
            const updatedCartItems = existingItem
              ? user.cartItems.map((item) =>
                  item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...user.cartItems, { id: productId, itemName: productName, quantity: 1 }];

            return this.http
              .patch(`http://localhost:3000/users/${userId}`, { cartItems: updatedCartItems })
              .pipe(
                map(() => addToCartActions.addToCartSuccess({ cartItems: updatedCartItems })),
                catchError(() => of(addToCartActions.addToCartFailure({ error: 'Failed to add item to cart' })))
              );
          })
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromCartActions.removeFromCart),
      switchMap(({ userId, productId }) =>
        this.http.get<User>(`http://localhost:3000/users/${userId}`).pipe(
          switchMap((user) => {
            const updatedCartItems = user.cartItems
              .map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0);

            return this.http
              .patch(`http://localhost:3000/users/${userId}`, { cartItems: updatedCartItems })
              .pipe(
                map(() => removeFromCartActions.removeFromCartSuccess({ cartItems: updatedCartItems })),
                catchError(() => of(removeFromCartActions.removeFromCartFailure({ error: 'Failed to remove item from cart' })))
              );
          })
        )
      )
    )
  );

}
