import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "src/app/layout/navbar/navbar";
import { HistoryService } from './services/history-service';

@Component({
  selector: 'app-watch-history',
  imports: [Navbar,CommonModule,RouterLink],
  templateUrl: './watch-history.html',
  styleUrl: './watch-history.css'
})
export class WatchHistory implements OnInit {
  historyVideos: any

  ngOnInit(): void {
    this.loadHistory()
  }

  constructor(private historyService: HistoryService){}

  loadHistory(){
    this.historyService.getHistory().subscribe({
      next:data =>{
        this.historyVideos = data;
        console.log(data)
      },
      error: err=>{
        console.log(err)
      }
    })
  }
}
