import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsightsComponent } from './insights/insights.component';

export const appRoutes: Route[] = [
    {path:"dashboard",component:DashboardComponent},
    { path: 'insights/:subbrand', component: InsightsComponent }
];
