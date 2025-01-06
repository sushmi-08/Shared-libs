import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { NGX_ECHARTS_CONFIG, } from 'ngx-echarts';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { BusinessEffects, businessReducer, UserEffect } from '@shared-libs/shared-lib';
import { provideEffects } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from 'shared-lib/src/lib/store/reducers/user.reducer';
import { TokenInterceptor } from './token.interceptor';
const ngxEchartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({business: businessReducer,user:userReducer}),
    provideEffects([BusinessEffects,UserEffect]),
    { provide: NGX_ECHARTS_CONFIG, useValue: ngxEchartsConfig },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true  // This ensures multiple interceptors can be used in your app
    // },
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
],
};
