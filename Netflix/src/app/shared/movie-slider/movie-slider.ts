import { Component, Input, ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { NetflixModel } from '../../components/netflix-model/netflix-model';

@Component({
  selector: 'app-movie-slider',
  imports: [NetflixModel],
  templateUrl: './movie-slider.html',
  styleUrl: './movie-slider.css'
})
export class MovieSliderSectionComponent {
  @Input() sectionTitle: string = '';
  @Input() movies: any[] = [];

  @Output() movieClicked = new EventEmitter<any>();

  // selectedMovie:any=null;
  onMovieClick(movie:any){
    console.log('movie clicked:',movie);
      this.movieClicked.emit (movie);
  }
  //  closeModal(){
  //   this.selectedMovie=null;
  //  }
  testFunction(){
    console.log('button play');
    this.movieClicked.emit({title:'test movie',image:'test.jpg'})
  }
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
