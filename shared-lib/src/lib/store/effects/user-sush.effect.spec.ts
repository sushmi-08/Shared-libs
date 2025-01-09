import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthEffects } from './user-sush.effect'; // Adjust the path
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { userAction } from '../actions/user-sush.action';
import { User } from '../../models/user.model';
import { Actions } from '@ngrx/effects';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
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
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should dispatch userLoginSuccess when login API returns a valid user', (done) => {
    const mockUser: User = { id: 1, name: 'John Doe', email: 'test@example.com', password:'password123' };
    const mockResponse = [mockUser];
    const email = 'test@example.com';
    const password = 'password123';

    actions$ = of(userAction.userLogin({ email, password }));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(userAction.userLoginSuccess({ user: mockUser }));
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?email=${email}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should dispatch userLoginFailure when login API returns no user', (done) => {
    const email = 'invalid@example.com';
    const password = 'wrongpassword';

    actions$ = of(userAction.userLogin({ email, password }));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(userAction.userLoginFailure({ error: 'Invalid credentials' }));
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?email=${email}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should dispatch userLoginFailure when login API returns an error', (done) => {
    const email = 'test@example.com';
    const password = 'password123';

    actions$ = of(userAction.userLogin({ email, password }));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(userAction.userLoginFailure({ error: 'Server error' }));
      done();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?email=${email}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });
});
