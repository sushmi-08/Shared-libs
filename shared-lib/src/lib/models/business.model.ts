export 
interface Business {
    id: number;
    name: string;
    industry: string;
    revenue: number;  // Total revenue of the business
    profit: number;   // Total profit of the business
    users: number;    // Total users across all subbrands
    subbrands: Subbrand[];  // List of subbrands under the business
  }
  export 
  interface Subbrand {
    id: number;
    name: string;            // Name of the subbrand
    industry: string;        // Industry of the subbrand (could differ from the main business)
    revenue: number;         // Revenue generated by this subbrand
    profit: number;          // Profit made by this subbrand
    users: number;           // Number of users for this subbrand
    market: string;          // Primary market (e.g., US, Europe, Asia)
    growthRate: number;      // Growth rate percentage for this subbrand
    insights: string;        // Insight about the subbrand
    products: Product[];     // List of products under this subbrand
    performanceMetrics: PerformanceMetrics;  // Performance-related data
  }
  export 
  interface PerformanceMetrics {
    quarterlyRevenue: number[];
    quarterlyProfit: number[];
    quarterlyUsers: number[];
    marketShare: number;  // Market share percentage in its industry or market
    customerSatisfaction: number;  // Customer satisfaction rating (scale 1-100)
  }
  export 
  interface Product {
    id: number;
    name: string;
    category: string;        // Product category (e.g., tech, clothing)
    revenue: number;         // Revenue generated by this product
    profit: number;          // Profit generated by this product
    users: number;           // Number of users for this product
    growthRate: number;      // Growth rate for this product
    productDetails: string;  // Additional details about the product
  }
        
  export 
interface User {
    id: number;
    name: string;
    email: string;
    password: string;  // Total revenue of the business
   business:Business  // List of subbrands under the business
  }