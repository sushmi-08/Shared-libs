import { Product } from '../../models/product.model';
import { productAction } from '../actions/product.action';
import { productReducer, ProductState } from './product.reducer';

describe('Product Reducer', () => {
  const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = productReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should set loading to true when loadProducts is dispatched', () => {
    const action = productAction.loadProducts();
    const state = productReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should update the state with products and set loading to false when loadProductsSuccess is dispatched', () => {
    const mockProducts: Product[] = [
      {
        id: '1', name: 'Product 1', price: 100,
        imageUrl: 'yoyo',
        description: 'yoyo',
        category: 'yoyo'
      },
      {
        id: '2', name: 'Product 2', price: 200,
        imageUrl: 'uouo',
        description: 'uouo',
        category: 'uouo'
      },
    ];

    const action = productAction.loadProductsSuccess({ products: mockProducts });
    const state = productReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      products: mockProducts,
      loading: false,
      error: null,
    });
  });

  it('should set the error message and loading to false when loadProductsFailure is dispatched', () => {
    const error = 'Failed to load products';
    const action = productAction.loadProductsFailure({ error });
    const state = productReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: error,
    });
  });
});
