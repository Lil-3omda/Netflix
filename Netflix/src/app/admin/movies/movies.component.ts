import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="movies-container">
      <div class="movies-header">
        <h1>Movies & Shows Management</h1>
        <button class="add-btn" (click)="showAddForm = !showAddForm">
          + Add New Content
        </button>
      </div>

      <div *ngIf="showAddForm" class="add-form">
        <h3>Add New Movie/Show</h3>
        <form (ngSubmit)="addMovie()" class="movie-form">
          <div class="form-row">
            <input [(ngModel)]="newMovie.title" name="title" placeholder="Title" required>
            <input [(ngModel)]="newMovie.director" name="director" placeholder="Director" required>
          </div>
          
          <div class="form-row">
            <input [(ngModel)]="newMovie.duration" name="duration" type="number" placeholder="Duration (minutes)" required>
            <input [(ngModel)]="newMovie.rating" name="rating" type="number" step="0.1" max="10" placeholder="Rating" required>
          </div>
          
          <textarea [(ngModel)]="newMovie.description" name="description" placeholder="Description" required></textarea>
          
          <div class="form-row">
            <input [(ngModel)]="genreInput" name="genre" placeholder="Genres (comma separated)">
            <input [(ngModel)]="castInput" name="cast" placeholder="Cast (comma separated)">
          </div>
          
          <div class="form-row">
            <input [(ngModel)]="newMovie.posterUrl" name="posterUrl" placeholder="Poster URL">
            <select [(ngModel)]="newMovie.status" name="status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="coming-soon">Coming Soon</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="save-btn">Save Movie</button>
            <button type="button" (click)="cancelAdd()" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>

      <div class="movies-grid">
        <div *ngFor="let movie of movies" class="movie-card">
          <img [src]="movie.posterUrl" [alt]="movie.title" class="movie-poster">
          
          <div class="movie-info">
            <h3>{{movie.title}}</h3>
            <p class="director">By {{movie.director}}</p>
            <p class="genre">{{movie.genre.join(', ')}}</p>
            <div class="movie-stats">
              <span class="rating">⭐ {{movie.rating}}</span>
              <span class="duration">🕐 {{movie.duration}}min</span>
              <span class="status" [class]="'status-' + movie.status">{{movie.status}}</span>
            </div>
            
            <div class="movie-actions">
              <button (click)="editMovie(movie)" class="edit-btn">Edit</button>
              <button (click)="deleteMovie(movie.id)" class="delete-btn">Delete</button>
              <button (click)="toggleStatus(movie)" class="status-btn">
                {{movie.status === 'active' ? 'Deactivate' : 'Activate'}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .movies-container {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .movies-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .movies-header h1 {
      margin: 0;
      color: #E50914;
    }

    .add-btn {
      background: #E50914;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .add-btn:hover {
      background: #b8070f;
    }

    .add-form {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      margin-bottom: 30px;
      border: 1px solid #333;
    }

    .add-form h3 {
      margin: 0 0 20px 0;
      color: #E50914;
    }

    .movie-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }

    .form-row input, .form-row select, textarea {
      padding: 12px;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
    }

    .form-row input:focus, .form-row select:focus, textarea:focus {
      outline: none;
      border-color: #E50914;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .save-btn {
      background: #E50914;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .cancel-btn {
      background: #666;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
    }

    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 25px;
    }

    .movie-card {
      background: #1a1a1a;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #333;
      transition: transform 0.3s ease;
    }

    .movie-card:hover {
      transform: translateY(-5px);
      border-color: #E50914;
    }

    .movie-poster {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .movie-info {
      padding: 20px;
    }

    .movie-info h3 {
      margin: 0 0 5px 0;
      font-size: 1.2rem;
      color: #fff;
    }

    .director {
      margin: 0 0 5px 0;
      color: #ccc;
      font-size: 0.9rem;
    }

    .genre {
      margin: 0 0 15px 0;
      color: #999;
      font-size: 0.85rem;
    }

    .movie-stats {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
      font-size: 0.85rem;
    }

    .rating {
      color: #ffd700;
    }

    .duration {
      color: #ccc;
    }

    .status {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-active {
      background: #22c55e;
      color: white;
    }

    .status-inactive {
      background: #ef4444;
      color: white;
    }

    .status-coming-soon {
      background: #f59e0b;
      color: white;
    }

    .movie-actions {
      display: flex;
      gap: 8px;
    }

    .edit-btn, .delete-btn, .status-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }

    .edit-btn {
      background: #3b82f6;
      color: white;
    }

    .delete-btn {
      background: #ef4444;
      color: white;
    }

    .status-btn {
      background: #6b7280;
      color: white;
      flex: 1;
    }

    .edit-btn:hover {
      background: #2563eb;
    }

    .delete-btn:hover {
      background: #dc2626;
    }

    .status-btn:hover {
      background: #4b5563;
    }

    @media (max-width: 768px) {
      .movies-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .movies-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  showAddForm = false;
  genreInput = '';
  castInput = '';
  
  newMovie: Partial<Movie> = {
    title: '',
    description: '',
    genre: [],
    duration: 0,
    rating: 0,
    director: '',
    cast: [],
    posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    status: 'active'
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  addMovie(): void {
    const movieToAdd = {
      ...this.newMovie,
      genre: this.genreInput.split(',').map(g => g.trim()),
      cast: this.castInput.split(',').map(c => c.trim()),
      releaseDate: new Date(),
      trailerUrl: '',
      contentUrl: ''
    } as Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>;

    this.adminService.addMovie(movieToAdd).subscribe(() => {
      this.resetForm();
      this.showAddForm = false;
    });
  }

  editMovie(movie: Movie): void {
    console.log('Edit movie:', movie);
  }

  deleteMovie(id: string): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.adminService.deleteMovie(id).subscribe();
    }
  }

  toggleStatus(movie: Movie): void {
    const newStatus = movie.status === 'active' ? 'inactive' : 'active';
    this.adminService.updateMovie(movie.id, { status: newStatus }).subscribe();
  }

  cancelAdd(): void {
    this.resetForm();
    this.showAddForm = false;
  }

  resetForm(): void {
    this.newMovie = {
      title: '',
      description: '',
      genre: [],
      duration: 0,
      rating: 0,
      director: '',
      cast: [],
      posterUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      status: 'active'
    };
    this.genreInput = '';
    this.castInput = '';
  }
}