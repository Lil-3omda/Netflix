import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServices } from '../../../services/admin-dashboard/dashboard-services';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../../../../shared/services/popup.service';

@Component({
  selector: 'app-movie-deatils',
  imports: [CommonModule,FormsModule],
  templateUrl: './movie-deatils.html',
  styleUrl: './movie-deatils.css'
})
export class AdminMovieDeatils implements OnInit {
  safeTrailerUrl!: SafeResourceUrl;
  videoUrl!: string;
  editing = false;
  movieDetails: any;
  id!:number;
  editMovie: any = {};
  categories: any[] = [];

 constructor(
   private route: ActivatedRoute,
   private dashboardService: DashboardServices,
   private sanitizer: DomSanitizer,
   private popupService: PopupService
 ) {}

 ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('Movie ID:', this.id);
  this.loadMovieDetails(this.id);
  this.loadCategories();

 }

loadCategories(): void {
  this.dashboardService.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
    },
    error: (err) => console.error(err)
  });
}

 loadMovieDetails(id:number): void {
  this.dashboardService.getMovieById(id).subscribe({
    next: data => {
      this.movieDetails = data;
      console.log('Movie Details:', data);
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieDetails.trailerUrl);
      // Handle the movie details here
    },
    error: err => {
      console.error('Error loading movie details:', err);
    }
  });
 }


oneditMovie(): void {
  this.editing = !this.editing;
  if (this.editing) {

    this.editMovie = {
     categoryId: this.movieDetails.categoryId,
      description: this.movieDetails.description,
      trailerUrl: this.movieDetails.trailerUrl,
    };
  }
}

saveChanges(): void {
  this.editing = false;
const updatedMovie = {
  description: this.editMovie.description,
  categoryId: this.editMovie.categoryId,
  trailerUrl: this.editMovie.trailerUrl,
};


  this.dashboardService.updateVideo(this.id, updatedMovie).subscribe({
    next: () => {
      console.log('Movie updated successfully');
      this.loadMovieDetails(this.id);
    },
    error: err => {
      console.error('Error updating movie:', err);
    }
  });
}

  cancelEdit(): void {
    this.editing = false;
    this.loadMovieDetails(this.id);
  }
  onDeleteMovie(): void {
    this.popupService.showConfirm(
      'Are you sure you want to delete this movie?',
      () => {
        this.dashboardService.softDeleteVideo(this.id).subscribe({
          next: () => {
            console.log('Movie deleted successfully');
            this.loadMovieDetails(this.id); // Reload movie details after deletion
            this.popupService.showSuccess('Movie deleted successfully');
          },
          error: err => {
            console.error('Error deleting movie:', err);
            this.popupService.showError('Failed to delete movie');
          }
        });
      },
      undefined,
      'Delete Movie'
    );
  }

  onRestoreMovie(): void {
    this.popupService.showConfirm(
      'Are you sure you want to restore this movie?',
      () => {
        this.dashboardService.restoreVideo(this.id).subscribe({
          next: () => {
            this.loadMovieDetails(this.id);
            console.log('Movie restored successfully');
            this.popupService.showSuccess('Movie restored successfully');
          },
          error: err => {
            console.error('Error restore movie:', err);
            this.popupService.showError('Failed to restore movie');
          }
        });
      },
      undefined,
      'Restore Movie'
    );
  }
}
