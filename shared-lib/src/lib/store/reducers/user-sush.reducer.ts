import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { userAction } from '../actions/user-sush.action';
import { initialAuthState } from '../../auth.state';





  

export const userReducer = createReducer(
        initialAuthState,
        on(userAction.userLogin, (state) => ({ ...state, error: null })),
        on(userAction.userLoginSuccess, (state, { user }) => ({ ...state, currentUser: user, isLoggedIn: true })),
        on(userAction.userLoginFailure, (state, { error }) => ({ ...state, error })),
        on(userAction.logout, (state) => initialAuthState),
)
