import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCategory } from '../../core/services/movie-category';

@Component({
  selector: 'app-movie-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-slider.html',
  styleUrls: ['./movie-slider.css']
})
export class MovieSliderSectionComponent {
  @Input() categoryName: string = '';
  @Input() sectionTitle: string = '';
  @Input() movies: any[] = [];

  @Input() staticTop10: any[] = []; // ✅ Add this line

  @Output() movieClicked = new EventEmitter<any>();

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  selectedMovie: any = null;

  constructor(private movieService: MovieCategory) {}

  ngOnInit(): void {
    if (this.categoryName) {
      this.movieService.getMoviesByCategory(this.categoryName).subscribe(data => {
        this.movies = data.videos;
      });
    }
  }

  onMovieClick(movie: any): void {
    this.movieClicked.emit(movie);
  }

  testFunction(): void {
    this.movieClicked.emit({ title: 'test movie', image: 'test.jpg' });
  }

  scrollLeft(): void {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  closeModal(): void {
    this.selectedMovie = null;
  }
}
