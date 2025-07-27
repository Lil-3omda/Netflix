import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardServices } from '../../../services/admin-dashboard/dashboard-services';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-deatils',
  imports: [CommonModule],
  templateUrl: './movie-deatils.html',
  styleUrl: './movie-deatils.css'
})
export class MovieDeatils implements OnInit {
  safeTrailerUrl!: SafeResourceUrl;
  videoUrl!: string;

  movieDetails: any;
  id!:number;
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
}
