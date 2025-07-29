import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';

interface Category {
  id: number;
  name: string;
  isDeleted?: boolean;
  videos: any[];
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container py-5">
      <!-- Header -->
      <div class="bg-danger text-white p-5 rounded-4 d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 class="display-4 fw-bold">Category Management</h1>
          <p class="lead">Organize your Netflix content library</p>
        </div>
        <button (click)="openAddCategoryModal()" class="btn btn-outline-light d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg"></i>
          <span>Add Category</span>
        </button>
      </div>

      <!-- Stats -->
      <div class="row g-4 mb-5">
        <div class="col-md-3" *ngFor="let stat of [
          { label: 'Total Categories', value: statistics.totalCategories, class: 'danger' },
          { label: 'With Content', value: statistics.categoriesWithVideos, class: 'success' },
          { label: 'Empty Categories', value: statistics.emptyCategories, class: 'warning' },
          { label: 'Total Videos', value: statistics.totalVideos, class: 'primary' }
        ]">
          <div class="card border-{{ stat.class }} text-bg-dark h-100">
            <div class="card-body">
              <small class="text-secondary">{{ stat.label }}</small>
              <h3 class="card-title">{{ stat.value }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body row g-3">
          <div class="col-md-6">
            <input class="form-control" [(ngModel)]="searchTerm" (input)="filterCategories()" placeholder="Search categories..." />
          </div>
          <div class="col-md-3">
            <select class="form-select" [(ngModel)]="filterType" (change)="filterCategories()">
              <option value="">All Categories</option>
              <option value="with-content">With Content</option>
              <option value="archived">Archived</option>
              <option value="empty">Empty</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Categories Table -->
      <div class="card text-bg-dark border-secondary mb-5">
        <div class="card-body table-responsive">
          <table class="table table-dark table-hover table-bordered align-middle">
            <thead class="table-secondary text-dark">
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Video Count</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let category of filteredCategories; trackBy: trackByCategoryId">
                <td>{{ category.id }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="bg-danger rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px">
                      <i class="bi bi-collection-play text-white"></i>
                    </div>
                    <div class="fw-bold">{{ category.name }}</div>
                  </div>
                </td>
                <td><span class="badge bg-primary">{{ category.videos?.length || 0 }} videos</span></td>
                <td>
                  <span class="badge bg-danger me-1" *ngIf="category.isDeleted">Archived</span>
                  
                    <span class="badge bg-success" *ngIf="category.videos?.length">Active</span>
                    <span class="badge bg-warning" *ngIf="!category.videos?.length">Empty</span>
                  
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button (click)="editCategory(category)" class="btn btn-outline-light" title="Edit Category"><i class="bi bi-pencil"></i></button>
                    <button (click)="viewCategoryVideos(category)" class="btn btn-outline-info mx-2" title="View Videos"><i class="bi bi-eye"></i></button>
                    <button *ngIf="!category.isDeleted" (click)="confirmDeleteCategory(category)" class="btn btn-outline-danger" title="Delete Category"><i class="bi bi-trash"></i></button>
                    <button *ngIf="category.isDeleted" (click)="restoreCategory(category.id)" class="btn btn-outline-success" title="Restore Category"><i class="bi bi-arrow-counterclockwise"></i></button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredCategories.length === 0">
                <td colspan="5" class="text-center text-muted py-4"><i class="bi bi-inbox fs-1 d-block mb-2"></i>No categories found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div *ngIf="showAddModal" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-bg-dark border-secondary">
            <div class="modal-header">
              <h5 class="modal-title">{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h5>
              <button type="button" class="btn-close btn-close-white" (click)="closeAddModal()"></button>
            </div>
            <form [formGroup]="categoryForm" (ngSubmit)="submitCategory()">
              <div class="modal-body">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">Category Name</label>
                  <input id="categoryName" type="text" class="form-control" formControlName="name" placeholder="Enter category name" />
                  <div *ngIf="categoryForm.get('name')?.invalid && categoryForm.get('name')?.touched" class="text-danger small mt-1">Category name is required</div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" type="button" (click)="closeAddModal()">Cancel</button>
                <button class="btn btn-danger" type="submit" [disabled]="categoryForm.invalid || isLoading">{{ isLoading ? 'Saving...' : (editingCategory ? 'Update' : 'Create') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- View Videos Modal -->
      <div *ngIf="showDetailsModal && selectedCategory" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content text-bg-dark border-secondary">
            <div class="modal-header">
              <h5 class="modal-title">Videos in "{{ selectedCategory?.name }}"</h5>
              <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="closeDetailsModal()"></button>
            </div>

            <div class="modal-body">
              <ul *ngIf="(selectedCategory?.videos || []).length > 0; else noVideos">
                <li *ngFor="let video of selectedCategory?.videos">
                  {{ video.title || 'Untitled Video' }}
                </li>
              </ul>

              <ng-template #noVideos>
                <div class="text-center  py-4">
                  <i class="bi bi-inbox fs-1 d-block "></i>
                  <p class="mb-0 ">This category has no videos.</p>
                </div>
              </ng-template>
            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="closeDetailsModal()">Close</button>
            </div>
          </div>
        </div>
      </div>



      <!-- Confirm Delete Modal -->
      <div *ngIf="showDeleteModal && selectedCategory" class="modal fade show d-block bg-dark bg-opacity-75" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-bg-dark border-danger">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Confirm Deletion</h5>
              <button type="button" class="btn-close btn-close-white" (click)="showDeleteModal = false"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete <strong>{{ selectedCategory.name }}</strong>? This action cannot be undone.
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" (click)="showDeleteModal = false">Cancel</button>
              <button class="btn btn-danger" (click)="performDeleteCategory()">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [/* keep your styles here, omitted for brevity */]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  searchTerm = '';
  filterType = '';
  showAddModal = false;
  showDetailsModal = false;
  showDeleteModal = false;
  isLoading = false;

  editingCategory: Category | null = null;
  selectedCategory: Category | null = null;

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

  constructor(private adminService: AdminService, private fb: FormBuilder) {
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
      .subscribe({
        next: (response) => {
          this.categories = response || [];
          this.filteredCategories = [...this.categories];
          console.log('Loaded categories:', this.categories);
          this.loadStatistics();

        },
        error: (err) => console.error('Failed to load categories', err)
      });
  }

  private loadStatistics(): void {
    this.adminService.getCategoryStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.statistics = {
            totalCategories: stats.totalCategories ?? this.categories.length,
            categoriesWithVideos: stats.categoriesWithVideos ?? this.categories.filter(c => c.videos?.length).length,
            emptyCategories: stats.emptyCategories ?? this.categories.filter(c => !c.videos?.length).length,
            totalVideos: stats.totalVideos ?? this.categories.reduce((sum, c) => sum + (c.videos?.length || 0), 0)
          };
        },
        error: () => this.statistics = {
          totalCategories: this.categories.length,
          categoriesWithVideos: this.categories.filter(c => c.videos?.length).length,
          emptyCategories: this.categories.filter(c => !c.videos?.length).length,
          totalVideos: this.categories.reduce((sum, c) => sum + (c.videos?.length || 0), 0)
        }
      });
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      const matchesSearch = !this.searchTerm || category.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const isArchived = category.isDeleted;
      if (this.filterType === 'archived') {
        return matchesSearch && isArchived;
      }
      const matchesFilter = !this.filterType ||
        (this.filterType === 'with-content' && category.videos?.length) ||
        (this.filterType === 'empty' && !category.videos?.length);
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
    this.categoryForm.patchValue({ name: category.name });
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

    const obs = this.editingCategory
      ? this.adminService.updateCategory(this.editingCategory.id, categoryData)
      : this.adminService.createCategory(categoryData);

    obs.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loadCategories();
        this.closeAddModal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error saving category:', err);
        this.isLoading = false;
      }
    });
  }

  viewCategoryVideos(category: Category): void {
    this.selectedCategory = category;
      console.log('Selected category for viewing videos:', category);
    this.showDetailsModal = true;
  }

  confirmDeleteCategory(category: Category): void {
    this.selectedCategory = category;
    this.showDeleteModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedCategory = null;
  }

  restoreCategory(id:number): void {
    this.adminService.restoreCategory(id).subscribe({
      next: () => {
        this.loadCategories();
        this.showDeleteModal = false;
        this.selectedCategory = null;
      },
      error: (err) => {
        console.error('Restore failed:', err);
        this.showDeleteModal = false;
      }
    })

  }
  performDeleteCategory(): void {
    if (!this.selectedCategory) return;
    this.adminService.deleteCategory(this.selectedCategory.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadCategories();
          this.showDeleteModal = false;
          this.selectedCategory = null;
        },
        error: (err) => {
          console.error('Delete failed:', err);
          this.showDeleteModal = false;
        }
      });
  }
}
