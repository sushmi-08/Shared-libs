import { Product } from '../../models/product.model';
import { productAction } from './product.action';

describe('Product Actions', () => {
  it('should create the Load Products action', () => {
    const action = productAction.loadProducts();
    expect(action).toEqual({
      type: '[Product] Load Products',
    });
  });

  it('should create the Load Products Success action with a product list', () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        imageUrl: 'https://example.com/product1.jpg',
        description: 'Description for Product 1',
        price: 100,
        category: 'Electronics',
      },
      {
        id: '2',
        name: 'Product 2',
        imageUrl: 'https://example.com/product2.jpg',
        description: 'Description for Product 2',
        price: 200,
        category: 'Books',
      },
    ];

    const action = productAction.loadProductsSuccess({ products });
    expect(action).toEqual({
      type: '[Product] Load Products Success',
      products,
    });
  });

  it('should create the Load Products Failure action with an error message', () => {
    const error = 'Failed to load products';
    const action = productAction.loadProductsFailure({ error });
    expect(action).toEqual({
      type: '[Product] Load Products Failure',
      error,
    });
  });
});
