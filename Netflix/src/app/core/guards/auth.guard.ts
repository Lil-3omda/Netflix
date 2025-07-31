import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const user = this.authService.getCurrentUser();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user is trying to access admin routes
    if (state.url.startsWith('/admin')) {
      if (!user?.isAdmin) {
        this.router.navigate(['/Home']);
        return false;
      }
    }

    return true;
  }
}