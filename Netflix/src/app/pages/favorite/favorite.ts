import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './favoriteservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.html',
  styleUrls: ['./favorite.css'],
  imports: [CommonModule]
})
export class FavoriteComponent implements OnInit {
 profileId: number = 0;
  favoriteVideos: any[] = [];

  constructor(private favoriteService: FavoriteService) {}



ngOnInit(): void {
  this.profileId = Number(localStorage.getItem('profileId')) || 0;
  this.loadFavorites();
}


  loadFavorites() {
     if (!this.profileId) return;

    this.favoriteService.getFavorites(this.profileId).subscribe(favs => {
      this.favoriteVideos = favs;
    });
  }

  removeFromFavorites(videoId: number) {
    this.favoriteService.removeFavorite(this.profileId, videoId).subscribe(() => {
      this.loadFavorites();
    });
  }
}
