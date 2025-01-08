import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Grocery } from 'shared-lib/src/lib/models/grocery.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { removeFromCart, selectCartItems, selectCartState } from '@shared-libs/shared-lib';
import { CartItem } from 'shared-lib/src/lib/models/carts.model';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css',
})
export class CartsComponent {

  groceries$: Observable<Grocery[]>;

  constructor(private store: Store<{ groceries: Grocery[] }>, private router: Router){
    this.groceries$ = this.store.select(selectCartItems);
    // this.groceries$.subscribe((item) => {
    //   console.log(item)
    // })
  }

  removeFromCart(grocery: Grocery) {
      const cartItem: CartItem = { ...grocery };
      //console.log(cartItem);
      this.store.dispatch(removeFromCart({ id: cartItem.id }));
      // this.store.select(selectCartState).subscribe((item)=>{
      //   console.log(item);
      // });
    }



}
