import { userAction } from './user-sush.action'; // Adjust the import path
import { User } from '../../models/user.model';

describe('userAction', () => {
  it('should create a User Login action', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const action = userAction.userLogin({ email, password });

    expect(action).toEqual({
      type: '[User] User Login',
      email,
      password,
    });
  });

  it('should create a User Login Success action', () => {
    const user: User = { id: 1, name: 'Test User', email: 'test@example.com',password: 'passsword123' }; // Example User object
    const action = userAction.userLoginSuccess({ user });

    expect(action).toEqual({
      type: '[User] User Login Success',
      user,
    });
  });

  it('should create a User Login Failure action', () => {
    const error = 'Invalid credentials';
    const action = userAction.userLoginFailure({ error });

    expect(action).toEqual({
      type: '[User] User Login Failure',
      error,
    });
  });

  it('should create a Logout action', () => {
    const action = userAction.logout();

    expect(action).toEqual({
      type: '[User] Logout',
    });
  });
});
