import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { MovieSliderSectionComponent } from '../../../shared/movie-slider/movie-slider';
import { NetflixModel } from '../../../components/netflix-model/netflix-model';
import { FormsModule } from '@angular/forms';
import { MovieCategory } from '../../../core/services/movie-category';
import { Navbar } from "../../../layout/navbar/navbar";
import { Category } from "../../../shared/category/category";

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, FormsModule, MovieSliderSectionComponent, Navbar, NetflixModel, Category],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {
@ViewChild('slider', { static: false }) slider!: ElementRef;


top10Movies: any[] = [];


constructor(private movieService: MovieCategory) {}

  ngOnInit(): void {
    this.movieService.getTopViewed(10).subscribe({
      next: (data:any) => {
        this.top10Movies = data;
      },
      error: (err:any) => {
        console.error('Error fetching top 10:', err);
      }
    });
  }



scrollLeft() {
  this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight() {
  this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
}

  videoUrl: string = 'https://vgfdprgqzkwvoxsnfdlr.supabase.co/storage/v1/object/public/pickup/instructor/42/video/.mp4/311792bc-49d0-48d1-a2bc-23cf3b3b3127.mp4';
  posterUrl: string = 'https://strandreleasing.com/wp-content/uploads/bfi_thumb/FrontCover_StrandBanner-nrye8w3wpafkaixcp4gn06xmf7k4q0h3ka6wis2ydk.jpg';

  playVideo(video: HTMLVideoElement) {
    video.play();
  }

resetVideo(video: HTMLVideoElement) {
  video.pause();
  video.currentTime = 0;

  // Hack لإجبار المتصفح يعيد عرض البوستر
  const src = video.src;
  video.src = '';
  video.load(); // clear
  video.src = src;
}

// model

  isModalOpen:boolean = false;
  selectedMovie:any=null;
  openMovieModal(movie:any) {
    console.log('modal opened!');
    this.selectedMovie= movie;
    this.isModalOpen = true;
  }


  handleMovieClick(movie:any){
    this.selectedMovie= movie;
    console.log('movie clicked:',movie);
  }


closeMovieModal() {
    console.log('modal close!');
    this.isModalOpen = false;
    this.selectedMovie= null;
  }
    showModal = false;
    // this.isModalOpen = false;
}
