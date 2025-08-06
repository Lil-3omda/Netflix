import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {


  constructor(private router:Router) {}

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    // Clear all localStorage items related to authentication
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_user');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileId');

    // Clear any other Netflix-related localStorage items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('netflix_') || key.includes('user') || key.includes('auth')) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();
    
    this.router.navigate(['/login']);
  }
}
