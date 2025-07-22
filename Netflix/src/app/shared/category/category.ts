import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category {
  // movies: any[] = [];
  // categoryName: string = '';

  // constructor(private movieCategory: MovieCategory, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     this.categoryName = params.get('categoryName') || '';
  //     if (this.categoryName) {
  //       this.movieCategory.getMoviesByCategory(this.categoryName).subscribe(data => {
  //         this.movies = data;
  //       });
  //     }
  //   });
  // }
}