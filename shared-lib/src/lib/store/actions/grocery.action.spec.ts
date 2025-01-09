import * as GroceryActions from './grocery.action';
import { Grocery } from '../../models/grocery.model';

describe('Grocery Actions', () => {
  it('should create a Load Groceries action', () => {
    const action = GroceryActions.loadGroceries();
    expect(action).toEqual({
      type: '[Grocery] Load Groceries',
    });
  });

  it('should create a Load Groceries Success action with groceries payload', () => {
    const mockGroceries: Grocery[] = [
      { id: 1, grocery_name: 'Apple', quantity: 10, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
      { id: 2, grocery_name: 'Banana', quantity: 5, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
    ];

    const action = GroceryActions.loadGroceriesSuccess({ groceries: mockGroceries });
    expect(action).toEqual({
      type: '[Grocery] Load Groceries Success',
      groceries: mockGroceries,
    });
  });

  it('should create a Load Groceries Failure action', () => {
    const action = GroceryActions.loadGroceriesFailure();
    expect(action).toEqual({
      type: '[Grocery] Load Groceries Failure',
    });
  });
});
