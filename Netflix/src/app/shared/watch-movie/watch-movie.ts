import { Component, inject, OnInit } from '@angular/core';
import { Moviedetails } from '../../core/services/moviedetails';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WatchHistory } from 'src/app/pages/watch-history/watch-history';
import { HistoryService } from 'src/app/pages/watch-history/services/history-service';

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

  history:any;
  videoId;
  constructor(private sanitizer: DomSanitizer, private historyServices: HistoryService) {}

ngOnInit(): void {


  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.videoId= id;
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

   this.onWatch(this.videoId);
}

onWatch(video_id){
  const profileId = Number(localStorage.getItem('profileId'))
  const watchedAt = new Date().toISOString();

  const historyEntry = {
    profileId: profileId,
    videoId: video_id,
    watchedAt: watchedAt
  };

  this.historyServices.addToHistory(historyEntry).subscribe({
    next: res =>{
      console.log(res)
      console.log(historyEntry)
    },
    error: err=>{
      console.log(err)
    }
  })
}




}
