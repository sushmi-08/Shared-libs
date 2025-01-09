import { Product } from '../../models/product.model';
import { ProductState } from '../reducers/product.reducer';
import {
	selectProductById,
	selectProductByName,
	selectProducts,
	selectProductsByCategory,
} from './product.selector';

describe('Product Selectors', () => {
  const initialState: ProductState = {
    products: [
      {
        id: '101',
        name: 'Smartphone',
        imageUrl: 'https://example.com/smartphone.jpg',
        description: 'A high-performance smartphone with 128GB storage.',
        price: 699,
        category: 'Electronics',
      },
      {
        id: '102',
        name: 'Laptop',
        imageUrl: 'https://example.com/laptop.jpg',
        description: 'A powerful laptop for work and gaming.',
        price: 1200,
        category: 'Electronics',
      },
      {
        id: '201',
        name: 'Running Shoes',
        imageUrl: 'https://example.com/runningshoes.jpg',
        description: 'Comfortable running shoes for all terrains.',
        price: 80,
        category: 'Footwear',
      },
    ],
    loading: false,
    error: null,
  };

  it('should select the list of products', () => {
    const result = selectProducts.projector(initialState);
    expect(result).toEqual(initialState.products);
  });

  it('should select a product by id', () => {
    const result = selectProductById('101').projector(initialState);
    expect(result).toEqual({
      id: '101',
      name: 'Smartphone',
      imageUrl: 'https://example.com/smartphone.jpg',
      description: 'A high-performance smartphone with 128GB storage.',
      price: 699,
      category: 'Electronics',
    });
  });

  it('should return undefined when product with the given id does not exist', () => {
    const result = selectProductById('999').projector(initialState);
    expect(result).toBeUndefined();
  });

  it('should select a product by name', () => {
    const result = selectProductByName('Laptop').projector(initialState);
    expect(result).toEqual({
      id: '102',
      name: 'Laptop',
      imageUrl: 'https://example.com/laptop.jpg',
      description: 'A powerful laptop for work and gaming.',
      price: 1200,
      category: 'Electronics',
    });
  });

  it('should return undefined when product with the given name does not exist', () => {
    const result = selectProductByName('Smartwatch').projector(initialState);
    expect(result).toBeUndefined();
  });

  it('should select products by category', () => {
    const result = selectProductsByCategory('Electronics').projector(initialState);
    expect(result).toEqual([
      {
        id: '101',
        name: 'Smartphone',
        imageUrl: 'https://example.com/smartphone.jpg',
        description: 'A high-performance smartphone with 128GB storage.',
        price: 699,
        category: 'Electronics',
      },
      {
        id: '102',
        name: 'Laptop',
        imageUrl: 'https://example.com/laptop.jpg',
        description: 'A powerful laptop for work and gaming.',
        price: 1200,
        category: 'Electronics',
      },
    ]);
  });

  it('should return an empty array when no products match the given category', () => {
    const result = selectProductsByCategory('Books').projector(initialState);
    expect(result).toEqual([]);
  });
});
