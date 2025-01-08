// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [LoginComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { userAction } from '@shared-libs/shared-lib';
import { FormsModule } from '@angular/forms';

describe('LoginComponent (Standalone)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: any;
  let mockRouter: any;
  let mockAuthService: any;

  beforeEach(() => {
    mockStore = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of('fake-token'))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockAuthService = {
      login: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [
        LoginComponent,  // Import the standalone component
        FormsModule,     // Import FormsModule since LoginComponent uses it
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the userLogin action and navigate to /dashboard on form submit', () => {
    // Set up form values
    component.email = 'test@example.com';
    component.password = 'password123';

    // Spy on dispatch and navigate calls
    const credentials = { email: 'test@example.com', password: 'password123' };

    // Call onSubmit method (simulate form submission)
    component.onSubmit();

    // Check if dispatch was called with the correct action
    expect(mockStore.dispatch).toHaveBeenCalledWith(userAction.userLogin(credentials));

    // Check if the router navigate method was called with the correct URL
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});




