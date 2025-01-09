import { TestBed } from '@angular/core/testing';
import { GroceriesEffects } from './grocery.effect';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { loadGroceries, loadGroceriesSuccess, loadGroceriesFailure } from '../actions/grocery.action';
import { Grocery } from '../../models/grocery.model';
import { HttpClient } from '@angular/common/http';

describe('GroceriesEffects', () => {
  let actions$: Actions;
  let effects: GroceriesEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // To mock HTTP requests
      providers: [
        GroceriesEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(GroceriesEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should dispatch loadGroceriesSuccess action when loadGroceries API call is successful', () => {
    const mockGroceries: Grocery[] = [{ id: 1, grocery_name: 'Apple', quantity: 10, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' }, 
    { id: 2, grocery_name: 'Banana', quantity: 5, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' }];
    const action = loadGroceries();
    const successAction = loadGroceriesSuccess({ groceries: mockGroceries });
    
    actions$ = of(action);

    effects.loadGroceries$.subscribe((result) => {
      expect(result).toEqual(successAction);
    });

    const req = httpMock.expectOne('http://localhost:3001/api/getGrocery');
    expect(req.request.method).toBe('GET');
    req.flush({ res: mockGroceries });
  });

  it('should dispatch loadGroceriesFailure action when loadGroceries API call fails', () => {
    const action = loadGroceries();
    const failureAction = loadGroceriesFailure();

    actions$ = of(action);

    effects.loadGroceries$.subscribe((result) => {
      expect(result).toEqual(failureAction);
    });

    const req = httpMock.expectOne('http://localhost:3001/api/getGrocery');
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 500, statusText: 'Server Error' });
  });

  afterEach(() => {
    httpMock.verify(); // Ensures that there are no outstanding HTTP requests
  });
});
