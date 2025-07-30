import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const currentUrl = this.router.url;

    // ✅ Skip guard check if user is already on signup page to avoid infinite loop
    if (currentUrl.startsWith('/signup')) {
      return of(true);
    }

    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.http.get<any>(`${environment.apiUrl}/Subscription/user-subscription/${user.id}`).pipe(
      map(res => {
        if (res && res.planName) {
          return true;
        } else {
          // ✅ Redirect to step 4 of signup with message
          this.router.navigate(['/signup'], {
            queryParams: {
              step: 4,
              message: 'Please choose a plan before accessing this page.'
            }
          });
          return false;
        }
      }),
      catchError(() => {
        // ✅ Redirect on API failure too
        this.router.navigate(['/signup'], {
          queryParams: {
            step: 4,
            // message: 'Please choose a plan before accessing this page.'
          }
        });
        return of(false);
      })
    );
  }

}
