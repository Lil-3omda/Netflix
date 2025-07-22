import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';

@Component({
  selector: 'app-movie-slider',
  imports: [CommonModule],
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSliderSectionComponent {
   @ViewChild('slider', { static: false }) slider!: ElementRef;
   @Input() category: string = '';
  @Input() title: string = ''; 
  movies:any[] = [];

 
  
   constructor(private movieService: MovieCategory) {}

  ngOnInit(): void {
    this.movieService.getMoviesByCategory(this.category).subscribe(data => {
      this.movies = data.videos;
    });
  }
   

  
 
  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
