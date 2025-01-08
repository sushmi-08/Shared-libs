import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BusinessDataService } from '../business-data.service';
import { Business, Subbrand } from '../model';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { EChartsOption } from 'echarts';
const ngxEchartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
};
@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule,NgxEchartsModule],
  providers: [
    { provide: NGX_ECHARTS_CONFIG, useValue: ngxEchartsConfig }
  ],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
})
export class InsightsComponent implements OnInit{

  subbrandId?: number;
  business: Business ={
    id: 0,
    name: '',
    industry: '',
    revenue: 0,
    profit: 0,
    users: 0,
    subbrands: []
  }
  subbrand:Subbrand={
    id: 0,
    name: '',
    industry: '',
    revenue: 0,
    profit: 0,
    users: 0,
    market: '',
    growthRate: 0,
    insights: '',
    products: [],
    performanceMetrics: {
      quarterlyRevenue: [],
      quarterlyProfit: [],
      quarterlyUsers: [],
      marketShare: 0,
      customerSatisfaction: 0
    }
  }
  displayedColumns: string[] = ['name', 'category', 'revenue', 'profit']
  revenueChartOptions: EChartsOption = {};
  profitChartOptions: EChartsOption = {};
  pieChartOptions: EChartsOption={}


  constructor( private route: ActivatedRoute,
    private businessService: BusinessDataService){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("params",params)
      this.subbrandId = +params['subbrand'];
    });
    this.loadSubbrandInsights();
    this.initializeCharts()
    this.preparePieChartData();



  }
  loadSubbrandInsights(): void {
    this.businessService.getBusinessData().subscribe(data => {
      console.log(data)
      console.log(this.subbrandId)
      this.subbrand = data.subbrands.find((subbrand: { id: number | undefined; }) => subbrand.id === this.subbrandId);
  console.log(this.subbrand)
    });

  }
  initializeCharts(): void {
    this.revenueChartOptions = {
      title: { text: 'Quarterly Revenue', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Revenue',
          type: 'line',
          data: this.subbrand?.performanceMetrics.quarterlyRevenue,
          smooth: true,
        },
      ],
    };

    this.profitChartOptions = {
      title: { text: 'Quarterly Profit', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Q1', 'Q2', 'Q3', 'Q4'],
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Profit',
          type: 'bar',
          data: this.subbrand?.performanceMetrics.quarterlyProfit,
        },
      ],
    };
  }
  preparePieChartData() {
    const productRevenues = this.subbrand?.products.map(product => product.revenue);
    const productNames = this.subbrand?.products.map(product => product.name);

    this.pieChartOptions = {
      title: {
        text: 'Revenue Distribution by Product',
        left: 'center',
        top: '20',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Product Revenue',
          type: 'pie',
          radius: ['40%', '70%'],
          data: this.subbrand?.products.map((product, index) => ({
            value: productRevenues?.[index],
            name: productNames?.[index]
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          color: ['#64518a', '#58bebf', '#e88b2e', '#1E90FF', '#8A2BE2']
        }
      ]
    };
  }
}
