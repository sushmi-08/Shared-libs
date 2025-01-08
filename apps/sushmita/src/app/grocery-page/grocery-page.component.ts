import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Grocery } from 'shared-lib/src/lib/models/grocery.model';
import { select, Store } from '@ngrx/store';
import { addToCart, loadGroceries, removeFromCart, selectCartState, selectCurrentUser, selectGrocery, selectIsLoggedIn, userAction, userSelector } from '@shared-libs/shared-lib';
import { Router } from '@angular/router';
import { CartItem } from 'shared-lib/src/lib/models/carts.model';
import { CartsComponent } from '../carts/carts.component';

@Component({
  selector: 'app-grocery-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery-page.component.html',
  styleUrl: './grocery-page.component.css',
})
export class GroceryPageComponent{
  groceries$: Observable<Grocery[]>;
  currentUser$: Observable<any>;
  isLoggedIn$: Observable<boolean>;
  

  constructor(private store: Store<{ groceries: Grocery[] }>, private router: Router) {
    this.store.dispatch(loadGroceries());
    this.groceries$ = this.store.select(selectGrocery);
    // this.store.select(userSelector).subscribe((item)=>{
    //   console.log(item);
    // } );
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
  logout(){
    //console.log('hi')
  this.store.dispatch(userAction.logout());
  this.router.navigate(['/'])
  }

  addToCart(grocery: Grocery) {
    const cartItem: CartItem = { ...grocery };
    this.store.dispatch(addToCart({ item: cartItem }));
    // this.store.select(selectCartState).subscribe((item)=>{
    //   console.log(item);
    // })
  }

  // removeFromCart(grocery: Grocery) {
  //   const cartItem: CartItem = { ...grocery };
  //   //console.log(cartItem);
  //   this.store.dispatch(removeFromCart({ id: cartItem.id }));
  //   // this.store.select(selectCartState).subscribe((item)=>{
  //   //   console.log(item);
  //   // });
  // }

  cartPage() {
    this.router.navigate(['/carts'])
  }

}
