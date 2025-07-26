import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',

  
  imports: [
    RouterOutlet,Navbar,RouterModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'Netflix';
}
