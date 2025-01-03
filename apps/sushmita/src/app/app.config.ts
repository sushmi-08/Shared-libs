import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { groceriesReducer} from '@shared-libs/shared-lib';
import { GroceriesEffects } from '@shared-libs/shared-lib';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({groceries: groceriesReducer}),
    provideEffects([GroceriesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

  ],
};
