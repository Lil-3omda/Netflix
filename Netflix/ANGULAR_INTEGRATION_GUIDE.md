# دليل دمج Angular مع Controllers

## نظرة عامة

تم إنشاء تكامل كامل بين تطبيق Angular والـ controllers الخاصة بالـ `FavoriteController` و `WatchProgressController` في الـ backend. هذا الدليل يوضح كيفية استخدام المكونات والخدمات المُنشأة.

## الملفات المُنشأة

### 1. الخدمات (Services)

#### `src/app/core/services/favorite.service.ts`
- **الوظيفة**: التعامل مع API الخاص بالمفضلة
- **المميزات**:
  - جلب قائمة المفضلة لملف شخصي معين
  - إضافة فيديو للمفضلة
  - حذف فيديو من المفضلة
  - التحقق من وجود فيديو في المفضلة

#### `src/app/core/services/watch-progress.service.ts`
- **الوظيفة**: إدارة تقدم المشاهدة
- **المميزات**:
  - جلب تقدم المشاهدة لفيديو معين
  - حفظ/تحديث تقدم المشاهدة
  - تحويل بين أشكال الوقت المختلفة (ثوانٍ ↔ TimeSpan)
  - حساب النسبة المئوية للتقدم

### 2. المكونات (Components)

#### `src/app/shared/components/favorite-button/favorite-button.component.ts`
- **الوظيفة**: زر للتحكم في المفضلة
- **المميزات**:
  - تغيير حالة المفضلة (إضافة/حذف)
  - عرض حالة المفضلة الحالية
  - رسوم متحركة وتفاعل بصري
  - tooltip يوضح الإجراء

#### `src/app/shared/components/video-progress/video-progress.component.ts`
- **الوظيفة**: عرض وإدارة تقدم المشاهدة
- **المميزات**:
  - عرض شريط التقدم التفاعلي
  - حفظ تلقائي للتقدم
  - إمكانية الانتقال لموضع معين
  - أزرار استئناف وإعادة تشغيل

#### `src/app/features/favorites/favorites-page.component.ts`
- **الوظيفة**: صفحة عرض قائمة المفضلة
- **المميزات**:
  - عرض جميع الفيديوهات المفضلة
  - تبديل بين عرض الشبكة والقائمة
  - إزالة من المفضلة مباشرة
  - حالات التحميل والفراغ

#### `src/app/features/video-player/video-player.component.ts`
- **الوظيفة**: مشغل الفيديو الكامل
- **المميزات**:
  - تشغيل الفيديو مع تحكم كامل
  - دمج زر المفضلة وتقدم المشاهدة
  - مشاركة وتحميل الفيديو
  - واجهة مستخدم تفاعلية

## كيفية الاستخدام

### 1. إعداد المشروع

تأكد من أن الـ environment يحتوي على رابط الـ API الصحيح:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7140/api' // رابط الـ API الخاص بك
};
```

### 2. استخدام زر المفضلة

```html
<app-favorite-button
  [profileId]="currentProfileId"
  [videoId]="videoId"
  [videoTitle]="videoTitle"
  [videoDescription]="videoDescription"
  (favoriteChanged)="onFavoriteChanged($event)">
</app-favorite-button>
```

### 3. استخدام مكون تقدم المشاهدة

```html
<app-video-progress
  [profileId]="profileId"
  [videoId]="videoId"
  [videoDurationInSeconds]="videoDuration"
  [currentVideoTime]="currentTime"
  [autoSaveInterval]="15"
  (seekRequested)="seekToTime($event)"
  (resumeRequested)="onResumeRequested()"
  (restartRequested)="onRestartRequested()">
</app-video-progress>
```

### 4. استخدام الخدمات في مكون

```typescript
import { FavoriteService } from '../core/services/favorite.service';
import { WatchProgressService } from '../core/services/watch-progress.service';

export class MyComponent {
  constructor(
    private favoriteService: FavoriteService,
    private watchProgressService: WatchProgressService
  ) {}

