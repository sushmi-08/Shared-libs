
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Business } from '../../models/business.model';

// export const loadBusiness = createAction('[Company API] Load Companies');

// export const loadBusinessSuccess = createAction(
//   '[Company API] Load Companies Success',
//   props<{ business: Business[] }>()
// );

// export const loadBusinessFailure = createAction(
//   '[Company API] Load Companies Failure',
//   props<{ error: string }>()
// );
export const BusinessActions = createActionGroup({
    source: 'Business',
    events: {
      'Load Business': props<{userId:number}>(),
      'Load Business Success': props<{business: Business}>(),
      'Load Business Failure': props<{error: string}>(),
      'Empty Business':emptyProps(),
      'Remove Business': props<{userId:number, subbrandId: number }>(),
      'Remove Business Success': props<{business:any }>(),
      'Remove Business Failure': props<{ error: string }>(),
    },
  })