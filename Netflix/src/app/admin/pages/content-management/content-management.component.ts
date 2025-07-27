import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Content } from '../../models/admin.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-netflix-black text-white">
      <!-- Hero Header -->
      <div class="relative overflow-hidden bg-gradient-to-r from-netflix-red via-red-700 to-netflix-red-dark rounded-3xl mb-8 p-8">
        <div class="absolute inset-0 bg-black bg-opacity-20"></div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h1 class="text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Content Library
            </h1>
            <p class="text-xl text-red-100">
              Manage your Netflix movies, series, and originals
            </p>
          </div>
          <button
            (click)="openAddContentModal()"
            class="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl text-white font-semibold hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30 flex items-center space-x-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Add Content</span>
          </button>
        </div>
        <div class="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-netflix-red transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Total Content</p>
              <p class="text-3xl font-bold text-white">{{ totalContent }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-netflix-red to-red-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Published</p>
              <p class="text-3xl font-bold text-white">{{ publishedContent }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Draft</p>
              <p class="text-3xl font-bold text-white">{{ draftContent }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-400 text-sm font-medium">Total Views</p>
              <p class="text-3xl font-bold text-white">{{ totalViews }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 mb-8">
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="filterContent()"
              placeholder="Search content by title, genre, or description..."
              class="w-full pl-10 pr-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 placeholder-gray-400">
          </div>

          <div class="flex gap-4">
            <select
              [(ngModel)]="typeFilter"
              (change)="filterContent()"
              class="px-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 min-w-[120px]">
              <option value="">All Types</option>
              <option value="Movie">Movies</option>
              <option value="Series">Series</option>
            </select>

            <select
              [(ngModel)]="statusFilter"
              (change)="filterContent()"
              class="px-4 py-3 bg-gray-800 bg-opacity-50 text-white rounded-xl border border-gray-600 focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-20 transition-all duration-300 min-w-[120px]">
              <option value="">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>

            <button class="px-6 py-3 bg-netflix-red hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-300 flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
          *ngFor="let content of filteredContent; trackBy: trackByContentId"
          class="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-netflix-red transition-all duration-500 hover:scale-105 cursor-pointer">

          <!-- Thumbnail -->
          <div class="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
            <div
              class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
              [style.background-image]="content.thumbnail ? 'url(' + content.thumbnail + ')' : 'none'">

              <!-- Default thumbnail icon if no image -->
              <div *ngIf="!content.thumbnail" class="w-16 h-16 bg-netflix-red bg-opacity-20 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-netflix-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1V4m8 0H8m0 0v16h8V4M8 8h8m-8 4h8"></path>
                </svg>
              </div>
            </div>

            <!-- Overlay with play button -->
            <div class="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                (click)="playContent(content)"
                class="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300 shadow-lg">
                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-3 left-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                [ngClass]="{
                  'bg-green-500 text-white': content.status === 'Published',
                  'bg-yellow-500 text-black': content.status === 'Draft',
                  'bg-gray-500 text-white': content.status === 'Archived'
                }">
                {{ content.status }}
              </span>
            </div>

            <!-- Type Badge -->
            <div class="absolute top-3 right-3">
              <span
                class="px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                [ngClass]="{
                  'bg-blue-500 text-white': content.type === 'Movie',
                  'bg-purple-500 text-white': content.type === 'Series'
                }">
                {{ content.type }}
              </span>
            </div>
          </div>

          <!-- Content Info -->
          <div class="p-6">
            <h3 class="font-bold text-white text-lg mb-2 group-hover:text-netflix-red transition-colors duration-300 line-clamp-1">
              {{ content.title }}
            </h3>
            <p class="text-gray-400 text-sm mb-3 line-clamp-2">{{ content.description }}</p>

            <!-- Genre and Rating -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-2 py-1 bg-gray-700 rounded-lg text-xs text-gray-300">
                {{ content.genre }}
              </span>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm text-gray-300">{{ content.rating || 'N/A' }}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>{{ content.views || '0' }} views</span>
              <span>{{ content.duration || 'N/A' }}</span>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button
                (click)="editContent(content)"
                class="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span>Edit</span>
              </button>
              <button
                (click)="deleteContent(content)"
                class="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div class="text-center">
        <button class="px-8 py-4 bg-gradient-to-r from-netflix-red to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg">
          Load More Content
        </button>
      </div>

      <!-- Add Content Modal -->
      <div
        *ngIf="showAddModal"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">Add New Content</h2>
            <button
              (click)="closeAddModal()"
              class="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form [formGroup]="contentForm" (ngSubmit)="submitContent()" class="space-y-6">
            <!-- Form fields would go here -->
            <div class="text-center text-gray-400">
              <p>Content upload form will be implemented here</p>
            </div>

            <div class="flex space-x-4 pt-4">
              <button
                type="button"
                (click)="closeAddModal()"
                class="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-medium transition-all duration-300">
                Cancel
              </button>
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-netflix-red hover:bg-red-700 rounded-xl text-white font-medium transition-all duration-300">
                Add Content
              </button>
            </div>
          </form>
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

    .line-clamp-1 {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
export class ContentManagementComponent implements OnInit, OnDestroy {
  searchTerm = '';
  typeFilter = '';
  statusFilter = '';
  showAddModal = false;
  contentForm: FormGroup;

  // Sample data
  content: Content[] = [
    {
      id: 1,
      title: 'Stranger Things 4',
      description: 'The supernatural drama returns with more thrills and mysteries from the Upside Down.',
      type: 'Series',
      genre: 'Sci-Fi',
      status: 'Published',
      thumbnail: '',
      rating: 8.7,
      views: '1.2B',
      duration: '8 episodes',
      releaseDate: '2022-05-27'
    },
    {
      id: 2,
      title: 'The Gray Man',
      description: 'A CIA operative on the run from his own agency in this action-packed thriller.',
      type: 'Movie',
      genre: 'Action',
      status: 'Published',
      thumbnail: '',
      rating: 6.5,
      views: '856M',
      duration: '2h 2m',
      releaseDate: '2022-07-22'
    },
    {
      id: 3,
      title: 'Wednesday',
      description: 'The Addams Family daughter navigates her years at Nevermore Academy.',
      type: 'Series',
      genre: 'Comedy',
      status: 'Published',
      thumbnail: '',
      rating: 8.1,
      views: '987M',
      duration: '8 episodes',
      releaseDate: '2022-11-23'
    },
    {
      id: 4,
      title: 'Upcoming Project',
      description: 'A mysterious new thriller coming soon to Netflix.',
      type: 'Movie',
      genre: 'Thriller',
      status: 'Draft',
      thumbnail: '',
      rating: 0,
      views: '0',
      duration: '2h 15m',
      releaseDate: '2024-12-01'
    }
  ];

  filteredContent: Content[] = [];

  // Stats
  totalContent = 0;
  publishedContent = 0;
  draftContent = 0;
  totalViews = '';

  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['Draft', Validators.required]
    });
  }

  ngOnInit(): void {
    this.filteredContent = [...this.content];
    this.calculateStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculateStats(): void {
    this.totalContent = this.content.length;
    this.publishedContent = this.content.filter(c => c.status === 'Published').length;
    this.draftContent = this.content.filter(c => c.status === 'Draft').length;

    // Calculate total views (simplified)
    let totalViewsNum = 0;
    this.content.forEach(c => {
      if (c.views) {
        const viewStr = c.views.replace(/[^\d.]/g, '');
        const multiplier = c.views.includes('B') ? 1000000000 : c.views.includes('M') ? 1000000 : 1;
        totalViewsNum += parseFloat(viewStr) * multiplier;
      }
    });

    if (totalViewsNum >= 1000000000) {
      this.totalViews = (totalViewsNum / 1000000000).toFixed(1) + 'B';
    } else if (totalViewsNum >= 1000000) {
      this.totalViews = (totalViewsNum / 1000000).toFixed(1) + 'M';
    } else {
      this.totalViews = totalViewsNum.toString();
    }
  }

  filterContent(): void {
    this.filteredContent = this.content.filter(content => {
      const matchesSearch = !this.searchTerm ||
        content.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (content.description ?? '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        content.genre.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = !this.typeFilter || content.type === this.typeFilter;
      const matchesStatus = !this.statusFilter || content.status === this.statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }

  trackByContentId(index: number, content: Content): string {
    return content.id.toString();
  }

  openAddContentModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.contentForm.reset();
  }

  submitContent(): void {
    if (this.contentForm.valid) {
      // Handle form submission
      console.log('Content form submitted:', this.contentForm.value);
      this.closeAddModal();
    }
  }

  playContent(content: Content): void {
    console.log('Playing content:', content.title);
  }

  editContent(content: Content): void {
    console.log('Editing content:', content.title);
  }

  deleteContent(content: Content): void {
    if (confirm(`Are you sure you want to delete "${content.title}"?`)) {
      this.content = this.content.filter(c => c.id !== content.id);
      this.filterContent();
      this.calculateStats();
    }
  }
}
