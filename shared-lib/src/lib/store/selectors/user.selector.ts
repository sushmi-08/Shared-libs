import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../reducers/user.reducer';

export const userSelector = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(userSelector, (state: UserState) => state.user);
export const selectUserId = createSelector(userSelector, (state: UserState) => state.user?.id);
export const selectUserLastLogIn = createSelector(userSelector, (state: UserState) => state.user?.lastLogInAt);
export const selectUserCartItems = createSelector(userSelector, (state: UserState) => state.user?.cartItems);
export const selectUserCartQty = createSelector(userSelector, (state: UserState) => state.user?.cartItemCount);
