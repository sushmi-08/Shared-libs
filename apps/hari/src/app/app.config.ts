import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { NGX_ECHARTS_CONFIG, } from 'ngx-echarts';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import { BusinessEffects, businessReducer } from '@shared-libs/shared-lib';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
const ngxEchartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore({business: businessReducer}),
    provideEffects([BusinessEffects]),
    { provide: NGX_ECHARTS_CONFIG, useValue: ngxEchartsConfig }
],
};
