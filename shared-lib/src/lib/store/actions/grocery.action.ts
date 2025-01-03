import { createAction, props } from '@ngrx/store';
import { Grocery } from '../../models/grocery.model';

export const loadGroceries = createAction('[Grocery] Load Groceries');
export const loadGroceriesSuccess = createAction(
  '[Grocery] Load Groceries Success',
  props<{ groceries: Grocery[] }>()
);
export const loadGroceriesFailure = createAction('[Grocery] Load Groceries Failure');
