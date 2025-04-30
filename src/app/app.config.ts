import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { messageReducer, uploadReducer } from './store/message.reducer';
import { MessageEffects } from './store/message.effect';
import { environment } from '../environments/environment';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideStore({
      messages: messageReducer,
      upload: uploadReducer,
    }),
    provideEffects([MessageEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict to log-only mode in production
      autoPause: true, // Pause recording when the extension is not open
    }),
  ],
};
