import { userReducer } from './user-sush.reducer'; // Adjust the import path
import { userAction } from '../actions/user-sush.action';
import { initialAuthState } from '../../auth.state';
import { User } from '../../models/user.model';

describe('User Reducer', () => {
  const mockUser: User = { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' };

  it('should return the initial state for an unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const state = userReducer(initialAuthState, action);
    expect(state).toEqual(initialAuthState);
  });

  it('should handle userLogin action', () => {
    const action = userAction.userLogin({ email: 'test@example.com', password: 'password123' });
    const state = userReducer(initialAuthState, action);
    expect(state).toEqual({ ...initialAuthState, error: null });
  });

  it('should handle userLoginSuccess action', () => {
    const action = userAction.userLoginSuccess({ user: mockUser });
    const state = userReducer(initialAuthState, action);
    expect(state).toEqual({
      ...initialAuthState,
      currentUser: mockUser,
      isLoggedIn: true,
    });
  });

  it('should handle userLoginFailure action', () => {
    const error = 'Invalid credentials';
    const action = userAction.userLoginFailure({ error });
    const state = userReducer(initialAuthState, action);
    expect(state).toEqual({
      ...initialAuthState,
      error,
    });
  });

  it('should handle logout action', () => {
    const modifiedState = {
      ...initialAuthState,
      currentUser: mockUser,
      isLoggedIn: true,
    };
    const action = userAction.logout();
    const state = userReducer(modifiedState, action);
    expect(state).toEqual(initialAuthState);
  });
});
