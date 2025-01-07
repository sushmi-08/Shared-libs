// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { GroceryPageComponent } from './grocery-page.component';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { Grocery } from 'shared-lib/src/lib/models/grocery.model';

// describe('GroceryPageComponent', () => {
//   let component: GroceryPageComponent;
//   let fixture: ComponentFixture<GroceryPageComponent>;
//   let store: MockStore<{grocery: Grocery[]}>;
//   const mockGroceries: Grocery[] = [
//     {id: 1, grocery_name: "Apple", image_url:"", quantity: 10},
//     {id: 2, grocery_name: "Banana", image_url:"", quantity: 11}
// ];
// const initialState = {grocery: mockGroceries};

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [GroceryPageComponent],
//       providers: [
//       provideMockStore({ initialState }),
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(GroceryPageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     store = TestBed.inject(MockStore);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroceryPageComponent } from './grocery-page.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { loadGroceries, userAction } from '@shared-libs/shared-lib';

describe('GroceryPageComponent', () => {
  let component: GroceryPageComponent;
  let fixture: ComponentFixture<GroceryPageComponent>;
  let store: any;
  let router: Router;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn().mockImplementation((selector) => {
        switch (selector) {
          case 'selectGrocery':
            return of([{ id: 1, name: 'Milk', quantity: 2 }]);
          case 'selectCurrentUser':
            return of({ id: 1, name: 'John Doe' });
          case 'selectIsLoggedIn':
            return of(true);
          default:
            return of(null);
        }
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}), // Use an empty store
      GroceryPageComponent],
      providers: [{ provide: Store, useValue: store }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(GroceryPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGroceries on initialization', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadGroceries());
  });

  it('should select groceries, currentUser, and isLoggedIn from the store', () => {
    component.ngOnInit();
    component.groceries$.subscribe((groceries) => {
      expect(groceries).toEqual([{ id: 1, name: 'Milk', quantity: 2 }]);
    });
    component.currentUser$.subscribe((user) => {
      expect(user).toEqual({ id: 1, name: 'John Doe' });
    });
    component.isLoggedIn$.subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBe(true);
    });
  });

  it('should dispatch userAction.logout and navigate to home on logout', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.logout();
    expect(store.dispatch).toHaveBeenCalledWith(userAction.logout());
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
