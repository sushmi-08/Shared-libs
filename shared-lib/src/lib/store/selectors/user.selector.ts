import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userSelector = createFeatureSelector<any>('user');
export const selectUser = createSelector(userSelector, (state: any) => state.user);
// export const selectBusiness = createSelector(userSelector, (state: any) => state.user.data.business);
export const selectToken = createSelector(userSelector, (state: any) => state.user.token);
