import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsightsComponent } from './insights/insights.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
    {path:'',component:LoginComponent},
    {path:"dashboard",component:DashboardComponent},
    { path: 'insights/:subbrand', component: InsightsComponent }
];
