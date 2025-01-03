import { Route } from '@angular/router';
import { GroceryPageComponent } from './grocery-page/grocery-page.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    {path: '', component: HomeComponent},
    {path: "grocery", component: GroceryPageComponent}
];
