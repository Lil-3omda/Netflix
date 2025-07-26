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
  path: 'category/:name',
  loadComponent: () =>
    import('./shared/category/category').then(m => m.Category)
},
{
  path: 'moviedetails/:id',
  loadComponent: () =>
    import('./pages/movive-detalis/movive-detalis').then(m => m.MoviveDetalis)
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
    // canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'content',
        loadComponent: () => import('./admin/pages/content-management/content-management.component').then(m => m.ContentManagementComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./admin/pages/user-management/user-management.component').then(m => m.UserManagementComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./admin/pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'chatbot',
        loadComponent: () => import('./admin/pages/chatbot/chatbot.component').then(m => m.ChatbotComponent)
      },
      {
        path: 'communications',
        loadComponent: () => import('./admin/pages/communications/communications.component').then(m => m.CommunicationsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./admin/pages/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'support',
    loadComponent: () => import('./features/communication/components/customer-support/customer-support.component').then(m => m.CustomerSupportComponent)
  },
  {
    path: 'admin/chat',
    loadComponent: () => import('./features/communication/components/admin-chat/admin-chat.component').then(m => m.AdminChatComponent),
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
