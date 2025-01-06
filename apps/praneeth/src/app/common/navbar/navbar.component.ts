import {
	debounceTime,
	distinctUntilChanged,
	filter,
	interval,
	map,
	Observable,
	startWith,
	Subscription,
	switchMap,
} from 'rxjs';

import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
	Product,
	selectProducts,
	selectUserCartQty,
	selectUserLastLogIn,
} from '@shared-libs/shared-lib';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  lastLogInAt: Date = new Date()

  constructor(private store: Store, private router: Router, public service: UserService) {
    this.store.select(selectUserCartQty).subscribe((cartQty) => {
      this.service.cartQty.set(cartQty as number);
    })

    this.store.select(selectUserLastLogIn).subscribe((lastLogInAt) => {
      this.lastLogInAt = lastLogInAt as Date;
      console.log(this.lastLogInAt)
    })
  }

  timeAgo = '';
  private intervalSubscription!: Subscription;

  searchControl: FormControl = new FormControl('');
  filteredProducts$?: Observable<Product[] | undefined>;
  selectedIndex = -1;
  isDropdownOpen = false;

  ngOnInit(): void {
    this.filteredProducts$ = this.searchControl.valueChanges.pipe(
      startWith(''),  // Start with an empty string for no filter
      filter((value: string) => value.length >= 2),  // Only trigger after 2+ characters
      debounceTime(300),  // Wait for 300ms after the last keystroke
      distinctUntilChanged(),  // Ignore if the same search term is typed again
      switchMap((searchTerm) => this.getFilteredProducts(searchTerm))
    );
  }

  getFilteredProducts(searchTerm: string): Observable<Product[]> {
    return this.store.select(selectProducts).pipe(
      map((products) =>
        (products || []).filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
      startWith([]) // Ensures the observable starts with an empty array
    );
  }

  onProductSelect(product: Product): void {
    // console.log('Selected Product:', product);
    this.isDropdownOpen = false;
    this.router.navigate(['/product', product.id])
  }

  onEnterKeyPress(): void {
    if (this.selectedIndex >= 0) {
      this.filteredProducts$?.subscribe((products) => {
        const selectedProduct = products?.[this.selectedIndex];
        if (selectedProduct) {
          this.onProductSelect(selectedProduct); // Select the highlighted product
        }
      });
    }
  }

  onArrowDownKeyPress(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault(); // Prevent cursor from moving down
    this.filteredProducts$?.subscribe((products) => {
      if (products && products.length > 0) {
        this.selectedIndex = (this.selectedIndex + 1) % products.length; // Circular navigation
      }
    });
  }

  onArrowUpKeyPress(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault(); // Prevent cursor from moving up
    this.filteredProducts$?.subscribe((products) => {
      if (products && products.length > 0) {
        this.selectedIndex = (this.selectedIndex - 1 + products.length) % products.length; // Circular upwards navigation
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateTimeAgo();
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.updateTimeAgo();
    });
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  updateTimeAgo(): void {
    this.timeAgo = this.calculateTimeAgo(this.lastLogInAt);
  }

  calculateTimeAgo(lastLogin: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - lastLogin.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 1440) {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffMinutes / 1440);
      return `${diffDays} days ago`;
    }
  }

  showSidebar = false;
  isSearching = false;

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onSearchFocus() {
    this.isSearching = true;
    this.isDropdownOpen = true;
  }

  onSearchBlur() {
    this.isSearching = false;
    setTimeout(() => {
      this.isDropdownOpen = false; // Close after a slight delay to allow click events
    }, 200);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.isDropdownOpen = false; // Close the dropdown if the click is outside the search container
    }
  }
}
