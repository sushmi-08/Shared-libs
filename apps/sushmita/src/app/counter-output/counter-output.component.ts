import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent {
  count$ : Observable<number>;

  constructor(private store:Store<{counter: number}>) {
    this.count$ = store.select('counter'); // counter is the key used in app.module.ts
  }

}
