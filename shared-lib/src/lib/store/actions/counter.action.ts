import { createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter]Increment', props<{value: number}>());
export const decrement = createAction('[Counter]Decrement', props<{value: number}>());
//props tells what kind of value is passed with increment
//export const decrement = createAction('[Counter]Decrement');