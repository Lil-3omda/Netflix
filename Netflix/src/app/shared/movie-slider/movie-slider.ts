import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-movie-slider',
  imports: [],
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSliderSectionComponent {
  @Input() sectionTitle: string = '';
  @Input() movies: any[] = [];

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}