import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user.model';
import {
	addToCartActions,
	cartQtyActions,
	removeFromCartActions,
} from '../actions/cart.action';
import { lastSignInAction, userAction } from '../actions/user.action';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userAction.userLogin, (state) => ({ ...state, loading: true, error: null })),
  on(userAction.userLoginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(userAction.userLoginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(userAction.logout, (state) => ({ ...state, user: null, error: null })),
  on(lastSignInAction.updateLastSignInSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(lastSignInAction.updateLastSignInFailure, (state, { error }) => ({...state, loading: false, error })),
  on(cartQtyActions.incrementCartQtySuccess, (state, { cartItemCount }) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, cartItemCount };
    return { ...state, user: updatedUser };
  }),
  on(cartQtyActions.decrementCartQtySuccess, (state, { cartItemCount }) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, cartItemCount };
    return { ...state, user: updatedUser };
  }),
  // Add to cart actions
  on(addToCartActions.addToCartSuccess, (state, { cartItems }) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, cartItems, cartItemCount: cartItems.length };
    return { ...state, user: updatedUser };
  }),
  // Remove from cart actions
  on(removeFromCartActions.removeFromCartSuccess, (state, { cartItems }) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, cartItems, cartItemCount: cartItems.length };
    return { ...state, user: updatedUser };
  }),
  // Handle failures
  on(
    cartQtyActions.incrementCartQtyFailure,
    cartQtyActions.decrementCartQtyFailure,
    addToCartActions.addToCartFailure,
    removeFromCartActions.removeFromCartFailure,
    (state, { error }) => ({ ...state, loading: false, error })
  )
);
