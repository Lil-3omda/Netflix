import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Moviedetails } from '../../core/services/moviedetails';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movive-detalis',
  imports: [Navbar , CommonModule],
  templateUrl: './movive-detalis.html',
  styleUrl: './movive-detalis.css'
})
export class MoviveDetalis  implements OnInit {
  private movieService = inject(Moviedetails);
  private route = inject(ActivatedRoute);
  movieId: number = 0;
  movie: any;
  safeTrailerUrl!: SafeResourceUrl;
  showTrailer: boolean = true;
  activeTab: string = 'details';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.movieId = +id;
        this.movieService.getmovieDetatils(this.movieId).subscribe({
          next: (data: any) => {
            this.movie = data;
            this.safeTrailerUrl = this.getSafeEmbedUrl(this.movie.trailerUrl);
          },
          error: (err: any) => {
            console.error('Error loading movie details:', err);
          }
        });
      }
    });
  }

  getSafeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractYoutubeId(url: string): string {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    this.showTrailer = tab === 'trailer';
  }
}
