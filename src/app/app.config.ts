import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { take } from 'rxjs';
import { ConfigService } from './services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (config: ConfigService) => {
        return () => {
          config.fetchEndpoints();
          return config.api$.pipe(take(1));
        };
      },
      deps: [ConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
};
