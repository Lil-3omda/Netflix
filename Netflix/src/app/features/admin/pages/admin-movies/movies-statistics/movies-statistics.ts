import { Component, OnInit } from '@angular/core';
import { DashboardServices } from '../../../services/admin-dashboard/dashboard-services';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movies-statistics',
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './movies-statistics.html',
  styleUrl: './movies-statistics.css'
})
export class MoviesStatistics implements OnInit {

   MoviesStatistics: any;

  constructor(private dashboardServices: DashboardServices) {}

  ngOnInit(): void {
     this.loadMoviesStatistics();
  }

   loadMoviesStatistics(): void {
    this.dashboardServices.getMoviesStatistics().subscribe({
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
}
