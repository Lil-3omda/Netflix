import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NavBar } from './features/admin/shared/nav-bar/nav-bar';
import { AdminLayout } from './features/admin/components/admin-layout/admin-layout';
import { HomePage } from './features/admin/pages/home-page/home-page';
import { AdminMovies } from './features/admin/pages/admin-movies/admin-movies';
import { AddMovie } from './features/admin/pages/admin-movies/add-movie/add-movie';

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

    path: 'Profile',
    loadComponent: () => import('./features/profile/choose-profile/choose-profile').then(m => m.ChooseProfile)
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
        path: 'chatbot1',
        loadComponent: () => import('./features/communication/components/chatbot/chatbot.component').then(m => m.ChatbotComponent)
      },
      {
        path: 'support',
        loadComponent: () => import('./features/communication/components/admin-chat/admin-chat.component').then(m => m.AdminChatComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./admin/pages/settings/main-netflix-admain-settings/main-netflix-admain-settings').then(m => m.MainNetflixAdmainSettings)
      },

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
    path: 'AdminTest',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'Movies',
        component:AdminMovies
      },
      {
        path: 'movies/add',
        component:AddMovie
      }

    ]
  },
  {
    path: 'admin/movies',
    loadComponent: () => import('./features/admin/pages/admin-movies/admin-movies').then(m => m.AdminMovies)
  },
  {
    path: 'admin/Home-page',
    loadComponent: () => import('./features/admin/pages/home-page/home-page').then(m => m.HomePage)
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
