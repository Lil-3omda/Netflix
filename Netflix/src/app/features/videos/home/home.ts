import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MovieSliderSectionComponent } from '../../../shared/movie-slider/movie-slider';
import { NetflixModel } from '../../../components/netflix-model/netflix-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule,MovieSliderSectionComponent,NetflixModel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

staticTop10 = [
  { title: 'The Witcher', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRQZEW7hJu7MDS6QpqfDOX52yPfeIVz930VHO2307XNHCWopEm8x8q93bJUa8DhrfCQE60v2QKlBJ5Q0VTfmERLkHEA9bzbd_2THBW0U-Y' },
  { title: 'Breaking Bad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0fuh0v8nhzonJNIbXPfzfVNAW99AO8onvRQ&s' },
  { title: 'Money Heist', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0nOcqp3JPBkT2yqHq4N2YTVe1mTKzjkcTIQ&s' },
  { title: 'Stranger Things', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPKlpSF1q_Gw4Txv9sjUoJFAYRsNgMqZGdw&s' },
  { title: 'Lupin', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
  { title: 'Dark', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
  { title: 'Wednesday', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
  { title: 'Ozark', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
  { title: 'Narcos', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
  { title: 'You', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT9Mbn0VCXoOYT8hvKEXMEe1sNvzcAxZR7PvUStfo_I4rYL6gce5DT5D_CfbKXocvFwRc9u6PAncSxwzXAEV78wcgiZ23_6zKtLa2vecA' },
];

scrollLeft() {
  this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight() {
  this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
}



// model

  isModalOpen:boolean = false;
  selectedMovie:any=null;
  openMovieModal(movie:any) {
    console.log('modal opened!');
    this.selectedMovie= movie;
    this.isModalOpen = true;
  }


  // handleMovieClick(movie:any){
  //   this.selectedMovie= movie;
  //   console.log('movie clicked:',movie);
  // }


  closeMovieModal() {
     console.log('modal close!');
         this.isModalOpen = false;
         this.selectedMovie= null;
  }
    showModal = false;
    // this.isModalOpen = false;
}
