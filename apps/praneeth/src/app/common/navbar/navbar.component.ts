import { interval, Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
	selectUserCartQty,
	selectUserLastLogIn,
} from '@shared-libs/shared-lib';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy, AfterViewInit {

  cartQty = 0;
  lastLogInAt: Date = new Date()

  constructor(private store: Store, private router: Router) {
    this.store.select(selectUserCartQty).subscribe((cartQty) => {
      this.cartQty = cartQty as number;
    })

    this.store.select(selectUserLastLogIn).subscribe((lastLogInAt) => {
      this.lastLogInAt = lastLogInAt as Date;
      console.log(this.lastLogInAt)
    })
  }

  timeAgo = '';
  private intervalSubscription!: Subscription;

  // ngOnInit(): void {
  //   this.updateTimeAgo();
  //   this.intervalSubscription = interval(60000).subscribe(() => {
  //     this.updateTimeAgo();
  //   });
  // }

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
  }

  onSearchBlur() {
    this.isSearching = false;
  }
}
