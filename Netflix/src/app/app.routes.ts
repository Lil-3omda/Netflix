import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then(m => m.SignupComponent)
  },
  {
    path: 'Home',
    loadComponent: () => import('./features/videos/home/home').then(m => m.Home)
  },
    {
    path: 'only-on-netflix',
    loadComponent: () => import('./features/Footer/only-on-netflix').then(m => m.OnlyOnNetflixComponent)
  },
    {
    path: 'account',
    loadComponent: () => import('./features/Footer/account').then(m => m.AccountComponent)
  },
    {
    path: 'corporate-information',
    loadComponent: () => import('./features/Footer/corporate-info').then(m => m.CorporateInfoComponent)
  },
    {
    path: 'ways-to-watch',
    loadComponent: () => import('./features/Footer/ways-to-watch').then(m => m.WaysToWatchComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/Footer/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'speed-test',
    loadComponent: () => import('./features/Footer/speed-test.component').then(m => m.SpeedTestComponent)
  },
  {
    path: 'browse',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
   {
    path: 'admin/dashboard',
    loadComponent: () => import('../app/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'admin/movies',
    loadComponent: () => import('../app/admin/movies/movies.component').then(m => m.MoviesComponent)
  },
  {
    path: 'admin/users',
    loadComponent: () => import('../app/admin/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'admin/chat',
    loadComponent: () => import('../app/admin/chat/chat.component').then(m => m.ChatComponent)
  },
  {
    path: 'admin/analytics',
    loadComponent: () => import('../app/admin/analytics/analytics.component').then(m => m.AnalyticsComponent)
  },
  {
    path: 'admin/settings',
    loadComponent: () => import('../app/admin/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }

];
