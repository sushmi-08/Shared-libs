import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   // Store the sales data as an observable (BehaviorSubject can hold the latest data)
   private salesDataSource = new BehaviorSubject<number[]>([1500, 2300, 1800, 2500, 3000, 3200]);
  
   // Observable to expose the data
   salesData$: Observable<number[]> = this.salesDataSource.asObservable();
   
   
   
   // Method to update sales data (useful for future updates from API)
   updateSalesData(newData: number[]): void {
     this.salesDataSource.next(newData);
   }

 
}
