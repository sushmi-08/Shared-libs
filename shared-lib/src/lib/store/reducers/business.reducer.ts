// libs/state/src/lib/reducers/company.reducer.ts
import { createReducer, on } from '@ngrx/store';


import { Business } from '../../models/business.model';
import { loadBusiness, loadBusinessFailure, loadBusinessSuccess } from '../actions/business.actions';

export interface BusinessState {
  Business: Business[];
  loading: boolean;
  error: string | null;
}

export const initialState: BusinessState = {
  Business: [],
  loading: false,
  error: null
};

export const businessReducer = createReducer(
  initialState,
  on(loadBusiness, state => ({ ...state, loading: true })),
  on(loadBusinessSuccess, (state, { business }) => ({
    ...state,
    loading: false,
    business
  })),
  on(loadBusinessFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
