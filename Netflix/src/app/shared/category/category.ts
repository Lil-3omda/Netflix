import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieCategory } from '../../core/services/movie-category';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,Navbar , RouterLink ],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category implements OnInit {
  categoryName: string = '';
  movies: any[] = [];
  id: number = 0;
  constructor(private route: ActivatedRoute, private service: MovieCategory,) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const name = params.get('name');
    console.log('Category name:', name);

    
    this.movies = [];
    this.categoryName = '';

    if (name) {
      this.service.getMoviesByCategory(name).subscribe(data => {
        if (data && data.videos && data.videos.length > 0) {
          this.categoryName = data.name;
          this.movies = data.videos;
          this.id = +data.id;
          console.log(data);
          
        } else {
          this.categoryName = 'No results found';
          this.movies = [];
        }
      }, err => {
        this.categoryName = 'Error loading category';
        this.movies = [];
      });
    }
  });
}
}