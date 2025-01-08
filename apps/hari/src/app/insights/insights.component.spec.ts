// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { InsightsComponent } from './insights.component';

// describe('InsightsComponent', () => {
//   let component: InsightsComponent;
//   let fixture: ComponentFixture<InsightsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [InsightsComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(InsightsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightsComponent } from './insights.component';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BusinessDataService } from '../business-data.service';
import { Business, Subbrand } from '../model';
import { EChartsOption } from 'echarts';

// Mock services
const mockBusinessDataService = {
  getBusinessData: jest.fn(),
};

const mockActivatedRoute = {
  params: of({ subbrand: 1 }),  // Simulate route parameter
};

describe('InsightsComponent (Standalone)', () => {
  let component: InsightsComponent;
  let fixture: ComponentFixture<InsightsComponent>;
  let businessDataService: BusinessDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],  // Declare the standalone component
      imports: [CommonModule, NgxEchartsModule,InsightsComponent],  // Import necessary modules for standalone components
      providers: [
        { provide: BusinessDataService, useValue: mockBusinessDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InsightsComponent);
    component = fixture.componentInstance;
    businessDataService = TestBed.inject(BusinessDataService);
  });

  it('should create the InsightsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize subbrandId from the route', () => {
    component.ngOnInit();  // Manually trigger the OnInit lifecycle hook
    expect(component.subbrandId).toBe(1);
  });

  it('should load business data and assign subbrand', () => {
    const mockBusiness: Business = {
      id: 1,
      name: 'Test Business',
      industry: 'Tech',
      revenue: 1000000,
      profit: 500000,
      users: 100,
      subbrands: [
        {
          id: 1,
          name: 'Subbrand 1',
          industry: 'Tech',
          revenue: 500000,
          profit: 250000,
          users: 50,
          market: 'US',
          growthRate: 5,
          insights: 'Positive growth',
          products: [],
          performanceMetrics: {
            quarterlyRevenue: [10000, 15000, 20000, 25000],
            quarterlyProfit: [5000, 7500, 10000, 12500],
            quarterlyUsers: [20, 30, 40, 50],
            marketShare: 10,
            customerSatisfaction: 85,
          },
        },
      ],
    };

    mockBusinessDataService.getBusinessData.mockReturnValue(of(mockBusiness));  // Mock the service response
    component.ngOnInit();  // Trigger ngOnInit which calls loadSubbrandInsights

    expect(component.subbrand).toEqual(mockBusiness.subbrands[0]);  // Check if subbrand is correctly assigned
  });

  it('should initialize revenue chart options', () => {
    const mockSubbrand: Subbrand = {
      id: 1,
      name: 'Subbrand 1',
      industry: 'Tech',
      revenue: 500000,
      profit: 250000,
      users: 50,
      market: 'US',
      growthRate: 5,
      insights: 'Positive growth',
      products: [],
      performanceMetrics: {
        quarterlyRevenue: [10000, 15000, 20000, 25000],
        quarterlyProfit: [5000, 7500, 10000, 12500],
        quarterlyUsers: [20, 30, 40, 50],
        marketShare: 10,
        customerSatisfaction: 85,
      },
    };

    // Simulate that business data is fetched and subbrand is set
    component.subbrand = mockSubbrand;
    component.initializeCharts();  // Initialize charts manually

    // Test the revenue chart options
    expect(component.revenueChartOptions).toEqual({
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
          data: mockSubbrand.performanceMetrics.quarterlyRevenue,
          smooth: true,
        },
      ],
    });
  });

  it('should initialize profit chart options', () => {
    const mockSubbrand: Subbrand = {
      id: 1,
      name: 'Subbrand 1',
      industry: 'Tech',
      revenue: 500000,
      profit: 250000,
      users: 50,
      market: 'US',
      growthRate: 5,
      insights: 'Positive growth',
      products: [],
      performanceMetrics: {
        quarterlyRevenue: [10000, 15000, 20000, 25000],
        quarterlyProfit: [5000, 7500, 10000, 12500],
        quarterlyUsers: [20, 30, 40, 50],
        marketShare: 10,
        customerSatisfaction: 85,
      },
    };

    // Simulate that business data is fetched and subbrand is set
    component.subbrand = mockSubbrand;
    component.initializeCharts();  // Initialize charts manually

    // Test the profit chart options
    expect(component.profitChartOptions).toEqual({
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
          data: mockSubbrand.performanceMetrics.quarterlyProfit,
        },
      ],
    });
  });

  it('should prepare pie chart data correctly', () => {
    const mockSubbrand: Subbrand = {
      id: 1,
      name: 'Subbrand 1',
      industry: 'Tech',
      revenue: 500000,
      profit: 250000,
      users: 50,
      market: 'US',
      growthRate: 5,
      insights: 'Positive growth',
      products: [
        {
          name: 'Product 1', revenue: 10000,
          id: 0,
          category: '',
          profit: 0,
          users: 0,
          growthRate: 0,
          productDetails: ''
        },
        {
          name: 'Product 2', revenue: 20000,
          id: 0,
          category: '',
          profit: 0,
          users: 0,
          growthRate: 0,
          productDetails: ''
        },
        {
          name: 'Product 3', revenue: 30000,
          id: 0,
          category: '',
          profit: 0,
          users: 0,
          growthRate: 0,
          productDetails: ''
        },
      ],
      performanceMetrics: {
        quarterlyRevenue: [10000, 15000, 20000, 25000],
        quarterlyProfit: [5000, 7500, 10000, 12500],
        quarterlyUsers: [20, 30, 40, 50],
        marketShare: 10,
        customerSatisfaction: 85,
      },
    };

    // Simulate that business data is fetched and subbrand is set
    component.subbrand = mockSubbrand;
    component.preparePieChartData();  // Prepare pie chart data manually

    // Test the pie chart options
    expect(component.pieChartOptions).toEqual({
      title: {
        text: 'Revenue Distribution by Product',
        left: 'center',
        top: '20',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: 'Product Revenue',
          type: 'pie',
          radius: ['40%', '70%'],
          data: [
            { value: 10000, name: 'Product 1' },
            { value: 20000, name: 'Product 2' },
            { value: 30000, name: 'Product 3' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          color: ['#64518a', '#58bebf', '#e88b2e'],
        },
      ],
    });
  });
});



