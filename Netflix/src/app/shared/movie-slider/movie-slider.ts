
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
[x: string]: any;

  @Input() categoryName: string = '';
  @Input() sectionTitle: string = '';
  @Output() handleMovieClick = new EventEmitter<any>();

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  movies: any[] = [];
  selectedMovie: any = null;

  constructor(private movieService: MovieCategory) {}

  ngOnInit(): void {
    if (this.categoryName) {
      this.movieService.getMoviesByCategory(this.categoryName).subscribe(data => {
        this.movies = data.videos;
      });
    }
  }

  closeModal(): void {
    this.selectedMovie = null;
  }

  scrollLeft(): void {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}

// import { Component, Input, ViewChild, ElementRef } from '@angular/core';
// import { MovieCategory } from '../../core/services/movie-category';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


// @Component({
//   selector: 'app-movie-slider',

//   imports: [CommonModule],
//   standalone: true,
//   templateUrl: './movie-slider.html',
//   styleUrls: ['./movie-slider.css']
// })
// export class MovieSliderSectionComponent {

//   // @ViewChild('slider', { static: false }) slider!: ElementRef;

//   @Input() categoryName: string = '';
//   // movies: any[] = [];



//    constructor(private movieService: MovieCategory) {}

//   ngOnInit(): void {
//     this.movieService.getMoviesByCategory(this.categoryName).subscribe(data => {
//       this.movies = data.videos;
//     });
//   }

//   @Input() sectionTitle: string = '';
//   @Input() movies: any[] = [];
//   @Output() handleMovieClick = new EventEmitter<any>();

//   selectedMovie: any = null;

//   @ViewChild('slider', { static: false }) slider!: ElementRef;

//   closeModal() {
//     this.selectedMovie = null;
//   }

//   scrollLeft() {
//     this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
//   }

//   scrollRight() {
//     this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
//   }
// }

// import { Component, Input, ViewChild, ElementRef,Output,EventEmitter } from '@angular/core';
// import { NetflixModel } from '../../components/netflix-model/netflix-model';

// @Component({
//   selector: 'app-movie-slider',
//   imports: [NetflixModel],
//   templateUrl: './movie-slider.html',
//   styleUrl: './movie-slider.css'
// })
// export class MovieSliderSectionComponent {
//   @Input() sectionTitle: string = '';
//   @Input() movies: any[] = [];
//   // @Output() openModal= new EventEmitter <void>();
//   @Output()handleMovieClick= new EventEmitter <any>();
//   // emitModal(){
//   //   console.log('click to image');
//   //   this.openModal.emit();
//   // }
//   selectedMovie:any=null;
//   // handleMovieClick(movie:any){
//   //   this.selectedMovie = movie;
//   //   console.log('movie clicked:',movie)
//   // }
//    closeModal(){
//     this.selectedMovie=null;
//    }
// =========
// import { Component, Input, ViewChild, ElementRef } from '@angular/core';
// import { MovieCategory } from '../../core/services/movie-category';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


// @Component({
//   selector: 'app-movie-slider',

//   imports: [CommonModule],
//   standalone: true,
//   templateUrl: './movie-slider.html',
//   styleUrls: ['./movie-slider.css']
// })
// export class MovieSliderSectionComponent {

//   // @ViewChild('slider', { static: false }) slider!: ElementRef;

//   @Input() categoryName: string = '';
//   // movies: any[] = [];



//    constructor(private movieService: MovieCategory) {}

//   ngOnInit(): void {
//     this.movieService.getMoviesByCategory(this.categoryName).subscribe(data => {
//       this.movies = data.videos;
//     });
//   }

//   @Input() sectionTitle: string = '';
//   @Input() movies: any[] = [];
//   @Output() handleMovieClick = new EventEmitter<any>();

//   selectedMovie: any = null;

//   @ViewChild('slider', { static: false }) slider!: ElementRef;

//   closeModal() {
//     this.selectedMovie = null;
//   }

//   scrollLeft() {
//     this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
//   }

//   scrollRight() {
//     this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
//   }
// }
