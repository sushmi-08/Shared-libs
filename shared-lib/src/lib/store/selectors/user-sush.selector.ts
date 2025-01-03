import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user-sush.reducer';

export const userSelector = createFeatureSelector<any>('user');
export const selectUser = createSelector(userSelector, (state: UserState) => state.user);
