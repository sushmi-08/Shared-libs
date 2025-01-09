import { selectCurrentUser, selectIsLoggedIn, userSelector } from './user-sush.selector'; // Adjust the import path
import { AuthState } from '../../auth.state';

describe('User Selectors', () => {
  const mockAuthState: AuthState = {
    currentUser: { id: 1, name: 'Test User', email: 'test@example.com', password: 'password123' },
    isLoggedIn: true,
    token: null
  };

  it('should select the feature state for user', () => {
    const result = userSelector.projector(mockAuthState);
    expect(result).toEqual(mockAuthState);
  });

  it('should select the current user', () => {
    const result = selectCurrentUser.projector(mockAuthState);
    expect(result).toEqual(mockAuthState.currentUser);
  });

  it('should select the isLoggedIn status', () => {
    const result = selectIsLoggedIn.projector(mockAuthState);
    expect(result).toBe(true);
  });
});
