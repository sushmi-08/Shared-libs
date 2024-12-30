import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BusinessDataService } from '../business-data.service';
import { Business, Subbrand } from '../model';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent implements OnInit{
  
  subbrandId?: number;
  business: Business | undefined;
  subbrand: Subbrand | undefined;
  constructor( private route: ActivatedRoute,
    private businessService: BusinessDataService){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subbrandId = +params['businessId'];
      this.loadSubbrandInsights();
    });
  }
  loadSubbrandInsights(): void {
    this.businessService.getBusinessData().subscribe(data => {
      console.log(data)
      this.subbrand = data.subbrands.find((subbrand: { id: number | undefined; }) => subbrand.id === this.subbrandId);
  console.log(this.subbrand)
    });
  }
}
