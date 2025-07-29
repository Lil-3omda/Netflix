# Favorites Feature Implementation

This implementation provides a complete favorites system that integrates with the Netflix.API FavoriteController. It includes components, services, and styling that follow Netflix's design patterns.

## 🚀 Quick Start

### 1. Import the FavoritesModule

Add the FavoritesModule to your main app module or feature module:

```typescript
import { FavoritesModule } from './features/favorites/favorites.module';

@NgModule({
  imports: [
    // ... other imports
    FavoritesModule
  ],
  // ...
})
export class AppModule { }
```

### 2. Add Routing (Optional)

To enable the standalone favorites page, add the route to your routing module:

```typescript
import { FavoritesPageComponent } from './features/favorites/pages/favorites-page/favorites-page.component';

const routes: Routes = [
  {
    path: 'favorites',
    component: FavoritesPageComponent,
    canActivate: [AuthGuard] // Optional: protect with authentication
  },
  // ... other routes
];
```

### 3. Add Navigation Link

Add a link to the favorites page in your navigation:

```html
<a routerLink="/favorites" class="nav-link">
  My List
</a>
```

## 📦 Components

### FavoriteButtonComponent

A reusable button component for adding/removing videos from favorites.

#### Usage:

```html
<!-- Icon variant (for overlays) -->
<app-favorite-button 
  [videoId]="video.id"
  [profileId]="currentProfileId"
  size="medium"
  variant="icon">
</app-favorite-button>

<!-- Button variant (for action areas) -->
<app-favorite-button 
  [videoId]="video.id"
  [profileId]="currentProfileId"
  variant="button"
  [showText]="true"
  size="small">
</app-favorite-button>
```

#### Properties:
- `videoId: number` - ID of the video
- `profileId: number` - ID of the current profile
- `size: 'small' | 'medium' | 'large'` - Button size (default: 'medium')
- `variant: 'icon' | 'button'` - Button style (default: 'icon')
- `showText: boolean` - Show text in button variant (default: false)

### FavoritesListComponent

Displays a list/grid of favorite videos with management capabilities.

#### Usage:

```html
<!-- Full page list -->
<app-favorites-list 
  [profileId]="currentProfileId"
  layout="grid">
</app-favorites-list>

<!-- Preview section (limited items) -->
<app-favorites-list 
  [profileId]="currentProfileId"
  [maxItems]="6"
  layout="row"
  [showTitle]="true">
</app-favorites-list>
```

#### Properties:
- `profileId: number` - ID of the current profile
- `showTitle: boolean` - Show section title (default: true)
- `maxItems?: number` - Limit number of items shown
- `layout: 'grid' | 'row'` - Layout style (default: 'grid')

### FavoritesPageComponent

A complete page component for displaying all favorites.

#### Usage:

```html
<app-favorites-page></app-favorites-page>
```

## 🔧 Services

### FavoriteService

Central service for managing favorites data and API interactions.

#### Key Methods:

```typescript
// Get favorites for a profile
getFavoritesByProfileId(profileId: number): Observable<Favorite[]>

// Add video to favorites
addToFavorites(profileId: number, videoId: number): Observable<FavoriteResponse>

// Remove video from favorites
removeFromFavorites(profileId: number, videoId: number): Observable<FavoriteResponse>

// Toggle favorite status
toggleFavorite(profileId: number, videoId: number): Observable<FavoriteResponse>

// Check if video is favorited
isVideoFavorite(videoId: number): boolean

// Get current favorites (cached)
getCurrentFavorites(): Favorite[]

// Clear favorites cache
clearFavorites(): void
```

#### Observables:

```typescript
// Subscribe to favorites changes
favoriteService.favorites$.subscribe(favorites => {
  // Handle favorites update
});

// Subscribe to favorite video IDs (for quick lookup)
favoriteService.favoriteVideoIds$.subscribe(videoIds => {
  // Handle favorite IDs update
});
```

## 🎨 Integration Examples

### 1. Video Card Integration

