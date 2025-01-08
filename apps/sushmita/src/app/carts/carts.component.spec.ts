import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CartsComponent } from './carts.component';
import { removeFromCart, selectCartItems, selectCartState } from '@shared-libs/shared-lib';
import { Grocery } from 'shared-lib/src/lib/models/grocery.model';

describe('CartsComponent', () => {
  let component: CartsComponent;
  let fixture: ComponentFixture<CartsComponent>;
  let store: MockStore;
  let router: Router;

  const mockCartItems: Grocery[] = [
    { id: 1, grocery_name: 'Apple', quantity: 2, image_url: 'apple.jpg' },
    { id: 2, grocery_name: 'Banana', quantity: 3, image_url: 'banana.jpg' },
  ];

  const mockCartState = {
    items: mockCartItems,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartsComponent],
      providers: [
        provideMockStore({
          initialState: { cart: mockCartState },
          selectors: [
            { selector: selectCartItems, value: mockCartItems },
            { selector: selectCartState, value: mockCartState },
          ],
        }),
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select groceries from the cart', (done) => {
    store.overrideSelector(selectCartItems, mockCartItems);
    component.groceries$.subscribe((groceries) => {
      expect(groceries).toEqual(mockCartItems);
      done();
    });
  });

  it('should dispatch removeFromCart action and log cart state', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const grocery = mockCartItems[0];

    component.removeFromCart(grocery);

    expect(dispatchSpy).toHaveBeenCalledWith(removeFromCart({ id: grocery.id }));
  });
});