  // إضافة للمفضلة
  addToFavorites(profileId: number, videoId: number) {
    this.favoriteService.addFavorite({ profileId, videoId }).subscribe({
      next: (response) => console.log(response.message),
      error: (err) => console.error(err)
    });
  }

  // حفظ التقدم
  saveProgress(profileId: number, videoId: number, currentTimeInSeconds: number) {
    this.watchProgressService.updateProgressInSeconds(profileId, videoId, currentTimeInSeconds)
      .subscribe({
        next: (response) => console.log('Progress saved'),
        error: (err) => console.error(err)
      });
  }
}
```

## إضافة Routes

أضف المسارات التالية لملف `app.routes.ts`:

```typescript
import { FavoritesPageComponent } from './features/favorites/favorites-page.component';
import { VideoPlayerComponent } from './features/video-player/video-player.component';

export const routes: Routes = [
  // ... المسارات الأخرى
  { path: 'favorites', component: FavoritesPageComponent },
  { path: 'watch/:id', component: VideoPlayerComponent },
];
```

## أمثلة للتخصيص

### تخصيص زر المفضلة

```typescript
// تغيير شكل الزر
.favorite-btn {
  background: linear-gradient(45deg, #e50914, #f40612);
  border-radius: 8px; // شكل مستطيل بدلاً من دائري
}
```

### تخصيص شريط التقدم

```typescript
// تغيير ألوان شريط التقدم
.progress-fill {
  background: linear-gradient(90deg, #1DB954, #1ED760); // أخضر Spotify
}
```

### حفظ تلقائي مُخصص

```typescript
// تغيير فترة الحفظ التلقائي
<app-video-progress
  [autoSaveInterval]="30" // حفظ كل 30 ثانية
  ...>
</app-video-progress>
```

## نصائح للتطوير

### 1. إدارة حالة الـ Profile

```typescript
// استخدم service لإدارة الـ profile الحالي
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private currentProfileId = new BehaviorSubject<number>(1);
  
  getCurrentProfileId(): Observable<number> {
    return this.currentProfileId.asObservable();
  }
  
  setCurrentProfileId(id: number) {
    this.currentProfileId.next(id);
  }
}
```

### 2. Caching للمفضلة

```typescript
// إضافة caching لتحسين الأداء
@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private favoritesCache = new Map<number, FavoriteDto[]>();
  
  getFavoritesByProfileId(profileId: number): Observable<FavoriteDto[]> {
    if (this.favoritesCache.has(profileId)) {
      return of(this.favoritesCache.get(profileId)!);
    }
    
    return this.http.get<FavoriteDto[]>(`${this.apiUrl}/profile/${profileId}`)
      .pipe(
        tap(favorites => this.favoritesCache.set(profileId, favorites))
      );
  }
}
```

### 3. Error Handling محسن

```typescript
// إضافة error handling أفضل
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} failed: ${error.message}`);
    
    // يمكن إضافة notification service هنا
    this.notificationService.showError(`خطأ في ${operation}`);
    
    return of(result as T);
  };
}
```

## المتطلبات

### Dependencies مطلوبة

تأكد من وجود هذه الـ packages في `package.json`:

```json
{
  "@angular/common": "^17.0.0",
  "@angular/core": "^17.0.0",
  "@angular/router": "^17.0.0",
  "rxjs": "^7.5.0"
}
```

### Imports مطلوبة

في `app.config.ts`:

```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... providers أخرى
    provideHttpClient(),
  ]
};
```

## الخطوات التالية

1. **إضافة Authentication**: ربط الـ services بنظام المصادقة
2. **إضافة Notifications**: عرض رسائل النجاح والخطأ
3. **Offline Support**: حفظ البيانات محلياً عند انقطاع الاتصال
4. **Performance Optimization**: إضافة lazy loading وcaching
5. **Unit Tests**: كتابة اختبارات للمكونات والخدمات

هذا التكامل يوفر أساساً قوياً لتطبيق Netflix-like مع مميزات المفضلة وتتبع تقدم المشاهدة!