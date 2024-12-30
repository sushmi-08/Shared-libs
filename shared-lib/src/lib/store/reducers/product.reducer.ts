import { createReducer, on } from '@ngrx/store';

import { Product } from '../../models/product.model';
import { productAction } from '../actions/product.action';

export interface ProductState {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(productAction.loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(productAction.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false, error: null })),
  on(productAction.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
)
