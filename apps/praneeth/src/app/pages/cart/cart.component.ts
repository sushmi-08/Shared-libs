import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
	cartQtyActions,
	Item,
	Product,
	removeFromCartActions,
	selectProductById,
	selectUserCartItems,
	selectUserId,
} from '@shared-libs/shared-lib';

import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

  userId = '';
  cartItems: Item[] = [];

  constructor(private store: Store) {

    this.store.select(selectUserId).subscribe((userId) => {
      if (userId) { this.userId = userId };
    })

    this.store.select(selectUserCartItems).subscribe((cartItems) => {
      if (cartItems) {
        this.cartItems = cartItems
        console.log(this.cartItems)
      }
    })
  }

  getProductDetails(id: string) {
    let productDetails: Product = {
      id: '',
      name: '',
      imageUrl: '',
      description: '',
      price: 0,
      category: ''
    };
    this.store.select(selectProductById(id)).subscribe((item) => {
      productDetails = item as Product
    });

    return productDetails;
  }

  removeFromCart(id: string) {
    if (confirm("Do you want to remove this product from the cart?")) {
      this.store.dispatch(removeFromCartActions.removeFromCart({userId: this.userId, productId: id}))
      setTimeout(() => {
        this.store.dispatch(cartQtyActions.decrementCartQty({userId: this.userId}));
      }, 2000)
    }
  }

  buyItem(id: string) {
    console.log(id)
  }
}
