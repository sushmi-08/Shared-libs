import { take } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
	lastSignInAction,
	Product,
	productAction,
	selectProducts,
	selectProductsByCategory,
	selectUserCartQty,
	selectUserId,
} from '@shared-libs/shared-lib';

import { NavbarComponent } from '../../common/navbar/navbar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  userId: string | undefined = '';
  cartQty = 0;

  constructor(private store: Store, private router: Router, private service: UserService) {
    if (this.service.lastSignInCheck) {
      this.store.select(selectUserId).subscribe((userId) => {
      this.userId = userId as string;
      this.store.dispatch(lastSignInAction.updateLastSignIn({ userId: this.userId }));
      });
      this.service.lastSignInCheck = false;
    }

    this.store.select(selectUserCartQty).subscribe((cartQty) => {
      this.cartQty = cartQty as number;
    });

    setTimeout(() => {
      this.store.select(selectProducts).pipe(take(1)).subscribe((products) => {
        if (products?.length === 0) {
          this.store.dispatch(productAction.loadProducts());
        }
      });
    }, 2000)
  }

  showSidebar = false;
  isSearching = false;
  categories = ['Electronics', 'Footwear', 'Accessories', 'Home Appliances'];
  productsByCategory: { [key: string]: Product[] } = {};

  ngOnInit(): void {
    this.categories.forEach((category) => {
      this.store.select(selectProductsByCategory(category)).subscribe((products) =>
        (this.productsByCategory[category] = products));
    });
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onSearchFocus() {
    this.isSearching = true;
  }

  onSearchBlur() {
    this.isSearching = false;
  }

  onProductClick(id: string) {
    this.router.navigate(['/product', id]);
  }
}