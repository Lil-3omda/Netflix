import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';

interface Category {
  id: number;
  name: string;
  videos: any[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <!-- Hero Header -->
      <div class="bg-danger text-white p-5 rounded-4 position-relative mb-5 d-flex justify-content-between align-items-center">
        <div>
          <h1 class="display-4 fw-bold">Category Management</h1>
          <p class="lead">Organize your Netflix content library</p>
        </div>
        <button (click)="openAddCategoryModal()" class="btn btn-outline-light d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg"></i>
          <span>Add Category</span>
        </button>
        <!-- <div class="position-absolute top-0 end-0 bg-white opacity-25 rounded-circle" style="width: 200px; height: 200px; transform: translate(50%, -50%)"></div> -->
      </div>

      <!-- Stats Overview -->
      <div class="row g-4 mb-5">
        <div class="col-md-3">
          <div class="card border-danger text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Total Categories</small>
              <h3 class="card-title">{{ statistics.totalCategories }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-success text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">With Content</small>
              <h3 class="card-title">{{ statistics.categoriesWithVideos }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-warning text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Empty Categories</small>
              <h3 class="card-title">{{ statistics.emptyCategories }}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card border-primary text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">Total Videos</small>
              <h3 class="card-title">{{ statistics.totalVideos }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <input type="text" class="form-control" [(ngModel)]="searchTerm" (input)="filterCategories()" placeholder="Search categories...">
            </div>
            <div class="col-md-3">
              <select class="form-select" [(ngModel)]="filterType" (change)="filterCategories()">
                <option value="">All Categories</option>
                <option value="with-content">With Content</option>
                <option value="empty">Empty</option>
              </select>
            </div>
            <div class="col-md-3">
              <button class="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-filter"></i>
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="row g-4 mb-5">
        <div *ngFor="let category of filteredCategories; trackBy: trackByCategoryId" class="col-md-6 col-lg-4 col-xl-3">
          <div class="card text-bg-dark border-secondary h-100 position-relative">
            <div class="card-body text-center">
              <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px">
                <i class="bi bi-collection-play text-white fs-4"></i>
              </div>
              <h5 class="card-title text-white">{{ category.name }}</h5>
              <p class="text-secondary small">{{ category.videos.length }} videos</p>
            </div>
            <div class="card-footer bg-transparent border-top-0 d-flex justify-content-between">
              <button (click)="editCategory(category)" class="btn btn-sm btn-outline-light w-100 me-2">
                <i class="bi bi-pencil"></i> Edit
              </button>
              <button (click)="deleteCategory(category)" class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Category Modal -->
      <div *ngIf="showAddModal" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-bg-dark border-secondary">
            <div class="modal-header">
              <h5 class="modal-title">{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h5>
              <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="closeAddModal()"></button>
            </div>
            <form [formGroup]="categoryForm" (ngSubmit)="submitCategory()">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">Category Name</label>
                  <input id="categoryName" type="text" class="form-control" formControlName="name" placeholder="Enter category name">
                  <div *ngIf="categoryForm.get('name')?.invalid && categoryForm.get('name')?.touched" class="text-danger small mt-1">
                    Category name is required
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" (click)="closeAddModal()">Cancel</button>
                <button type="submit" [disabled]="categoryForm.invalid || isLoading" class="btn btn-danger">
                  {{ isLoading ? 'Saving...' : (editingCategory ? 'Update' : 'Create') }}
                </button>
              </div>
            </form>
          </div>
        </div>
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
export class CategoriesComponent implements OnInit, OnDestroy {
  searchTerm = '';
  filterType = '';
  showAddModal = false;
  isLoading = false;
  editingCategory: Category | null = null;
  categoryForm: FormGroup;

  categories: Category[] = [];
  filteredCategories: Category[] = [];

  statistics = {
    totalCategories: 0,
    categoriesWithVideos: 0,
    emptyCategories: 0,
    totalVideos: 0
  };

  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCategories(): void {
    this.adminService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Handle paginated response
          if (response.data) {
            this.categories = response.data;
          } else if (Array.isArray(response)) {
            this.categories = response;
          } else {
            this.categories = [];
          }
          this.filteredCategories = [...this.categories];
          this.loadStatistics();
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.categories = [];
          this.filteredCategories = [];
        }
      });
  }

  private loadStatistics(): void {
    this.adminService.getCategoryStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statistics = {
            totalCategories: stats.totalCategories || this.categories.length,
            categoriesWithVideos: stats.categoriesWithVideos || this.categories.filter(c => c.videos && c.videos.length > 0).length,
            emptyCategories: stats.emptyCategories || this.categories.filter(c => !c.videos || c.videos.length === 0).length,
            totalVideos: stats.totalVideos || this.categories.reduce((total, c) => total + (c.videos ? c.videos.length : 0), 0)
          };
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          // Fallback to calculating from loaded categories
          this.statistics = {
            totalCategories: this.categories.length,
            categoriesWithVideos: this.categories.filter(c => c.videos && c.videos.length > 0).length,
            emptyCategories: this.categories.filter(c => !c.videos || c.videos.length === 0).length,
            totalVideos: this.categories.reduce((total, c) => total + (c.videos ? c.videos.length : 0), 0)
          };
        }
      });
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      const matchesSearch = !this.searchTerm ||
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFilter = !this.filterType ||
        (this.filterType === 'with-content' && category.videos && category.videos.length > 0) ||
        (this.filterType === 'empty' && (!category.videos || category.videos.length === 0));

      return matchesSearch && matchesFilter;
    });
  }

  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }

  openAddCategoryModal(): void {
    this.editingCategory = null;
    this.categoryForm.reset();
    this.showAddModal = true;
  }

  editCategory(category: Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name
    });
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  submitCategory(): void {
    if (this.categoryForm.invalid) return;

    this.isLoading = true;
    const categoryData = this.categoryForm.value;

    if (this.editingCategory) {
      // Update existing category
      this.adminService.updateCategory(this.editingCategory.id, categoryData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories();
            this.closeAddModal();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating category:', error);
            this.isLoading = false;
          }
        });
    } else {
      // Create new category
      this.adminService.createCategory(categoryData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories();
            this.closeAddModal();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating category:', error);
            this.isLoading = false;
          }
        });
    }
  }

  deleteCategory(category: Category): void {
    if (confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      this.adminService.deleteCategory(category.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (error) => {
            console.error('Error deleting category:', error);
            alert('Failed to delete category. It may contain videos.');
          }
        });
    }
  }
}
