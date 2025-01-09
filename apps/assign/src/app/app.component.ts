import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  symbols = ['+', '-', '*', '/'];

  number1 = signal<number | null>(null);
  number2 = signal<number | null>(null);
  symbol = signal<string | null>(null);
  result = signal<number | null>(null);
  selectedNum = signal<number | null>(null);
  selectedSym = signal<string | null>(null);
  numFlag = true;
  symFlag = true;


  onSubmit() {
    this.numFlag = false;
    this.symFlag = false;
    const res = computed(() => {
      if (this.number1() === null || this.number2() === null) {
        return null;
      }

      switch (this.symbol()) {
        case '+':
          return (this.number1() as number) + (this.number2() as number);
        case '-':
          return (this.number1() as number) - (this.number2() as number);
        case '*':
          return (this.number1() as number) * (this.number2() as number);
        case '/':
          return Math.round(100 * (this.number1() as number) / (this.number2() as number)) / 100;
        default:
          return null;
      }
    });

    this.result.set(res());
  }

  selectNum(num: number) {
    this.selectedNum.set(num);
  }

  selectSym(sym: string) {
    this.selectedSym.set(sym);
  }

  onNumberClick(num: number) {
    this.numFlag = true;
    if (this.number1() === null) {
      this.number1.set(num);
    } else if (this.number2() === null) {
      this.number2.set(num);
    } else {
      this.number1.set(num);
      this.number2.set(null);
      this.result.set(null);
    }
  }

  onSymbolClick(symbol: string) {
    this.symbol.set(symbol);
  }

  onReset() {
    this.numFlag = false;
    this.symFlag = false;
    this.number1.set(null);
    this.number2.set(null);
    this.symbol.set(null);
    this.result.set(null);
  }
}
