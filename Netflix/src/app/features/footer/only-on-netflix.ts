import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { MovieService } from '../../core/services/movie.service';
// import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-only-on-netflix',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="only-on-netflix-page">
      <header class="page-header">
        <div class="header-content">
          <div class="netflix-logo" (click)="goHome()">
            <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path>
              </g>
            </svg>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="container">
          <section class="hero-section">
            <h1>Only on Netflix</h1>
            <p>Netflix originals, exclusive series, and award-winning content you can't find anywhere else.</p>
          </section>

          <section class="content-categories">
            <div class="category-card">
              <div class="category-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <polygon points="23 7 16 12 23 17 23 7" stroke="#e50914" stroke-width="2" fill="#e50914"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="#e50914" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <h3>Netflix Series</h3>
              <p>Binge-worthy original series created exclusively for Netflix members.</p>
            </div>

            <div class="category-card">
              <div class="category-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" stroke="#e50914" stroke-width="2" fill="none"/>
                  <line x1="7" y1="2" x2="7" y2="22" stroke="#e50914" stroke-width="2"/>
                  <line x1="17" y1="2" x2="17" y2="22" stroke="#e50914" stroke-width="2"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#e50914" stroke-width="2"/>
                  <line x1="2" y1="7" x2="7" y2="7" stroke="#e50914" stroke-width="2"/>
                  <line x1="2" y1="17" x2="7" y2="17" stroke="#e50914" stroke-width="2"/>
                  <line x1="17" y1="17" x2="22" y2="17" stroke="#e50914" stroke-width="2"/>
                  <line x1="17" y1="7" x2="22" y2="7" stroke="#e50914" stroke-width="2"/>
                </svg>
              </div>
              <h3>Netflix Films</h3>
              <p>Award-winning movies and documentaries produced by Netflix.</p>
            </div>

            <div class="category-card">
              <div class="category-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12L11 14L15 10" stroke="#e50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#e50914" stroke-width="2"/>
                </svg>
              </div>
              <h3>Award Winners</h3>
              <p>Emmy, Oscar, and Golden Globe winning content exclusive to Netflix.</p>
            </div>
          </section>

          <section class="featured-content" *ngIf="featuredMovies.length > 0">
            <h2>Featured Netflix Originals</h2>
            <div class="movies-grid">
              <div class="movie-card" *ngFor="let movie of featuredMovies">
                <!-- <img [src]="getImageUrl(movie)" [alt]="movie.title" class="movie-poster"> -->
                <img src="#" [alt]="movie.title" class="movie-poster">
                <div class="movie-info">
                  <h4>{{ movie.title }}</h4>
                  <p>{{ movie.overview | slice:0:100 }}...</p>
                  <div class="movie-rating">
                    <span class="rating">★ {{ movie.vote_average | number:'1.1-1' }}</span>
                    <span class="year">{{ getYear(movie.release_date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="why-netflix-originals">
            <h2>Why Netflix Originals?</h2>
            <div class="reasons-grid">
              <div class="reason-item">
                <h4>Global Stories</h4>
                <p>Content from creators around the world, bringing diverse perspectives and cultures to your screen.</p>
              </div>
              <div class="reason-item">
                <h4>Creative Freedom</h4>
                <p>Netflix gives creators the freedom to tell their stories without traditional broadcast limitations.</p>
              </div>
              <div class="reason-item">
                <h4>Quality Production</h4>
                <p>High production values with top-tier talent both in front of and behind the camera.</p>
              </div>
              <div class="reason-item">
                <h4>Exclusive Access</h4>
                <p>Watch Netflix originals the moment they're released, available only to Netflix members.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer class="page-footer">
        <div class="footer-content">
          <p>Questions? Call 1-844-505-2993</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .only-on-netflix-page {
      min-height: 100vh;
      background: #000;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .page-header {
      padding: 20px 0;
      border-bottom: 1px solid #333;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      height: 45px;
      width: auto;
      fill: #e50914;
    }

    .main-content {
      padding: 60px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-section p {
      font-size: 1.2rem;
      color: #999;
      max-width: 600px;
      margin: 0 auto;
    }

    .content-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .category-card {
      text-align: center;
      padding: 2rem;
      background: #111;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
    }

    .category-icon {
      margin-bottom: 1rem;
    }

    .category-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #e50914;
    }

    .category-card p {
      color: #999;
      line-height: 1.5;
    }

    .featured-content {
      margin-bottom: 4rem;
    }

    .featured-content h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }

    .movies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .movie-card {
      background: #111;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .movie-card:hover {
      transform: scale(1.05);
    }

    .movie-poster {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }

    .movie-info {
      padding: 1.5rem;
    }

    .movie-info h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    .movie-info p {
      color: #999;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    .movie-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rating {
      color: #e50914;
      font-weight: 600;
    }

    .year {
      color: #999;
      font-size: 0.9rem;
    }

    .why-netflix-originals h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }

    .reasons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .reason-item {
      padding: 1.5rem;
      background: #111;
      border-radius: 8px;
      border-left: 3px solid #e50914;
    }

    .reason-item h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    .reason-item p {
      color: #999;
      line-height: 1.5;
    }

    .page-footer {
      border-top: 1px solid #333;
      padding: 30px 0;
      text-align: center;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content p {
      color: #999;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem;
      }

      .content-categories {
        grid-template-columns: 1fr;
      }

      .movies-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }

      .reasons-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OnlyOnNetflixComponent implements OnInit {
  // featuredMovies: Movie[] = [];
  featuredMovies: any[] = [
    { title: 'Stranger Things', overview: 'A group of kids uncover a series of supernatural mysteries in their small town.', release_date: '2016-07-15', vote_average: 8.8 },
    { title: 'The Crown', overview: 'A historical drama about the reign of Queen Elizabeth II.', release_date: '2016-11-04', vote_average: 8.7 },
    { title: 'Money Heist', overview: 'A criminal mastermind plans the biggest heist in recorded history.', release_date: '2017-05-02', vote_average: 8.3 },
    { title: 'The Witcher', overview: 'A monster hunter navigates a world filled with magic and political intrigue.', release_date: '2019-12-20', vote_average: 8.2 },
    { title: 'Bridgerton', overview: 'A romantic drama set in Regency-era England, focusing on the Bridgerton family.', release_date: '2020-12-25', vote_average: 7.3 },
    { title: 'Ozark', overview: 'A financial planner relocates his family to the Ozarks after a money-laundering scheme goes wrong.', release_date: '2017-07-21', vote_average: 8.5 }
  ];

  constructor(
    private router: Router
    // private movieService: MovieService
  ) {}

  ngOnInit() {
    // Load some popular movies to showcase as "Netflix Originals"
    // this.movieService.getPopularMovies().subscribe(response => {
    //   this.featuredMovies = response.results.slice(0, 6);
    // });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  // getImageUrl(movie: Movie): string {
  //   return this.movieService.getImageUrl(movie.poster_path);
  // }

  getYear(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear().toString();
  }
}
