import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';

// Services
import { FavoriteService } from './services/favorite.service';

@NgModule({
  declarations: [
    FavoriteButtonComponent,
    FavoritesListComponent,
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    FavoriteButtonComponent,
    FavoritesListComponent,
    FavoritesPageComponent
  ],
  providers: [
    FavoriteService
  ]
})
export class FavoritesModule { }