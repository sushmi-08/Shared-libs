import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataService } from '../business-data.service';
import { Business } from '../model';
import { Router } from '@angular/router';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor( private businessService: BusinessDataService,private router:Router){}
  businessData?:Business
  ngOnInit(): void {

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
