import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { take } from 'rxjs';
import { ConfigService } from './services/config.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxHttpErrorHandlerLibrary, NgxHttpErrorInterceptor } from 'ngx-http-error-handler-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
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
      useClass: NgxHttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: NgxHttpErrorHandlerLibrary,
    },
    provideAnimationsAsync(),
  ],
};
