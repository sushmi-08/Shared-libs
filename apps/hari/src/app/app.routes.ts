import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsightsComponent } from './insights/insights.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SettingsComponent } from './settings/settings.component';

export const appRoutes: Route[] = [
    { path: 'login', component: LoginComponent },
    {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
    {path:"settings",component:SettingsComponent,canActivate:[AuthGuard]},
    { path: 'insights/:subbrand', component: InsightsComponent ,canActivate:[AuthGuard]},
    {
        path: '**',
        redirectTo: 'login'
      }
];
