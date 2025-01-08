import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../models/carts.model";

export const addToCart = createAction(
    '[Cart] Add to Cart',
    props<{ item: CartItem }>()
  );
  
  
  export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ id: number }>()
  );