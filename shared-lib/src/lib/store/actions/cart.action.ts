import { createActionGroup, props } from '@ngrx/store';

export const cartQtyActions = createActionGroup({
  source: 'Cart Quantity',
  events: {
    'Increment Cart Qty': props<{ userId: string }>(),
    'Increment Cart Qty Success': props<{ cartItemCount: number }>(),
    'Increment Cart Qty Failure': props<{ error: string }>(),
    'Decrement Cart Qty': props<{ userId: string }>(),
    'Decrement Cart Qty Success': props<{ cartItemCount: number }>(),
    'Decrement Cart Qty Failure': props<{ error: string }>(),
  },
});

export const addToCartActions = createActionGroup({
  source: 'Add to Cart',
  events: {
    'Add to Cart': props<{ userId: string; productId: string; productName: string }>(),
    'Add to Cart Success': props<{ cartItems: Array<{ id: string; itemName: string; quantity: number }> }>(),
    'Add to Cart Failure': props<{ error: string }>(),
  },
});

export const removeFromCartActions = createActionGroup({
  source: 'Remove from Cart',
  events: {
    'Remove from Cart': props<{ userId: string; productId: string }>(),
    'Remove from Cart Success': props<{ cartItems: Array<{ id: string; itemName: string; quantity: number }> }>(),
    'Remove from Cart Failure': props<{ error: string }>(),
  },
});
