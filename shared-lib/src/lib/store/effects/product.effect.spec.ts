import { Observable, of } from 'rxjs';

import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { Product } from '../../models/product.model';
import { productAction } from '../actions/product.action';
import { ProductEffects } from './product.effect';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: Observable<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ProductEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('product$', () => {
    it('should dispatch loadProductsSuccess when products are loaded successfully', () => {
      const apiResponse = {
        result: true,
        products: [
          {
            id: '101',
            name: 'Smartphone',
            imageUrl: 'https://example.com/product1.jpg',
            description: 'A high-performance smartphone with 128GB storage.',
            price: 699,
            category: 'Electronics',
          },
          {
            id: '102',
            name: 'Laptop',
            imageUrl: 'https://example.com/product2.jpg',
            description: 'A powerful laptop for work and gaming.',
            price: 1200,
            category: 'Electronics',
          },
        ],
      };

      const products: Product[] = apiResponse.products;

      const action = productAction.loadProducts();
      const successAction = productAction.loadProductsSuccess({ products });

      actions$ = of(action);

      effects.product$.subscribe((result) => {
        expect(result).toEqual(successAction);
      });

      const req = httpMock.expectOne('http://localhost:3001/api/getProducts');
      expect(req.request.method).toBe('GET');
      req.flush(apiResponse); // Mocking the response
    });

    it('should dispatch loadProductsFailure when API returns an empty product list', () => {
      const apiResponse = {
        result: true,
        products: [],
      };

      const action = productAction.loadProducts();
      const failureAction = productAction.loadProductsFailure({ error: 'Failed to load products' });

      actions$ = of(action);

      effects.product$.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });

      const req = httpMock.expectOne('http://localhost:3001/api/getProducts');
      expect(req.request.method).toBe('GET');
      req.flush(apiResponse); // Empty product list in the response
    });

    it('should dispatch loadProductsFailure when there is a server error', () => {
      const action = productAction.loadProducts();
      const failureAction = productAction.loadProductsFailure({ error: 'Server error' });

      actions$ = of(action);

      effects.product$.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });

      const req = httpMock.expectOne('http://localhost:3001/api/getProducts');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network Error')); // Simulating a server error
    });
  });
});
