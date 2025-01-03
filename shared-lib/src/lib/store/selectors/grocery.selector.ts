import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroceryState } from "../reducers/grocery.reducer";

export const grocerySelector = createFeatureSelector<GroceryState>('groceries');
export const selectGrocery = createSelector(grocerySelector,state => state.groceries)
