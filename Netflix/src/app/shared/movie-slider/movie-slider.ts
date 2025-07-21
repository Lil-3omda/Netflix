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
  // @Output() openModal= new EventEmitter <void>();
  @Output()handleMovieClick= new EventEmitter <any>();
  // emitModal(){
  //   console.log('click to image');
  //   this.openModal.emit();
  // }
  selectedMovie:any=null;
  // handleMovieClick(movie:any){
  //   this.selectedMovie = movie;
  //   console.log('movie clicked:',movie)
  // }
   closeModal(){
    this.selectedMovie=null;
   }
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
