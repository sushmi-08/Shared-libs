import { User } from '../../models/user.model';
import { lastSignInAction, userAction } from './user.action';

describe('User Actions', () => {
  describe('userAction', () => {
    it('should create the User Login action with email and password', () => {
      const email = 'test@example.com';
      const password = 'password123';
      const action = userAction.userLogin({ email, password });

      expect(action).toEqual({
        type: '[User] User Login',
        email,
        password,
      });
    });

    it('should create the User Login Success action with a User object', () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        lastLogInAt: new Date(),
        password: '',
        boughtItems: [],
        cartItems: [],
        cartItemCount: 0
      };
      const action = userAction.userLoginSuccess({ user });

      expect(action).toEqual({
        type: '[User] User Login Success',
        user,
      });
    });

    it('should create the User Login Failure action with an error message', () => {
      const error = 'Invalid credentials';
      const action = userAction.userLoginFailure({ error });

      expect(action).toEqual({
        type: '[User] User Login Failure',
        error,
      });
    });

    it('should create the Token action with a token string', () => {
      const token = 'jwt-token-12345';
      const action = userAction.token({ token });

      expect(action).toEqual({
        type: '[User] Token',
        token,
      });
    });

    it('should create the Logout action with no payload', () => {
      const action = userAction.logout();

      expect(action).toEqual({
        type: '[User] Logout',
      });
    });
  });

  describe('lastSignInAction', () => {
    it('should create the Update Last Sign In action with a userId', () => {
      const userId = 'user-123';
      const action = lastSignInAction.updateLastSignIn({ userId });

      expect(action).toEqual({
        type: '[User] Update Last Sign In',
        userId,
      });
    });

    it('should create the Update Last Sign In Success action with a User object', () => {
      const user: User = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        lastLogInAt: new Date(),
        password: '',
        boughtItems: [],
        cartItems: [],
        cartItemCount: 0
      };
      const action = lastSignInAction.updateLastSignInSuccess({ user });

      expect(action).toEqual({
        type: '[User] Update Last Sign In Success',
        user,
      });
    });

    it('should create the Update Last Sign In Failure action with an error message', () => {
      const error = 'Failed to update last sign-in';
      const action = lastSignInAction.updateLastSignInFailure({ error });

      expect(action).toEqual({
        type: '[User] Update Last Sign In Failure',
        error,
      });
    });
  });
});
