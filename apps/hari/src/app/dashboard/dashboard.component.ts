import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js'; 
import { DataService } from '../../data.service';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { BusinessDataService } from '../business-data.service';
import { Business } from '../model';
import { Router } from '@angular/router';


const ngxEchartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
};


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NgxEchartsModule],
  providers: [
    { provide: NGX_ECHARTS_CONFIG, useValue: ngxEchartsConfig }
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor( private businessService: BusinessDataService,private router:Router){}
  businessData?:Business 
  // {
  //   id: 1,
  //   name: 'TechCo Global',
  //   industry: 'Technology',
  //   revenue: 2000000000,  // Total company revenue
  //   profit: 500000000,    // Total company profit
  //   users: 10000000,      // Total users
  //   subbrands: [
  //     {
  //       id: 1,
  //       name: 'Subbrand A',
  //       industry: 'Software',
  //       revenue: 500000000,
  //       profit: 100000000,
  //       users: 3000000,
  //       market: 'North America',
  //       growthRate: 15,
  //       insights: 'Strong growth in AI applications.',
  //       performanceMetrics: {
  //         quarterlyRevenue: [120000000, 130000000, 140000000, 150000000],
  //         quarterlyProfit: [30000000, 35000000, 38000000, 40000000],
  //         quarterlyUsers: [500000, 600000, 700000, 800000],
  //         marketShare: 25,
  //         customerSatisfaction: 85
  //       },
  //       products: [
  //         {
  //           id: 1,
  //           name: 'AI Software Suite',
  //           category: 'Software',
  //           revenue: 250000000,
  //           profit: 60000000,
  //           users: 1500000,
  //           growthRate: 20,
  //           productDetails: 'A comprehensive AI suite for enterprises.'
  //         },
  //         {
  //           id: 2,
  //           name: 'Data Analytics Tool',
  //           category: 'Software',
  //           revenue: 100000000,
  //           profit: 20000000,
  //           users: 1200000,
  //           growthRate: 18,
  //           productDetails: 'A powerful tool for data-driven insights.'
  //         }
  //       ]
  //     },
  //     {
  //       id: 2,
  //       name: 'Subbrand B',
  //       industry: 'Hardware',
  //       revenue: 700000000,
  //       profit: 150000000,
  //       users: 4000000,
  //       market: 'Europe',
  //       growthRate: 10,
  //       insights: 'Steady growth in the hardware sector.',
  //       performanceMetrics: {
  //         quarterlyRevenue: [150000000, 160000000, 170000000, 180000000],
  //         quarterlyProfit: [40000000, 45000000, 50000000, 55000000],
  //         quarterlyUsers: [800000, 900000, 1000000, 1100000],
  //         marketShare: 18,
  //         customerSatisfaction: 90
  //       },
  //       products: [
  //         {
  //           id: 1,
  //           name: 'Smartphone X',
  //           category: 'Hardware',
  //           revenue: 350000000,
  //           profit: 80000000,
  //           users: 2000000,
  //           growthRate: 12,
  //           productDetails: 'A premium smartphone with advanced AI capabilities.'
  //         },
  //         {
  //           id: 2,
  //           name: 'Smartwatch Pro',
  //           category: 'Hardware',
  //           revenue: 200000000,
  //           profit: 50000000,
  //           users: 1500000,
  //           growthRate: 8,
  //           productDetails: 'A high-performance smartwatch for fitness enthusiasts.'
  //         }
  //       ]
  //     }
  //   ]
  // };
  

  // subbrands = [
  //   { id: 1, name: 'Subbrand A', revenue: 500000, users: 1200, profit: 200000, insights: 'Growing well in Europe.' },
  //   { id: 2, name: 'Subbrand B', revenue: 800000, users: 1500, profit: 300000, insights: 'Expansion needed in Asia.' },
  //   { id: 3, name: 'Subbrand C', revenue: 300000, users: 800, profit: 100000, insights: 'Improvement required in marketing.' },
  // ];
  chartOptions={}
  

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