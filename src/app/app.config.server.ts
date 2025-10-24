import { mergeApplicationConfig, ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/services/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthStore } from './auth/store/auth.store';
import { ToDoStore } from './to-do/store/to-do.store';
import { TokenService } from './auth/services/token.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    AuthStore,
    ToDoStore,
    provideAppInitializer(() => {
      const tokens = inject(TokenService);
      tokens.rehydrateFromBrowser();
    }),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
