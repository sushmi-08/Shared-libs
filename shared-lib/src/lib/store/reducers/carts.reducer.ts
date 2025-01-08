import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../../models/carts.model";
import { addToCart, removeFromCart } from "../actions/carts.action";

export interface CartState {
    items: CartItem[];
  }


export const initialStates: CartState = {
    items: [],
  };

export const cartReducer = createReducer(
    initialStates,
    on(addToCart, (state, { item }) => ({
      ...state,
      items: [...state.items, item],
    })),
    on(removeFromCart, (state, { id }) => ({
      ...state,
      items: state.items.filter((item) => item.id !== id),
    }))
  );