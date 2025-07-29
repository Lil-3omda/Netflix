import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  currentProfileId: number = 1; // This should come from profile service
  private destroy$ = new Subject<void>();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    // TODO: Get current profile ID from profile service
    // For now using hardcoded value
    this.loadCurrentProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCurrentProfile(): void {
    // TODO: Implement profile service integration
    // This should get the current active profile
    // For demonstration, using profile ID 1
    
    // Example integration:
    // this.profileService.currentProfile$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(profile => {
    //     if (profile) {
    //       this.currentProfileId = profile.id;
    //     }
    //   });
  }
}