import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
categories: string[] = [];

constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http.get<string[]>('https://localhost:7140/api/Category/names')
    .subscribe(data => {
      this.categories = data;
    });
}
}
