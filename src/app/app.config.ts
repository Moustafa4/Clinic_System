import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { provideAngularSvgIcon } from 'angular-svg-icon';

import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideAngularSvgIcon(),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
      ripple: true,
      license:
        'eyJpZCI6ImY2MzBhNjJlLTZlMTUtNDYyYi1iZTk0LTcwMGRlZWZiZGY5OSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODUxNDg1NjgsImV4cCI6MTgxNjY4NDU2OH0.R71btZKUmWQPu2UkkUbd8Nf5qu5wxQ5jumRL-0nn4vw1ikW1o97hYZ0hEPxuPKkKUcoeHb_FvOvveEzfy_YnDQ',
    }),
  ],
};
