import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      const user = this.authService.getCurrentUser();
      const step = route.queryParams['step'];
      const path = route.routeConfig?.path;

      // Allow access to signup step 4 for plan selection even if logged in
      if (path === 'signup' && step === '4') {
        return true;
      }

      // Redirect authenticated users based on their role
      if (user?.isAdmin) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/Home']);
      }
      return false;
    }

    return true;
  }
}