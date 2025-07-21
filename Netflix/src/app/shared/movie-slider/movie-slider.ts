import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-slider',
  
  imports: [CommonModule],
 
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSlider {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  
  // @Input() categoryName: string = '';
  // movies: [] = [];

  // constructor(private movieService: MovieCategory) {}

  // ngOnInit(): void {
  //   if (this.categoryName) {
  //     this.movieService.getMoviesByCategory(this.categoryName).subscribe(data => {
  //       this.movies = data;
  //     });
  //   }
  // }

  
 
  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}