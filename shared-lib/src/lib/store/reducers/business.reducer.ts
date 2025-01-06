// libs/state/src/lib/reducers/company.reducer.ts
import { createReducer, on, State } from '@ngrx/store';


import { Business } from '../../models/business.model';
import { BusinessActions } from '../actions/business.actions';

export interface BusinessState {
  business: Business;
  loading: boolean;
  error: string | null;
}

export const initialState: BusinessState = {
  business: {
      id: 0,
      name: '',
      industry: '',
      revenue: 0,
      profit: 0,
      users: 0,
      subbrands: []
  },
  loading: false,
  error: null
};

export const businessReducer = createReducer(
  initialState,
  on(BusinessActions.loadBusiness, state => ({ ...state, loading: true })),
  on(BusinessActions.loadBusinessSuccess, (state, { business }) => ({
    ...state,
    loading: false,
    business
  })),
  on(BusinessActions.loadBusinessFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(BusinessActions.emptyBusiness,(state)=>({...state,business:{
      id: 0,
      name: '',
      industry: '',
      revenue: 0,
      profit: 0,
      users: 0,
      subbrands: []
  },error:null}))
);

// const initialState: ProductState = {
//     products: [],
//     loading: false,
//     error: null,
//   };
  
//   export const productReducer = createReducer(
//     initialState,
//     on(productAction.loadProducts, (state) => ({ ...state, loading: true, error: null })),
//     on(productAction.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false, error: null })),
//     on(productAction.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
//   )
