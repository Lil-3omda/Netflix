import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-movie-slider-section',
  standalone: true,
  imports: [],
  templateUrl: './movie-slider.html',
  styleUrls: ['./movie-slider.css']
})
export class MovieSliderSectionComponent {
  @Input() sectionTitle: string = '';
  @Input() movies: any[] = [];
  @Output() handleMovieClick = new EventEmitter<any>();

  selectedMovie: any = null;

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  closeModal() {
    this.selectedMovie = null;
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
