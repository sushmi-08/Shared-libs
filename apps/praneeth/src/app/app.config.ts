import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
	isDevMode,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
	AuthEffects,
	CartEffects,
	ProductEffects,
	productReducer,
	userReducer,
} from '@shared-libs/shared-lib';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore({user: userReducer, products: productReducer}),
    provideEffects([AuthEffects, ProductEffects, CartEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
