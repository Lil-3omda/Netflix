import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      if (user?.isAdmin) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/Profile']);
      }
      return false;
    }
    return true;
  }
}