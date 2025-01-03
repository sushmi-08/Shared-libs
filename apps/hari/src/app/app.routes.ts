import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsightsComponent } from './insights/insights.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
    {path:'',component:LoginComponent},
    {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
    { path: 'insights/:subbrand', component: InsightsComponent ,canActivate:[AuthGuard]},
    {
        path: '**',
        redirectTo: ''
      }
];
