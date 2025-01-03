import { createReducer, on } from '@ngrx/store';
import { Grocery } from '../../models/grocery.model';
import { loadGroceriesFailure, loadGroceriesSuccess } from '../actions/grocery.action';

export interface GroceryState {
  groceries: Grocery[];
}

export const initialState: GroceryState = {
  groceries: [],
};

export const groceriesReducer = createReducer(
  initialState,
  on(loadGroceriesSuccess, (state, { groceries }) => ({ ...state, groceries })),
  on(loadGroceriesFailure, (state) => state )
);
