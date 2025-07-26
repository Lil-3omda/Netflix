import { Component, NgModule, OnInit } from '@angular/core';
import { AdminService } from '../../../../admin/services/admin.service';
import { DashboardServices } from '../../services/admin-dashboard/dashboard-services';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-movies',
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './admin-movies.html',
  styleUrl: './admin-movies.css'
})
export class AdminMovies implements OnInit {

  searchTerm: string = '';
  selectedCategory: string = '';
  filteredMovies: any[] = [];
  categories: any[] = []; // Populate from API
  movies: any[] = [];     // Full list
  MoviesStatistics: any;
  
  page: number = 1;
  constructor(private dashboaedServices:DashboardServices){}

  ngOnInit(): void {
    this.loadMoviesStatistics();
    this.loadCategories();
    this.loadMovies();
  }

  loadMoviesStatistics(): void {
    this.dashboaedServices.getMoviesStatistics().subscribe({
      next: data=>{
        this.MoviesStatistics = data;
        console.log(this.MoviesStatistics);
      },
      error: err => {
        console.error('Error loading movies statistics:', err);
        this.MoviesStatistics = null;
      }
    })
  }

  loadMovies(): void {
    this.dashboaedServices.getAllMovies().subscribe({
      next: data => {
        this.movies = data;
        this.filteredMovies = this.movies; // Initialize with all movies
        console.log(this.movies);
      },
      error: err => {
        console.error('Error loading movies:', err);
        this.movies = [];
        this.filteredMovies = [];
      }
    })
  }
  
  loadCategories(): void {
    this.dashboaedServices.getCategoriesNames().subscribe({
      next: data => {
        this.categories = data;
        console.log(this.categories);
      },
      error: err => {
        console.error('Error loading categories:', err);
        this.categories = [];
      }
    });
  }

  onCategoryChange(): void {
    console.log('Category changed:', this.selectedCategory);
    this.applyFilters();
    // Filter movies based on selected category
    
  }

  onSearch(): void {
    console.log('Search term:', this.searchTerm);
    this.applyFilters();
    // Filter movies based on search term
  }
  
applyFilters() {
  this.filteredMovies = this.movies.filter(movie =>
    (this.selectedCategory === '' || movie.categoryName === this.selectedCategory) &&
    movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


}