```typescript
@Component({
  selector: 'app-video-card',
  template: `
    <div class="video-card">
      <div class="video-thumbnail">
        <img [src]="video.imageUrl" [alt]="video.title">
        
        <!-- Add favorite button in overlay -->
        <div class="video-overlay">
          <app-favorite-button 
            [videoId]="video.id"
            [profileId]="currentProfileId"
            size="medium">
          </app-favorite-button>
        </div>
      </div>
      
      <div class="video-info">
        <h3>{{ video.title }}</h3>
        <!-- Add favorite button in actions -->
        <app-favorite-button 
          [videoId]="video.id"
          [profileId]="currentProfileId"
          variant="button"
          [showText]="true">
        </app-favorite-button>
      </div>
    </div>
  `
})
export class VideoCardComponent {
  @Input() video: Video;
  @Input() currentProfileId: number;
}
```

### 2. Home Page Integration

```typescript
@Component({
  selector: 'app-home',
  template: `
    <div class="home-page">
      <!-- Other sections -->
      
      <!-- Favorites preview section -->
      <section class="favorites-section">
        <app-favorites-list 
          [profileId]="currentProfileId"
          [maxItems]="8"
          layout="grid">
        </app-favorites-list>
      </section>
    </div>
  `
})
export class HomeComponent {
  currentProfileId: number = 1; // Get from profile service
}
```

### 3. Video Detail Page Integration

```typescript
@Component({
  selector: 'app-video-detail',
  template: `
    <div class="video-detail">
      <div class="video-actions">
        <button class="play-btn">Play</button>
        
        <!-- Large favorite button -->
        <app-favorite-button 
          [videoId]="video.id"
          [profileId]="currentProfileId"
          variant="button"
          [showText]="true"
          size="large">
        </app-favorite-button>
      </div>
    </div>
  `
})
export class VideoDetailComponent {
  @Input() video: Video;
  currentProfileId: number = 1; // Get from profile service
}
```

## 🔗 Backend Integration

The components work with the FavoriteController endpoints:

- `GET /api/Favorite/profile/{profileId}` - Get favorites
- `POST /api/Favorite` - Add to favorites
- `DELETE /api/Favorite/{profileId}/{videoId}` - Remove from favorites

### Expected API Response Format:

```typescript
// Favorite object
interface Favorite {
  id: number;
  profileId: number;
  videoId: number;
  addedAt: Date;
  video?: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    duration: string;
    type: VideoType;
    categoryName: string;
  };
}

// Success response
interface FavoriteResponse {
  message: string;
}
```

## 🎨 Customization

### Styling

The components use CSS custom properties for easy theming:

```css
:root {
  --netflix-red: #e50914;
  --netflix-red-hover: #f40612;
  --netflix-dark: #0c0c0c;
  --netflix-gray: #1a1a1a;
}
```

### Icons

The components use SVG icons. You can replace them with your preferred icon library:

```typescript
// In favorite-button.component.html
<!-- Replace SVG with your icon component -->
<your-icon name="heart" [filled]="isFavorite"></your-icon>
```

## 📱 Mobile Responsiveness

All components are fully responsive with:
- Touch-friendly button sizes
- Optimized layouts for mobile
- Reduced motion support
- High contrast mode support

## ♿ Accessibility

The implementation includes:
- ARIA labels and titles
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- High contrast mode support

## 🚀 Performance

Features for optimal performance:
- Lazy loading of images
- Observable-based state management
- OnPush change detection ready
- Efficient caching with BehaviorSubject
- TrackBy functions for ngFor loops

## 🔧 Environment Configuration

Make sure your `environment.ts` includes the API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7140/api'
};
```

## 🐛 Error Handling

The service includes comprehensive error handling:
- Network error recovery
- User-friendly error messages
- Loading states
- Retry functionality

## 📈 Future Enhancements

Potential improvements:
- Offline favorites support
- Favorites sync across devices
- Favorites categories/tags
- Social sharing of favorites
- Export favorites list
- Bulk favorites management

---

## 📞 Support

For issues or questions about the favorites implementation, check:
1. Browser console for error messages
2. Network tab for API call failures
3. Component documentation above
4. Backend FavoriteController logs