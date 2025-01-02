import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent {

  constructor(private store:Store) {}

  increment() {
    this.store.dispatch(increment({value: 2}));
  }
  
  decrement() {
    this.store.dispatch(decrement({value: 2}));
  }
}
