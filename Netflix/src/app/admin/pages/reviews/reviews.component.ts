import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Review, ReviewStatistics, Stars } from '../../models/admin.interfaces';
import { PopupService } from '../../../shared/services/popup.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <!-- Header -->
      <div class="bg-danger text-white p-5 rounded-4 position-relative mb-5">
        <h1 class="display-4 fw-bold">Review Management</h1>
        <p class="lead">Monitor and manage user reviews and ratings</p>
      </div>

      <!-- Statistics -->
      <div class="row g-4 mb-5">
        <div class="col-md-3" *ngFor="let stat of statsCards">
          <div class="card text-bg-dark h-100 border-{{ stat.border }}">
            <div class="card-body">
              <small class="text-secondary">{{ stat.label }}</small>
              <h3 class="card-title">{{ stat.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <input type="text" class="form-control" [(ngModel)]="searchTerm" (input)="onFilterChange()" placeholder="Search reviews by user or comment...">
            </div>
            <div class="col-md-2">
              <input type="number" class="form-control" [(ngModel)]="videoIdFilter" (input)="onFilterChange()" placeholder="Video ID">
            </div>
            <div class="col-md-2">
              <select class="form-select" [(ngModel)]="ratingFilter" (change)="onFilterChange()">
                <option value="">All Ratings</option>
                <option *ngFor="let r of [5,4,3,2,1]" [value]="r">{{ r }} Star{{ r > 1 ? 's' : '' }}</option>
              </select>
            </div>
            <div class="col-md-2">
              <select class="form-select" [(ngModel)]="sortBy" (change)="onFilterChange()">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            <div class="col-md-2">
              <button class="btn btn-warning w-100" (click)="loadFlaggedReviews()">
                <i class="bi bi-flag"></i> Flagged
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-dark table-hover table-bordered align-middle">
              <thead class="table-secondary text-dark">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Video</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let review of filteredReviews; trackBy: trackByReviewId">
                  <td>{{ review.id }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center me-3" style="width: 40px; height: 40px">
                        <strong>{{ getInitials(review.profileName) }}</strong>
                      </div>
                      <div>
                        <div class="fw-bold">{{ review.profileName }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div class="fw-bold">{{ review.videoTitle || 'Unknown Video' }}</div>
                      <small class="text-muted">ID: {{ review.videoId }}</small>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="text-warning me-2">
                        <span *ngFor="let s of getStarArray(review.rating)">★</span>
                        <span *ngFor="let s of getEmptyStarArray(review.rating)" class="text-secondary">★</span>
                      </div>
                      <span class="badge bg-warning text-dark">{{ review.rating }}/5</span>
                    </div>
                  </td>
                  <td>
                    <div class="text-truncate" style="max-width: 200px;" [title]="review.comment">
                      {{ review.comment }}
                    </div>
                  </td>
                  <td>
                    <small>{{ formatDate(review.createdAt) }}</small>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button (click)="viewFullReview(review)" class="btn btn-outline-info" title="View Full Review">
                        <i class="bi bi-eye"></i>
                      </button>
                      <button (click)="deleteReview(review)" class="btn btn-outline-danger" title="Delete Review" [disabled]="isLoading">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="filteredReviews.length === 0">
                  <td colspan="7" class="text-center text-muted py-4">
                    <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                    No reviews found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div class="text-center" *ngIf="hasMoreReviews">
        <button (click)="loadMoreReviews()" [disabled]="isLoading" class="btn btn-danger px-4 py-2">
          {{ isLoading ? 'Loading...' : 'Load More Reviews' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .bg-netflix-black {
      background-color: #000000;
    }

    .bg-netflix-red {
      background-color: #e50914;
    }

    .bg-netflix-red-dark {
      background-color: #b81d24;
    }

    .text-netflix-red {
      color: #e50914;
    }

    .border-netflix-red {
      border-color: #e50914;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    ::-webkit-scrollbar-thumb {
      background: #e50914;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #b81d24;
    }
  `]
})
export class ReviewsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  ratingFilter = '';
  sortBy = 'newest';
  isLoading = false;
  hasMoreReviews = true;
  currentPage = 1;
  videoIdFilter: number | '' = '';
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  private destroy$ = new Subject<void>();

  statistics: ReviewStatistics = {
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {} as Partial<Record<Stars, number>>
  };

  constructor(private adminService: AdminService, private popupService: PopupService) {}

  get statsCards() {
    return [
      { label: 'Total Reviews', value: this.statistics.totalReviews, border: 'danger' },
      { label: 'Average Rating', value: this.statistics.averageRating, border: 'warning' },
      { label: '5-Star Reviews', value: this.getStarCount(5), border: 'success' },
      { label: '1-Star Reviews', value: this.getStarCount(1), border: 'danger' }
    ];
  }

  ngOnInit(): void {
    this.loadReviews();
    this.loadStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadReviews(): void {
    this.isLoading = true;
    this.adminService.getReviews(this.currentPage, 20)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.reviews = this.currentPage === 1 ? res.reviews : [...this.reviews, ...res.reviews];
          this.filteredReviews = [...this.reviews];
          this.hasMoreReviews = res.reviews.length === 20;
          this.isLoading = false;
        },
        error: () => {
          this.popupService.showError('Failed to load reviews');
          this.isLoading = false;
        }
      });
  }

  private loadStatistics(): void {
    this.adminService.getReviewStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => this.statistics = stats,
        error: () => console.error('Failed to load statistics')
      });
  }

  loadMoreReviews(): void {
    this.currentPage++;
    this.loadReviews();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.hasMoreReviews = false;
    this.filterReviews();
  }

  filterReviews(): void {
    this.filteredReviews = this.reviews.filter(r => {
      const searchMatch = !this.searchTerm || r.profileName.toLowerCase().includes(this.searchTerm.toLowerCase()) || r.comment.toLowerCase().includes(this.searchTerm.toLowerCase());
      const ratingMatch = !this.ratingFilter || r.rating.toString() === this.ratingFilter;
      const videoMatch = !this.videoIdFilter || r.videoId.toString() === this.videoIdFilter.toString();
      return searchMatch && ratingMatch && videoMatch;
    }).sort((a, b) => {
      switch (this.sortBy) {
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest': return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest': return b.rating - a.rating;
        case 'lowest': return a.rating - b.rating;
        default: return 0;
      }
    });
  }

  deleteReview(review: Review): void {
    this.popupService.showConfirm(
      `Are you sure you want to delete the review by ${review.profileName}?`,
      () => {
        this.isLoading = true;
        this.adminService.deleteReview(review.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.reviews = this.reviews.filter(r => r.id !== review.id);
              this.filterReviews();
              this.loadStatistics();
              this.popupService.showSuccess('Review deleted successfully', 'Review Deleted');
              this.isLoading = false;
            },
            error: () => {
              this.popupService.showError('Error deleting review.');
              this.isLoading = false;
            }
          });
      },
      undefined,
      'Delete Review'
    );
  }

  loadFlaggedReviews(): void {
    this.isLoading = true;
    this.adminService.getFlaggedReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.reviews = res.reviews;
          this.filteredReviews = [...res.reviews];
          this.hasMoreReviews = res.reviews.length === 20;
          this.isLoading = false;
        },
        error: () => {
          this.popupService.showError('Error loading flagged reviews');
          this.isLoading = false;
        }
      });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  getStarCount(stars: Stars): number {
    return this.statistics.ratingDistribution[stars] ?? 0;
  }

  viewFullReview(review: Review): void {
    const reviewDetails = `User: ${review.profileName}
Video: ${review.videoTitle || 'Unknown'} (ID: ${review.videoId})
Rating: ${review.rating}/5
Date: ${this.formatDate(review.createdAt)}
Comment: ${review.comment}`;

    this.popupService.showInfo(reviewDetails, 'Review Details');
  }

  trackByReviewId(index: number, review: Review): number {
    return review.id;
  }
}
