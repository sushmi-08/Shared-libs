import { GroceryState } from '../reducers/grocery.reducer';
import { grocerySelector, selectGrocery } from './grocery.selector';

describe('Grocery Selectors', () => {
  const initialState: GroceryState = {
    groceries: [
      { id: 1, grocery_name: 'Apple', quantity: 10, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
      { id: 2, grocery_name: 'Banana', quantity: 5, image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_Db0jJvWe6vYScLksI8qoM2WCeHfJnSBVw&s' },
    ],
  };

  it('grocerySelector should select the grocery state', () => {
    const mockState = {
      groceries: initialState,
    };

    const result = grocerySelector.projector(mockState.groceries);
    expect(result).toEqual(initialState);
  });

  it('selectGrocery should select the groceries array', () => {
    const result = selectGrocery.projector(initialState);
    expect(result).toEqual(initialState.groceries);
  });
});
