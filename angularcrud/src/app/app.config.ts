import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from './store/reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffect } from './store/effects';
import { myinterceptorInterceptor } from './httpinterceptor/myinterceptor.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { adminReducer } from './store/admin/adminreducer';
import { AdminEffect } from './store/admin/admineffects';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({ userState: userReducer }),
    provideStore({ adminState:adminReducer }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(),withInterceptors([myinterceptorInterceptor])),
    provideEffects(UserEffect),
    provideEffects(AdminEffect),
    { provide: JWT_OPTIONS, useValue: { tokenGetter } },
    { provide: JwtHelperService, useClass: JwtHelperService }
  ],
};
