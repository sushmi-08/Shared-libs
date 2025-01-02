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
          "revenue":  43000000,
          "profit":11500000,
          "users": 1300000,
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
            },
            {
              "id": 3,
              "name": "NextGen Robotics",
              "industry": "Robotics & Automation",
              "revenue": 8000000,
              "profit": 2000000,
              "users": 50000,
              "market": "US",
              "growthRate": 25,
              "insights": "Leading the way in automation for manufacturing and logistics.",
              "products": [
                {
                  "id": 1,
                  "name": "NextGen Industrial Robot",
                  "category": "Robotics",
                  "revenue": 4000000,
                  "profit": 1000000,
                  "users": 25000,
                  "growthRate": 30,
                  "productDetails": "High precision industrial robots for assembly lines."
                },
                {
                  "id": 2,
                  "name": "NextGen Logistics Drone",
                  "category": "Robotics",
                  "revenue": 2500000,
                  "profit": 700000,
                  "users": 15000,
                  "growthRate": 20,
                  "productDetails": "Drones for warehouse management and delivery automation."
                },
                {
                  "id": 3,
                  "name": "NextGen Collaborative Robot",
                  "category": "Robotics",
                  "revenue": 1500000,
                  "profit": 200000,
                  "users": 5000,
                  "growthRate": 35,
                  "productDetails": "A robot designed for working alongside humans on assembly lines."
                }
              ],
              "performanceMetrics": {
                "quarterlyRevenue": [2000000, 2100000, 2200000, 2300000],
                "quarterlyProfit": [500000, 600000, 700000, 800000],
                "quarterlyUsers": [10000, 12000, 15000, 20000],
                "marketShare": 12,
                "customerSatisfaction": 85
              }
            },{
              "id": 4,
              "name": "Healthify",
              "industry": "Health & Wellness",
              "revenue": 3500000,
              "profit": 800000,
              "users": 300000,
              "market": "Europe",
              "growthRate": 18,
              "insights": "A leading platform for personalized health and fitness tracking.",
              "products": [
                {
                  "id": 1,
                  "name": "Healthify App",
                  "category": "Fitness",
                  "revenue": 1500000,
                  "profit": 400000,
                  "users": 150000,
                  "growthRate": 20,
                  "productDetails": "A mobile app that tracks fitness goals and health data."
                },
                {
                  "id": 2,
                  "name": "Healthify Wearables",
                  "category": "Fitness",
                  "revenue": 2000000,
                  "profit": 400000,
                  "users": 150000,
                  "growthRate": 15,
                  "productDetails": "Wearable devices that monitor health metrics such as heart rate and sleep."
                }
              ],
              "performanceMetrics": {
                "quarterlyRevenue": [800000, 850000, 900000, 950000],
                "quarterlyProfit": [150000, 180000, 200000, 220000],
                "quarterlyUsers": [70000, 80000, 90000, 120000],
                "marketShare": 5,
                "customerSatisfaction": 90
              }
            }
            ,{
              "id": 5,
              "name": "EcoWave",
              "industry": "Green Energy Solutions",
              "revenue": 10000000,
              "profit": 2500000,
              "users": 150000,
              "market": "Asia",
              "growthRate": 40,
              "insights": "Revolutionizing the energy sector with sustainable energy solutions.",
              "products": [
                {
                  "id": 1,
                  "name": "EcoWave Solar Panels",
                  "category": "Energy",
                  "revenue": 6000000,
                  "profit": 1500000,
                  "users": 90000,
                  "growthRate": 45,
                  "productDetails": "High-efficiency solar panels for residential and commercial use."
                },
                {
                  "id": 2,
                  "name": "EcoWave Wind Turbines",
                  "category": "Energy",
                  "revenue": 3000000,
                  "profit": 700000,
                  "users": 50000,
                  "growthRate": 30,
                  "productDetails": "Advanced wind turbines designed for both urban and rural energy production."
                },
                {
                  "id": 3,
                  "name": "EcoWave Smart Grid",
                  "category": "Energy",
                  "revenue": 1000000,
                  "profit": 100000,
                  "users": 20000,
                  "growthRate": 50,
                  "productDetails": "Smart grid technology to optimize energy usage across households and businesses."
                }
              ],
              "performanceMetrics": {
                "quarterlyRevenue": [2500000, 2700000, 3000000, 3200000],
                "quarterlyProfit": [600000, 700000, 800000, 900000],
                "quarterlyUsers": [40000, 50000, 60000, 80000],
                "marketShare": 18,
                "customerSatisfaction": 95
              }
            }
,{
  "id": 6,
  "name": "EduMaster",
  "industry": "Education Technology",
  "revenue": 4500000,
  "profit": 1200000,
  "users": 250000,
  "market": "Asia",
  "growthRate": 22,
  "insights": "A fast-growing platform that offers personalized learning solutions for students.",
  "products": [
    {
      "id": 1,
      "name": "EduMaster Learn",
      "category": "E-Learning",
      "revenue": 3000000,
      "profit": 800000,
      "users": 200000,
      "growthRate": 25,
      "productDetails": "A comprehensive e-learning platform for students in K-12 education."
    },
    {
      "id": 2,
      "name": "EduMaster Tutor",
      "category": "E-Learning",
      "revenue": 1500000,
      "profit": 400000,
      "users": 50000,
      "growthRate": 20,
      "productDetails": "AI-powered tutoring service offering personalized learning paths."
    }
  ],
  "performanceMetrics": {
    "quarterlyRevenue": [900000, 950000, 1000000, 1100000],
    "quarterlyProfit": [250000, 300000, 350000, 400000],
    "quarterlyUsers": [40000, 50000, 60000, 70000],
    "marketShare": 6,
    "customerSatisfaction": 92
  }
}
,
{
  "id": 7,
  "name": "SmartHomeX",
  "industry": "Smart Home Devices",
  "revenue": 7000000,
  "profit": 1200000,
  "users": 250000,
  "market": "North America",
  "growthRate": 28,
  "insights": "Expanding rapidly with advanced smart home products and integrations.",
  "products": [
    {
      "id": 1,
      "name": "SmartHomeX Hub",
      "category": "Smart Devices",
      "revenue": 4000000,
      "profit": 800000,
      "users": 150000,
      "growthRate": 30,
      "productDetails": "A central hub to control and automate all your smart home devices."
    },
    {
      "id": 2,
      "name": "SmartHomeX Lights",
      "category": "Smart Devices",
      "revenue": 2000000,
      "profit": 400000,
      "users": 80000,
      "growthRate": 25,
      "productDetails": "Smart lighting system with customizable colors and energy-saving features."
    },
    {
      "id": 3,
      "name": "SmartHomeX Thermostat",
      "category": "Smart Devices",
      "revenue": 1000000,
      "profit": 200000,
      "users": 50000,
      "growthRate": 35,
      "productDetails": "A smart thermostat that learns your preferences and saves energy."
    },
    {
      "id": 4,
      "name": "SmartHomeX Camera",
      "category": "Smart Devices",
      "revenue": 1000000,
      "profit": 200000,
      "users": 40000,
      "growthRate": 40,
      "productDetails": "High-definition security cameras with motion detection and remote access."
    }
  ],
  "performanceMetrics": {
    "quarterlyRevenue": [1500000, 1600000, 1700000, 1800000],
    "quarterlyProfit": [300000, 350000, 400000, 450000],
    "quarterlyUsers": [60000, 80000, 100000, 120000],
    "marketShare": 8,
    "customerSatisfaction": 90
  }
}


          ]


    }
    return of(data);
   }

}