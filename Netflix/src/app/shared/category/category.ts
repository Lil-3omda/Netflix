import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../layout/navbar/navbar';
import { FavoriteService } from 'src/app/pages/favorite/favoriteservice';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Video } from 'lucide-angular';
import { HistoryService } from 'src/app/pages/watch-history/services/history-service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, Navbar, RouterLink ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category implements OnInit {
  categoryName: string = '';
  movies: any[] = [];
  id: number = 0;
  profileId: number | null =Number(localStorage.getItem('profileId'));
  moviesInFavList:any
  isLoadingProfile: boolean = false;
  watchedStatusMap: { [videoId: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private service: MovieCategory,
    private favoriteService: FavoriteService,
    private historyService: HistoryService
  ) {}

ngOnInit(): void {
  this.loadData();

  

}

loadData() {
  this.route.paramMap.subscribe(params => {
    const name = params.get('name');
    console.log('Category name:', name);

    this.movies = [];
    this.categoryName = '';

    if (name) {
      this.service.getMoviesByCategory(name).subscribe(data => {
        if (data && data.videos && data.videos.length > 0) {
          this.categoryName = data.name;
          this.movies = data.videos;
          this.id = +data.id;
          console.log(data);

          // ✅ Now load favorites AFTER movies are fetched
          this.loadFavorites();
          this.loadWatchedStatuses();
        } else {
          this.categoryName = 'No results found';
          this.movies = [];
        }
      }, err => {
        this.categoryName = 'Error loading category';
        this.movies = [];
      });
    }
  });
}


addToFav(videoId){
  this.favoriteService.addFavorite(this.profileId,videoId).subscribe(
    {
      next:data =>{
        console.log(data)
        this.loadData();
      },
      error: err=>{
        console.log(err)
      }
    }
  )
}

removeFav(videoId){
  this.favoriteService.removeFavorite(this.profileId,videoId).subscribe({
    next: data =>{
      console.log(data);
      this.loadData();
    },
    error: err =>{
      console.log(err);
    }
  })
}

loadFavorites(): void {


    this.favoriteService.getFavorites(this.profileId).subscribe({
      next: (favs) => {
        const favIds = favs.map(f => f.videoId);
        this.movies.forEach(movie => {
          movie.isFavorite = favIds.includes(movie.id);
          console.log(favIds)
        });
      },
      error: (err) => console.error('Error loading favorites:', err)
    });
}

async toggleFavorite(movie: any, event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Wait for profileId if still loading
    if (this.isLoadingProfile) {
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (!this.isLoadingProfile) {
            clearInterval(checkInterval);
            resolve(null);
          }
        }, 100);
      });
    }

    if (!this.profileId) {
      alert('Please select a profile first');
      return;
    }

    movie.isLoading = true;

    try {
      if (movie.isFavorite) {
        await this.favoriteService.removeFavorite(this.profileId, movie.id).toPromise();
      } else {
        await this.favoriteService.addFavorite(this.profileId, movie.id).toPromise();
      }
      movie.isFavorite = !movie.isFavorite;
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorite. Please try again.');
    } finally {
      movie.isLoading = false;
    }
  }
 
  
    checkWatched(videoId: number): void {
    const profileId = Number(localStorage.getItem('profileId'));

    this.historyService.isMovieWatched(profileId, videoId).subscribe({
      next: (watched: boolean) => {
        this.watchedStatusMap[videoId] = watched;
      },
      error: err => {
        console.error('Error checking watch status:', err);
        this.watchedStatusMap[videoId] = false;
      }
    });
  }

  loadWatchedStatuses() {
  this.movies.forEach(movie => this.checkWatched(movie.id));
  }

}