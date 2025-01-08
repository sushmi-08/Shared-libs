// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
// import { RouterModule } from '@angular/router';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent, NxWelcomeComponent, RouterModule.forRoot([])],
//     }).compileComponents();
//   });


// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BusinessActions, userAction } from '@shared-libs/shared-lib';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let store: Store;
  let routerEventsMock: jest.Mock;

  beforeEach(async () => {
    // Mock Store
    const storeMock = {
      dispatch: jest.fn(),
    };

    // Mock Router events using jest.fn() to simulate event stream
    routerEventsMock = jest.fn();

    const routerMock = {
      events: routerEventsMock(),  // Use the mock function to return an observable
      url: '/home', // Default URL
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterModule, CommonModule,AppComponent, NxWelcomeComponent], // Include necessary modules
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isSpecialPage as false by default', () => {
    expect(component.isSpecialPage).toBe(false);
  });

  it('should update isSpecialPage based on route', () => {
    // Simulate NavigationEnd events
    routerEventsMock.mockReturnValueOnce(of(new NavigationEnd(0, '/insight', '/insight')));
    fixture.detectChanges();
    expect(component.isSpecialPage).toBe(true); // Should be true for '/insight'

    routerEventsMock.mockReturnValueOnce(of(new NavigationEnd(0, '/home', '/home')));
    fixture.detectChanges();
    expect(component.isSpecialPage).toBe(false); // Should be false for '/home'
  });

  it('should call logOut and dispatch actions when called', () => {
    component.logOut();

    // Verify the dispatch method is called for both actions
    expect(store.dispatch).toHaveBeenCalledWith(userAction.logout());
    expect(store.dispatch).toHaveBeenCalledWith(BusinessActions.emptyBusiness());

    // Verify the router navigate is called
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle login route as a special page', () => {
    // Simulate NavigationEnd event for '/login'
    routerEventsMock.mockReturnValueOnce(of(new NavigationEnd(0, '/login', '/login')));
    fixture.detectChanges();

    expect(component.isSpecialPage).toBe(true); // Should be true for '/login'
  });
});

