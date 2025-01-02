import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataService } from '../business-data.service';
import { Business } from '../model';
import { Router } from '@angular/router';
import {BusinessActions, selectBusiness} from '@shared-libs/shared-lib'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor( private businessService: BusinessDataService,private router:Router,private store:Store){}
  businessData?:Business
  business$?:Observable<Business>
  ngOnInit(): void {
    this.store.dispatch(BusinessActions.loadBusiness())
    this.business$ = this.store.select(selectBusiness)

 this.loadBusinessData()

  }
  loadBusinessData(): void {
    this.businessService.getBusinessData().subscribe(data => {
      this.businessData = data;
    });
  }
  showInsights(id:number){
    console.log(id)
    this.router.navigate([`/insights/${id}`])
  }

}
