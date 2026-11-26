import { Routes } from '@angular/router';

export const routes: Routes = [
  // Landing Page
  {
    path: '',
    loadComponent: () =>
      import('./Componnents/landing-page/landing-page').then((m) => m.LandingPage),
    pathMatch: 'full',
  },

  // Auth
  {
    path: 'login',
    loadComponent: () => import('./Module/Auth/login/login').then((m) => m.Login),
  },
  {
    path: 'loginpanel',
    loadComponent: () => import('./Componnents/panel/panel').then((m) => m.Panel),
  },
  {    
    path: 'register',
    loadComponent: () => import('./Module/Auth/register/register').then((m) => m.Register),
  },

  // Admin Dashboard
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./Module/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./Module/admin-dashboard/overview/overview').then((m) => m.Overview),
      },
      {
        path: 'doctor',
        loadComponent: () => import('./Module/admin-dashboard/doctor/doctor').then((m) => m.Doctor),
      },
      {
        path: 'clinic',
        loadComponent: () => import('./Module/admin-dashboard/clinic/clinic').then((m) => m.Clinic),
      },
      {
        path: 'patient',
        loadComponent: () =>
          import('./Module/admin-dashboard/patient/patient').then((m) => m.Patient),
      },
      {
        path: 'dates',
        loadComponent: () => import('./Module/admin-dashboard/dates/dates').then((m) => m.Dates),
      },
      {
        path: 'consultants',
        loadComponent: () =>
          import('./Module/admin-dashboard/consultants/consultants').then((m) => m.Consultants),
      },
      {
        path: 'report',
        loadComponent: () => import('./Module/admin-dashboard/report/report').then((m) => m.Report),
      },
      {
        path: 'reception',
        loadComponent: () =>
          import('./Module/admin-dashboard/reception/reception').then((m) => m.Reception),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
