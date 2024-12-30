import { Route } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';

export const appRoutes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent}
];
