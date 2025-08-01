import { Component, inject, OnInit } from '@angular/core';
import { Moviedetails } from '../../core/services/moviedetails';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watch-movie',
  imports: [ CommonModule],
  templateUrl: './watch-movie.html',
  styleUrl: './watch-movie.css'
})
export class WatchMovie implements OnInit {
  private movieService = inject(Moviedetails);
  private route = inject(ActivatedRoute);

  movieId: number = 0;
  movie: any;


  constructor(private sanitizer: DomSanitizer) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.movieId = +id;
      this.movieService.getmovieDetatils(this.movieId).subscribe({
        next: (data: any) => {
          this.movie = data;
          console.log('Movie details:', this.movie);
          console.log('Video URL:', this.movie?.videoUrl);
        },
        error: (err: any) => {
          console.error('Error loading movie details:', err);
        }
      });
    }
  });
}





}
