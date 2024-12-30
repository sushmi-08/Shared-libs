import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product, selectProductById } from '@shared-libs/shared-lib';

import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  constructor(private store: Store, public router: Router, public activeRoute: ActivatedRoute) { }

  product: Product = {
    id: '',
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    category: ''
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      const id = params.get('id')
      this.store.select(selectProductById(id as string)).subscribe((product) => {
        if (product) { this.product = product }
      })
    })
  }

  addToCart(product: Product) {
    console.log('yoyo')
  }
}
