import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BusinessState } from '../reducers/business.reducer';

export const selectBusinessState = createFeatureSelector<BusinessState>('business');

export const selectBusiness = createSelector(
  selectBusinessState,
  (state: BusinessState) => state.business  // Returning the single business object
);
