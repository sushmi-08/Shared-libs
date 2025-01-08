import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GroceryPageComponent } from './grocery-page.component';
import {
  loadGroceries,
  addToCart,
  removeFromCart,
  selectGrocery,
  selectCurrentUser,
  selectIsLoggedIn,
  userAction,
} from '@shared-libs/shared-lib';

describe('GroceryPageComponent', () => {
  let component: GroceryPageComponent;
  let fixture: ComponentFixture<GroceryPageComponent>;
  let store: MockStore;
  let router: Router;

  const mockGroceries = [
    { id: 1, grocery_name: 'Apple', quantity: 10, image_url: 'apple.jpg' },
    { id: 2, grocery_name: 'Banana', quantity: 15, image_url: 'banana.jpg' },
  ];

  const mockCartState = [
    { id: 1, grocery_name: 'Apple', quantity: 2, image_url: 'apple.jpg' },
  ];

  const mockCurrentUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

  const initialState = {
    groceries: mockGroceries,
    currentUser: mockCurrentUser,
    isLoggedIn: true,
    cart: mockCartState,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryPageComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(GroceryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGroceries on initialization', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch'); // Set up the spy first
    const fixture = TestBed.createComponent(GroceryPageComponent); // Create the component instance
    fixture.detectChanges(); // Trigger Angular's lifecycle methods
  
    expect(dispatchSpy).toHaveBeenCalledWith(loadGroceries()); // Verify dispatch
  });
  
  it('should select groceries from the store', (done) => {
    store.overrideSelector(selectGrocery, mockGroceries);
    component.groceries$.subscribe((groceries) => {
      expect(groceries).toEqual(mockGroceries);
      done();
    });
  });

  it('should add grocery to the cart and log cart state', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const grocery = mockGroceries[0];

    component.addToCart(grocery);

    expect(dispatchSpy).toHaveBeenCalledWith(addToCart({ item: grocery }));
  });

  
  it('should dispatch logout action and navigate to home page on logout', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.logout();

    expect(dispatchSpy).toHaveBeenCalledWith(userAction.logout());
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to cart page on cartPage method call', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.cartPage();

    expect(navigateSpy).toHaveBeenCalledWith(['/carts']);
  });
});
