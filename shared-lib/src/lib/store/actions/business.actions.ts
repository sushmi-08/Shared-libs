
import { createAction, props } from '@ngrx/store';
import { Business } from '../../models/business.model';

export const loadBusiness = createAction('[Company API] Load Companies');

export const loadBusinessSuccess = createAction(
  '[Company API] Load Companies Success',
  props<{ business: Business[] }>()
);

export const loadBusinessFailure = createAction(
  '[Company API] Load Companies Failure',
  props<{ error: string }>()
);