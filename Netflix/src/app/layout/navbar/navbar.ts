import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MovieCategory } from '../../core/services/movie-category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  categories: string[] = [];
//   // متغير لتتبع حالة التحميل (لإظهار/إخفاء عناصر التحميل)
//   loading: boolean = true;
//   // متغير لتخزين رسالة خطأ إذا حدثت مشكلة في جلب البيانات
//   errorMessage: string | null = null;

//   // حقن خدمة HttpClient للقيام بطلبات الـ API
//   constructor(private http: HttpClient) {}

//   // تُنفذ هذه الدالة عند تهيئة المكون
//   ngOnInit(): void {
//     this.fetchCategories();
//   }

//   // دالة لجلب الفئات من الـ API
//   fetchCategories(): void {
//     // عنوان الـ API الخاص بك
//     const apiUrl = 'https://localhost:7140/api/Category/names';

//     // استخدام HttpClient لجلب البيانات
//     this.http.get<string[]>(apiUrl).subscribe({
//       next: (data: string[]) => {
//         // إذا نجح الطلب، قم بتخزين البيانات في متغير categories
//         this.categories = data;
//         this.loading = false; // انتهى التحميل
//         this.errorMessage = null; // مسح أي رسائل خطأ سابقة

//         // طباعة البيانات في الكونسول للتأكد من وصولها وشكلها
//         console.log('Categories fetched successfully:', this.categories);

//         // إذا كانت المصفوفة فارغة، اطبع رسالة إضافية للمساعدة
//         if (this.categories.length === 0) {
//           console.warn('The categories array is empty. No categories to display.');
//         }
//       },
//       error: (err: HttpErrorResponse) => {
//         // إذا فشل الطلب، اطبع رسالة خطأ
//         console.error('Failed to load categories:', err);
//         this.loading = false; // انتهى التحميل حتى لو كان بخطأ

//         // تخزين رسالة الخطأ لعرضها في الواجهة إذا أردت
//         this.errorMessage = `Failed to load categories. Please try again later. Error: ${err.message || 'Unknown error'}`;

//         // يمكن هنا أيضاً عرض رسالة للمستخدم في الـ UI
//       }
//     });
  loading: boolean = true;
  errorMessage: string | null = null;
  isAuthenticated: boolean = false;
  currentUser: any = null;

  searchTerm: string = '';
showSearch: boolean = false;
movies: any[] = []; 
filteredMovies: any[] = []; 

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router,
    private movieService: MovieCategory,
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.checkAuthStatus();
     this.loadMovies();
    
    // Subscribe to auth status changes
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  private checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
  }

  fetchCategories(): void {
    const apiUrl = 'https://localhost:7140/api/Category/names';

    this.http.get<string[]>(apiUrl).subscribe({
      next: (data: string[]) => {
        this.categories = data;
        this.loading = false;
        this.errorMessage = null;
        console.log('Categories fetched successfully:', this.categories);

        if (this.categories.length === 0) {
          console.warn('The categories array is empty. No categories to display.');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load categories:', err);
        this.loading = false;
        this.errorMessage = `Failed to load categories. Please try again later. Error: ${err.message || 'Unknown error'}`;
      }
    });
  }

  logout(): void {
    // Clear all localStorage items related to authentication
    localStorage.removeItem('netflix_token');
    localStorage.removeItem('netflix_user');
    localStorage.removeItem('userId');
    
    // Clear any other Netflix-related localStorage items
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('netflix_') || key.includes('user') || key.includes('auth')) {
        localStorage.removeItem(key);
      }
    });

    // Use AuthService logout method
    this.authService.logout();
    
    // Navigate to home page
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    if (this.isAuthenticated) {
      this.router.navigate(['/profile']);
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
toggleSearch() {
  this.showSearch = !this.showSearch;

  if (!this.showSearch) {
    this.searchTerm = '';
    this.filteredMovies = [];
  }
}

loadMovies() {
  this.movieService.getAllMovies().subscribe({
    next: data => {
      this.movies = data;
       console.log('Movies loaded:', this.movies);
       
    },
    error: err => {
      console.error('Error loading movies:', err);
      this.movies = [];
    }
  });
}

onSearch() {
  const term = this.searchTerm.toLowerCase();
  this.filteredMovies = this.movies.filter(movie =>
    movie.title.toLowerCase().includes(term)
  );
}
goToMovie(id: number) {
  this.router.navigate(['/moviedetails', id]);
  this.showSearch = false;
  this.searchTerm = '';
  this.filteredMovies = [];
}
}