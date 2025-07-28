import { Component, OnInit } from '@angular/core';
import { DashboardServices } from '../../services/admin-dashboard/dashboard-services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBar } from "../../shared/nav-bar/nav-bar";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {

  statistics: any ;
  top10Content: any[] = [];
  constructor(private dashboardServices: DashboardServices, private router:Router){}

  ngOnInit(): void {
    this.loadData();
    this.loadTop10Content();
  }

  loadData():void{
    this.dashboardServices.getDashboardData().subscribe({
      next:data=>{
        this.statistics = data;
        console.log(this.statistics)
      },
      error: err => {
        console.error('Error loading dashboard data:', err);
        this.statistics = null;
      }
    })
  }
  loadTop10Content(): void {
    this.dashboardServices.getTop10Content().subscribe({
      next: data=>{
        this.top10Content= data;
        console.log(this.top10Content);
      },
      error: err => {
        console.error('Error loading top 10 content:', err);
        this.top10Content = [];
      }
    })
  }

}
