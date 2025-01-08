import { Observable, of } from 'rxjs';

import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { User } from '../../models/user.model';
import { lastSignInAction, userAction } from '../actions/user.action';
import { AuthEffects } from './user.effect';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Observable<any>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(AuthEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('login$', () => {
    it('should dispatch userLoginSuccess when credentials are correct', () => {
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
      const action = userAction.userLogin({ email: 'john@example.com', password: 'password123' });
      const successAction = userAction.userLoginSuccess({ user });

      // Emit the login action
      actions$ = of(action);

      effects.login$.subscribe((result) => {
        expect(result).toEqual(successAction);
      });

      const req = httpMock.expectOne(`http://localhost:3000/users?email=john@example.com&password=password123`);
      expect(req.request.method).toBe('GET');
      req.flush([user]); // Mocking the HTTP response
    });

    it('should dispatch userLoginFailure when credentials are invalid', () => {
      const action = userAction.userLogin({ email: 'wrong@example.com', password: 'wrongpassword' });
      const failureAction = userAction.userLoginFailure({ error: 'Invalid credentials' });

      // Emit the login action
      actions$ = of(action);

      effects.login$.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });

      const req = httpMock.expectOne(`http://localhost:3000/users?email=wrong@example.com&password=wrongpassword`);
      expect(req.request.method).toBe('GET');
      req.flush([]); // Empty response for invalid credentials
    });

    it('should dispatch userLoginFailure when there is a server error', () => {
      const action = userAction.userLogin({ email: 'john@example.com', password: 'password123' });
      const failureAction = userAction.userLoginFailure({ error: 'Server error' });

      actions$ = of(action);

      effects.login$.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });

      const req = httpMock.expectOne(`http://localhost:3000/users?email=john@example.com&password=password123`);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network Error')); // Simulate a server error
    });
  });

  describe('updateLastSignIn$', () => {
    it('should dispatch updateLastSignInSuccess when update is successful', () => {
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
      const action = lastSignInAction.updateLastSignIn({ userId: '1' });
      const successAction = lastSignInAction.updateLastSignInSuccess({ user });

      actions$ = of(action);

      effects.updateLastSignIn$.subscribe((result) => {
        expect(result).toEqual(successAction);
      });

      const req = httpMock.expectOne(`http://localhost:3000/users/1`);
      expect(req.request.method).toBe('PATCH');
      req.flush(user); // Mocking the response
    });

    it('should dispatch updateLastSignInFailure when update fails', () => {
      const action = lastSignInAction.updateLastSignIn({ userId: '1' });
      const failureAction = lastSignInAction.updateLastSignInFailure({ error: 'Failed to update last sign-in' });

      actions$ = of(action);

      effects.updateLastSignIn$.subscribe((result) => {
        expect(result).toEqual(failureAction);
      });

      const req = httpMock.expectOne(`http://localhost:3000/users/1`);
      expect(req.request.method).toBe('PATCH');
      req.error(new ErrorEvent('Update Failed')); // Simulate update failure
    });
  });
});
