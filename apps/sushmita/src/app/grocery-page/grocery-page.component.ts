import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Grocery } from 'shared-lib/src/lib/models/grocery.model';
import { Store } from '@ngrx/store';
import { loadGroceries, selectGrocery } from '@shared-libs/shared-lib';

@Component({
  selector: 'app-grocery-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery-page.component.html',
  styleUrl: './grocery-page.component.css',
})
export class GroceryPageComponent implements OnInit{
  groceries$: Observable<Grocery[]>;

  constructor(private store: Store<{ groceries: Grocery[] }>) {
    this.store.dispatch(loadGroceries());
    this.groceries$ = this.store.select(selectGrocery);
  }

  ngOnInit(): void {
    
  }

}
