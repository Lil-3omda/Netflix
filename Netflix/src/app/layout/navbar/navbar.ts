import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  categories: string[] = [];
  // متغير لتتبع حالة التحميل (لإظهار/إخفاء عناصر التحميل)
  loading: boolean = true;
  // متغير لتخزين رسالة خطأ إذا حدثت مشكلة في جلب البيانات
  errorMessage: string | null = null;

  // حقن خدمة HttpClient للقيام بطلبات الـ API
  constructor(private http: HttpClient) {}

  // تُنفذ هذه الدالة عند تهيئة المكون
  ngOnInit(): void {
    this.fetchCategories();
  }

  // دالة لجلب الفئات من الـ API
  fetchCategories(): void {
    // عنوان الـ API الخاص بك
    const apiUrl = 'https://localhost:7140/api/Category/names';

    // استخدام HttpClient لجلب البيانات
    this.http.get<string[]>(apiUrl).subscribe({
      next: (data: string[]) => {
        // إذا نجح الطلب، قم بتخزين البيانات في متغير categories
        this.categories = data;
        this.loading = false; // انتهى التحميل
        this.errorMessage = null; // مسح أي رسائل خطأ سابقة

        // طباعة البيانات في الكونسول للتأكد من وصولها وشكلها
        console.log('Categories fetched successfully:', this.categories);

        // إذا كانت المصفوفة فارغة، اطبع رسالة إضافية للمساعدة
        if (this.categories.length === 0) {
          console.warn('The categories array is empty. No categories to display.');
        }
      },
      error: (err: HttpErrorResponse) => {
        // إذا فشل الطلب، اطبع رسالة خطأ
        console.error('Failed to load categories:', err);
        this.loading = false; // انتهى التحميل حتى لو كان بخطأ

        // تخزين رسالة الخطأ لعرضها في الواجهة إذا أردت
        this.errorMessage = `Failed to load categories. Please try again later. Error: ${err.message || 'Unknown error'}`;

        // يمكن هنا أيضاً عرض رسالة للمستخدم في الـ UI
      }
    });
  }
}