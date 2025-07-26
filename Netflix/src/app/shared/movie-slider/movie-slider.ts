import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSliderSectionComponent implements OnInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  @Input() title: string = '';
  @Input() categoryName: string = '';
  @Input() isTop10: boolean = false; // ✅ جديدة

  movies: any[] = [];

  constructor(private movieService: MovieCategory, private http: HttpClient) {}

  ngOnInit(): void {
    if (this.isTop10) {
      // ✅ جلب التوب 10
      this.http.get<any[]>('https://localhost:7140/api/Videos/TopViews?count=10')
        .subscribe(data => {
          this.movies = data;
        });
    } else if (this.categoryName) {
      // ✅ جلب حسب الكاتيجوري
      this.movieService.getMoviesByCategory(this.categoryName)
        .subscribe(data => {
          this.movies = data.videos;
        });
    }
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
