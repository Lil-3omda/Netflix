import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServices } from '../../../services/admin-dashboard/dashboard-services';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-deatils',
  imports: [CommonModule,FormsModule],
  templateUrl: './movie-deatils.html',
  styleUrl: './movie-deatils.css'
})
export class MovieDeatils implements OnInit {
  safeTrailerUrl!: SafeResourceUrl;
  videoUrl!: string;
 editing = false;
  movieDetails: any;
  id!:number;
editMovie: any = {};


 constructor(private route: ActivatedRoute, private dashboardService: DashboardServices,private sanitizer: DomSanitizer) {}

 ngOnInit(): void {
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('Movie ID:', this.id);
  this.loadMovieDetails(this.id);


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
      categoryName: this.movieDetails.categoryName,
      description: this.movieDetails.description,
      trailerUrl: this.movieDetails.trailerUrl,
    };
  }
}

saveChanges(): void {
  this.editing = false;
  const updatedMovie = {
    description: this.editMovie.description,
    categoryName: this.editMovie.categoryName,
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
}
