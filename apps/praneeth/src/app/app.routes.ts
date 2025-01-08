import { Route } from '@angular/router';

import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { authResolver } from './resolvers/auth.resolver';

export const appRoutes: Route[] = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent}
];
