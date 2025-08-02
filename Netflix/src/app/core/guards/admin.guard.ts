import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getCurrentUser();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!user?.isAdmin) {
      this.router.navigate(['/Home']);
      return false;
    }

    return true;
  }
}