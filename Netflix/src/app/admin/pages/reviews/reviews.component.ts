import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Review, ReviewStatistics, Stars } from '../../models/admin.interfaces';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container py-5">
    <!-- Hero Header -->
    <div class="bg-danger text-white p-5 rounded-4 position-relative mb-5">
      <!-- <div class="position-absolute top-0 end-0 bg-white opacity-25 rounded-circle" style="width: 200px; height: 200px; transform: translate(50%, -50%)"></div> -->
      <h1 class="display-4 fw-bold">Review Management</h1>
      <p class="lead">Monitor and manage user reviews and ratings</p>
    </div>

    <!-- Stats Overview -->
    <div class="row g-4 mb-5">
      <div class="col-md-3">
        <div class="card border-danger text-bg-dark h-100">
          <div class="card-body">
            <small class="text-secondary">Total Reviews</small>
            <h3 class="card-title">{{ statistics.totalReviews }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-warning text-bg-dark h-100">
          <div class="card-body">
            <small class="text-secondary">Average Rating</small>
            <h3 class="card-title">{{ statistics.averageRating }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-success text-bg-dark h-100">
          <div class="card-body">
            <small class="text-secondary">5-Star Reviews</small>
            <h3 class="card-title">{{ getFiveStarCount() }}</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-danger text-bg-dark h-100">
          <div class="card-body">
            <small class="text-secondary">1-Star Reviews</small>
            <h3 class="card-title">{{ getOneStarCount() }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filter Section -->
    <div class="card text-bg-dark border-secondary mb-5">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <input type="text" class="form-control" [(ngModel)]="searchTerm" (input)="filterReviews()" placeholder="Search reviews by user or comment...">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" [(ngModel)]="videoIdFilter" (input)="filterReviews()" placeholder="Video ID">
          </div>
          <div class="col-md-2">
            <select class="form-select" [(ngModel)]="ratingFilter" (change)="filterReviews()">
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" [(ngModel)]="sortBy" (change)="filterReviews()">
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

    <!-- Reviews List -->
    <div class="mb-5">
      <div *ngFor="let review of filteredReviews; trackBy: trackByReviewId" class="card text-bg-dark border-secondary mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex gap-3">
              <div class="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center" style="width: 48px; height: 48px">
                <strong>{{ getInitials(review.profileName) }}</strong>
              </div>
              <div>
                <h5 class="mb-0">{{ review.profileName }}</h5>
                <div class="d-flex align-items-center gap-2">
                  <div class="text-warning">
                    <span *ngFor="let star of getStarArray(review.rating)">★</span>
                    <span *ngFor="let star of getEmptyStarArray(review.rating)" class="text-secondary">★</span>
                  </div>
                  <small class="text-muted">{{ formatDate(review.createdAt) }}</small>
                </div>
                <div class="text-muted small mt-1">
                  <span class="text-danger">Video ID:</span> {{ review.videoId }}<span *ngIf="review.videoTitle"> - {{ review.videoTitle }}</span>
                </div>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger" (click)="deleteReview(review)"><i class="bi bi-trash"></i> Delete</button>
          </div>
          <div class="bg-dark bg-opacity-50 rounded p-3">
            <p class="mb-0">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
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

    .focus\\:border-netflix-red:focus {
      border-color: #e50914;
    }

    .focus\\:ring-netflix-red:focus {
      --tw-ring-color: #e50914;
    }

    /* Custom scrollbar */
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

  statistics: ReviewStatistics = {
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: {} as Partial<Record<Stars, number>>
  };


  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

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
        next: (response) => {
          if (this.currentPage === 1) {
            this.reviews = response.reviews;
          } else {
            this.reviews = [...this.reviews, ...response.reviews];
          }
          this.filteredReviews = [...this.reviews];
          this.hasMoreReviews = response.reviews.length === 20;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.isLoading = false;
        }
      });
  }

  private loadStatistics(): void {
    this.adminService.getReviewStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statistics = stats;
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
        }
      });
  }

  loadMoreReviews(): void {
    this.currentPage++;
    this.loadReviews();
  }

  filterReviews(): void {
    this.filteredReviews = this.reviews.filter(review => {
      const matchesSearch = !this.searchTerm ||
        review.profileName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRating = !this.ratingFilter ||
        review.rating.toString() === this.ratingFilter;

      const matchesVideoId = !this.videoIdFilter ||
        review.videoId.toString() === this.videoIdFilter.toString();

      return matchesSearch && matchesRating && matchesVideoId;
    });

    // Apply sorting
    this.filteredReviews.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }

  deleteReview(review: Review): void {
    if (confirm(`Are you sure you want to delete this review by ${review.profileName}?`)) {
      this.adminService.deleteReview(review.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.reviews = this.reviews.filter(r => r.id !== review.id);
            this.filterReviews();
            this.loadStatistics();
          },
          error: (error) => {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
          }
        });
    }
  }

  trackByReviewId(index: number, review: Review): number {
    return review.id;
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

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }


  getStarCount(stars: Stars): number {
    return this.statistics.ratingDistribution[stars] ?? 0;
  }


  getFiveStarCount(): number {
    return this.getStarCount(5);
  }

  getOneStarCount(): number {
    return this.getStarCount(1);
  }


  loadFlaggedReviews(): void {
    this.isLoading = true;
    this.adminService.getFlaggedReviews()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.reviews = response.reviews;
          this.filteredReviews = [...this.reviews];
          this.hasMoreReviews = response.reviews.length === 20;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading flagged reviews:', error);
          this.isLoading = false;
        }
      });
  }
}
