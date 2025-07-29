import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesPageComponent } from './features/favorites/pages/favorites-page/favorites-page.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: FavoritesPageComponent
    // Add canActivate: [AuthGuard] when you have authentication guard
  },
  // Add other routes here
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }