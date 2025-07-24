import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { Content } from '../../core/services/content';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  category: string;
  imageUrl: string;
  type: 'film' | 'series' | 'documentary' | 'kids' | 'reality' | 'stand-up-comedy' | 'game';
}
@Component({
  selector: 'app-content-grid',
  imports: [FormsModule,CommonModule],
  providers:[Content],
  templateUrl: './content-grid.html',
  styleUrl: './content-grid.css'
})
export class ContentGrid implements OnChanges {
@Input() selectedFilter: string = '';
  @Input() selectedMonth: string = '';

  movies: Movie[] = [];
  displayedMovies: Movie[] = [];
  showMoreButton: boolean = false;
  moviesPerPage: number = 5;
  currentPage: number = 1;

min(a:number,b:number):number{
  return Math.min(a,b);
}
 trackByMovieId(index:number,movie:any):any{
  return movie.id;
 }


  constructor(private movieDataService: Content) {
    this.movies = this.movieDataService.getAllMovies();
    this.updateDisplayedMovies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFilter'] || changes['selectedMonth']) {
      this.filterMovies();
    }
  }

  private filterMovies(): void {
    let filteredMovies = this.movies;

    // Filter by category
    if (this.selectedFilter) {
      filteredMovies = this.movieDataService.getMoviesByCategory(this.selectedFilter);
    }

    // Filter by month
    if (this.selectedMonth) {
      filteredMovies = this.movieDataService.getMoviesByMonth(this.selectedMonth);
    }

    this.movies = filteredMovies;
    this.currentPage = 1;
    this.updateDisplayedMovies();
  }

  private updateDisplayedMovies(): void {
    const startIndex = 0;
    const endIndex = this.currentPage * this.moviesPerPage;

    this.displayedMovies = this.movies.slice(startIndex, endIndex);
    this.showMoreButton = endIndex < this.movies.length;
  }

  showMore(): void {
    this.currentPage++;
    this.updateDisplayedMovies();
  }

  getFilterTitle(): string {
    if (this.selectedFilter) {
      return this.selectedFilter.charAt(0).toUpperCase() + this.selectedFilter.slice(1).replace('-', ' ');
    }
    if (this.selectedMonth) {
      return `${this.selectedMonth} Releases`;
    }
    return 'All Titles';
  }
}
