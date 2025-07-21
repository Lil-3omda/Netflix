import { Component, Input, ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
import { NetflixModel } from '../../components/netflix-model/netflix-model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export class MovieSlider {


@Component({
  selector: 'app-movie-slider',
  imports: [NetflixModel,CommonModule],
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
