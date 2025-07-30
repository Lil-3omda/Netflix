import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      const step = route.queryParams['step'];
      const path = route.routeConfig?.path;

      // ✅ Allow access to /signup?step=4 for plan selection even if logged in
      if (path === 'signup' && step === '4') {
        return true;
      }

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
