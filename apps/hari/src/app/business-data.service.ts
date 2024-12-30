import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {

  getBusinessData(): Observable<any> { 
    const data={
      
        
          "id": 1,
          "name": "Tech Solutions",
          "industry": "Technology",
          "revenue": 10000000,
          "profit": 2000000,
          "users": 500000,
          "subbrands": [
            {
              "id": 1,
              "name": "CloudX",
              "industry": "Cloud Tech",
              "revenue": 3000000,
              "profit": 500000,
              "users": 100000,
              "market": "US",
              "growthRate": 12,
              "insights": "Growing rapidly in the cloud space.",
              "products": [
                {
                  "id": 1,
                  "name": "CloudX Pro",
                  "category": "Tech",
                  "revenue": 1500000,
                  "profit": 250000,
                  "users": 50000,
                  "growthRate": 10,
                  "productDetails": "A premium cloud solution for enterprises."
                },
                {
                  "id": 2,
                  "name": "CloudX Basic",
                  "category": "Tech",
                  "revenue": 1500000,
                  "profit": 250000,
                  "users": 50000,
                  "growthRate": 15,
                  "productDetails": "A cost-effective cloud solution for startups."
                }
              ],
              "performanceMetrics": {
                "quarterlyRevenue": [750000, 800000, 850000, 900000],
                "quarterlyProfit": [125000, 130000, 140000, 150000],
                "quarterlyUsers": [20000, 25000, 30000, 35000],
                "marketShare": 15,
                "customerSatisfaction": 85
              }
            },
            {
              "id": 2,
              "name": "DataX",
              "industry": "Data Analytics",
              "revenue": 5000000,
              "profit": 1000000,
              "users": 150000,
              "market": "Europe",
              "growthRate": 20,
              "insights": "Expanding customer base steadily.",
              "products": [
                {
                  "id": 1,
                  "name": "DataX Insights",
                  "category": "Analytics",
                  "revenue": 2500000,
                  "profit": 500000,
                  "users": 80000,
                  "growthRate": 18,
                  "productDetails": "Advanced analytics platform for businesses."
                },
                {
                  "id": 2,
                  "name": "DataX Reports",
                  "category": "Analytics",
                  "revenue": 2500000,
                  "profit": 500000,
                  "users": 70000,
                  "growthRate": 22,
                  "productDetails": "Custom report generation tools for enterprises."
                }
              ],
              "performanceMetrics": {
                "quarterlyRevenue": [700000, 750000, 800000, 850000],
                "quarterlyProfit": [150000, 160000, 170000, 180000],
                "quarterlyUsers": [25000, 30000, 35000, 40000],
                "marketShare": 10,
                "customerSatisfaction": 90
              }
            }
          ]
        
      
    }
    return of(data);
   }
 
}
