import { createFeatureSelector, createSelector } from '@ngrx/store';
//import { UserState } from '../reducers/user-sush.reducer';
import { AuthState } from '../../auth.state';

export const userSelector = createFeatureSelector<AuthState>('user');
export const selectCurrentUser = createSelector(
    userSelector,
    (state: AuthState) => state.currentUser
  );
export const selectIsLoggedIn = createSelector(userSelector, (state: AuthState) => state.isLoggedIn);
