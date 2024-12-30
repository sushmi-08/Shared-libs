import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user.model';
import { lastSignInAction, userAction } from '../actions/user.action';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userAction.userLogin, (state) => ({ ...state, loading: true, error: null })),
  on(userAction.userLoginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(userAction.userLoginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(userAction.logout, (state) => ({ ...state, user: null, error: null })),
  on(lastSignInAction.updateLastSignInSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(lastSignInAction.updateLastSignInFailure, (state, { error }) => ({...state, loading: false, error }))
);
