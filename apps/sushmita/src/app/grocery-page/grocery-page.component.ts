import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Grocery } from 'shared-lib/src/lib/models/grocery.model';
import { Store } from '@ngrx/store';
import { loadGroceries, selectCurrentUser, selectGrocery, selectIsLoggedIn, userAction, userSelector } from '@shared-libs/shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery-page.component.html',
  styleUrl: './grocery-page.component.css',
})
export class GroceryPageComponent implements OnInit{
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

  ngOnInit(): void {
    
  }

}
