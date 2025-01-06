import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/business.model';
import { userAction } from '../actions/user.action';

export interface UserState {
  user: {}|null;
  loading: boolean;
  error: string | null;
}
  
export const initialState: UserState = {
  user:{token:'',data:{}},
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(userAction.userLogin, (state) => ({ ...state, loading: true, error: null })),
  on(userAction.userLoginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(userAction.userLoginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(userAction.logout, (state) => ({ ...state, user: null, error: null })),
);