import { Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { SubscriptionGuard } from './core/guards/subscription.guard';
import { NavBar } from './features/admin/shared/nav-bar/nav-bar';
import { AdminLayout } from './features/admin/components/admin-layout/admin-layout';
import { HomePage } from './features/admin/pages/home-page/home-page';
import { AdminMovies } from './features/admin/pages/admin-movies/all-movie/admin-movies';
import { PublishedMovies } from './features/admin/pages/admin-movies/published-movies/PublishedMovies';
import { DeletedMovies } from './features/admin/pages/admin-movies/Archived-movies/DeletedMovies';
import { AddMovie } from './features/admin/pages/admin-movies/add-movie/add-movie';
import { MoviesStatistics } from './features/admin/pages/admin-movies/movies-statistics/movies-statistics';
import { AdminMovieDeatils } from './features/admin/pages/admin-movies/movie-deatils/movie-deatils';

export const routes: Routes = [
  // Root redirect - check authentication and role
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [GuestGuard]
  },

  // Authentication routes (guests only)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    canActivate: [GuestGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then(m => m.SignupComponent),
    canActivate: [GuestGuard]
  },

  // User routes (authenticated users only)
  {
    path: 'Home',
    loadComponent: () => import('./features/videos/home/home').then(m => m.Home),
    canActivate: [AuthGuard, SubscriptionGuard]
  },
  {
    path: 'Profile',
    loadComponent: () => import('./features/profile/choose-profile/choose-profile').then(m => m.ChooseProfile),
    canActivate: [AuthGuard, SubscriptionGuard]
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account.component').then(m => m.AccountComponent),
    canActivate: [AuthGuard]
  },

  // Content routes
  {
    path: 'category/:name',
    loadComponent: () => import('./shared/category/category').then(m => m.Category),
    canActivate: [AuthGuard, SubscriptionGuard]
  },
  {
    path: 'moviedetails/:id',
    loadComponent: () => import('./pages/movive-detalis/movive-detalis').then(m => m.MoviveDetalis),
    canActivate: [AuthGuard, SubscriptionGuard]
  },
  {
    path: 'watchMovie/:id',
    loadComponent: () => import('./shared/watch-movie/watch-movie').then(m => m.WatchMovie),
    canActivate: [AuthGuard, SubscriptionGuard]
  },

  // Payment route
  {
    path: 'payment',
    loadComponent: () => import('./features/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [AuthGuard]
  },

  // Public information pages
  {
    path: 'only-on-netflix',
    loadComponent: () => import('./features/Footer/only-on-netflix').then(m => m.OnlyOnNetflixComponent)
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
    path: 'faccount',
    loadComponent: () => import('./features/Footer/account').then(m => m.AccountComponent)
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
    path: 'frequently-asked-questions',
    loadComponent: () => import('./features/Footer/faq').then(m => m.FaqComponent)
  },
  {
    path: 'investor-relations',
    loadComponent: () => import('./features/Footer/investor-relations').then(m => m.InvestorRelationsComponent)
  },
  {
    path: 'terms-of-use',
    loadComponent: () => import('./pages/customer-service-center/netflix-terms/netflix-terms').then(m => m.NetflixTerms)
  },
  {
    path: 'terms-of-use/netflix-terms',
    loadComponent: () => import('./pages/customer-service-center/netflix-terms/netflix-terms').then(m => m.NetflixTerms)
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./pages/netflix-contact/netflix-contact').then(m => m.NetflixContact)
  },

  // Support routes
  {
    path: 'support',
    loadComponent: () => import('./features/communication/components/customer-support/customer-support.component').then(m => m.CustomerSupportComponent),
    canActivate: [AuthGuard]
  },

  // Admin Section (admin users only)
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./features/admin/pages/home-page/home-page').then(m => m.HomePage) },
      { path: 'content', loadComponent: () => import('./admin/pages/content-management/content-management.component').then(m => m.ContentManagementComponent) },
      { path: 'users', loadComponent: () => import('./admin/pages/user-management/user-management.component').then(m => m.UserManagementComponent) },
      // { path: 'analytics', loadComponent: () => import('./admin/pages/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      // { path: 'chatbot', loadComponent: () => import('./admin/pages/chatbot/chatbot.component').then(m => m.ChatbotComponent) },
      { path: 'chatbot', loadComponent: () => import('./features/communication/components/chatbot/chatbot.component').then(m => m.ChatbotComponent) },
      { path: 'support', loadComponent: () => import('./features/communication/components/admin-chat/admin-chat.component').then(m => m.AdminChatComponent) },
      { path: 'settings', loadComponent: () => import('./admin/pages/settings/main-netflix-admain-settings/main-netflix-admain-settings').then(m => m.MainNetflixAdmainSettings) },
      { path: 'categories', loadComponent: () => import('./admin/pages/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'Subscriptions', loadComponent: () => import('./admin/pages/subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent) },

      // Nested Movies Section
      {
        path: 'movies',
        component: MoviesStatistics,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: AdminMovies },
          { path: 'published', component: PublishedMovies },
          { path: 'archived', component: DeletedMovies },
          { path: 'add', component: AddMovie },
        ]
      },
      { path: 'moviedetails/:id', component: AdminMovieDeatils },
    ]
  },

  // Admin chat route
  {
    path: 'admin/chat',
    loadComponent: () => import('./features/communication/components/admin-chat/admin-chat.component').then(m => m.AdminChatComponent),
    canActivate: [AdminGuard]
  },

  // 404 Not Found - must be last
  {
    path: '404',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '/404'

  },
  {
  path: 'favorite',
  loadComponent: () => import('./pages/favorite/favorite').then(m => m.FavoriteComponent),
  canActivate: [AuthGuard, SubscriptionGuard]
}

];


