import { createReducer, on } from '@ngrx/store';

import { userAction } from '../actions/user.action';

export interface SessionState {
  token: string | null;
  error: string | null;
}

const initialState: SessionState = {
  token: null,
  error: null
};

export const sessionReducer = createReducer(
  initialState,
  on(userAction.token, (state, { token }) => ({ ...state, token }))
)
