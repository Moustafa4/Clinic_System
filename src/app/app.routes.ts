import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Componnents/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./Module/Auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./Module/Auth/register/register').then((m) => m.Register),
  },

  {
    path: 'loginpanel',
    loadComponent: () => import('./Componnents/panel/panel').then((m) => m.Panel),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
