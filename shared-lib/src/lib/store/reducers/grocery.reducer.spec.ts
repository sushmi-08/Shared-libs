import { groceriesReducer, initialState, GroceryState } from './grocery.reducer';
import { loadGroceriesSuccess, loadGroceriesFailure } from '../actions/grocery.action';
import { Grocery } from '../../models/grocery.model';

describe('groceriesReducer', () => {
  it('should return the initial state when an unknown action is passed', () => {
    const action = { type: 'Unknown' } as any;
    const state = groceriesReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should update the state with groceries on loadGroceriesSuccess', () => {
    const mockGroceries: Grocery[] = [
      { id: 1, grocery_name: 'Apple', quantity: 10, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
      { id: 2, grocery_name: 'Banana', quantity: 5, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
    ];
    const action = loadGroceriesSuccess({ groceries: mockGroceries });
    const expectedState: GroceryState = {
      groceries: mockGroceries,
    };

    const state = groceriesReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should return the same state on loadGroceriesFailure', () => {
    const action = loadGroceriesFailure();
    const state = groceriesReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
