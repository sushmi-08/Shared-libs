import { createReducer, on } from "@ngrx/store";
import { decrement, increment } from "../actions/counter.action";

const initialReducer = 0;
export const counterReducer = createReducer(initialReducer,
    on(increment, (state, action) => state + action.value),
    on(decrement, (state, action) => state - action.value)
    //action is the data attached to state
);