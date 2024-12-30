import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductState } from '../reducers/product.reducer';

export const productSelector = createFeatureSelector<ProductState>('products');
export const selectProducts = createSelector(productSelector, (state: ProductState) => state.products);
export const selectProductById = (id: string) => createSelector(
  productSelector, (state: ProductState) => state.products?.find(product => product.id === id)
);
export const selectProductByName = (name: string) => createSelector(
  productSelector, (state: ProductState) => state.products?.find(product => product.name === name)
);
export const selectProductsByCategory = (category: string) => createSelector(
  productSelector, (state: ProductState) => state.products?.filter(product => product.category === category) || []
);
