import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { userAction } from '../actions/user-sush.action';


export interface UserState {
    user: User | null;
    error: string | null;
  }

  const initialState : UserState= {
    user: null,
    error: null

  }
  

export const userReducer = createReducer(
        initialState,
        on(userAction.userLogin, (state) => ({ ...state, error: null })),
        on(userAction.userLoginSuccess, (state, { user }) => ({ ...state, user, error: null })),
        on(userAction.userLoginFailure, (state, { error }) => ({ ...state, error })),
        on(userAction.logout, (state) => ({ ...state, user: null, error: null })),
)
