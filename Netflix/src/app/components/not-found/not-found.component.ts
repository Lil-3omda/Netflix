import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="not-found-page">
      <div class="not-found-background">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/EG-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f2eb869_large.jpg" alt="Background" class="bg-image">
        <div class="bg-overlay"></div>
      </div>

      <header class="not-found-header">
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

      <div class="not-found-container">
        <div class="not-found-content">
          <div class="error-code">404</div>
          <h1 class="error-title">Lost your way?</h1>
          <p class="error-description">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <div class="error-actions">
            <button class="home-button" (click)="goHome()">
              Netflix Home
            </button>
            <div class="error-code-container">
              <span class="error-label">Error Code</span>
              <span class="error-value">NSES-404</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: 100vh;
      position: relative;
      background: #000;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }

    .not-found-background {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .bg-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
    }

    .not-found-header {
      position: relative;
      z-index: 10;
      padding: 20px 0;
    }

    .header-content {
      max-width: 1920px;
      margin: 0 auto;
      padding: 0 3%;
    }

    .netflix-logo {
      cursor: pointer;
    }

    .logo-svg {
      height: 45px;
      width: auto;
      fill: #e50914;
    }

    .not-found-container {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
    }

    .not-found-content {
      text-align: center;
      max-width: 600px;
    }

    .error-code {
      font-size: 10rem;
      font-weight: 900;
      color: #e50914;
      line-height: 1;
      margin-bottom: 20px;
      text-shadow: 0 0 50px rgba(229, 9, 20, 0.5);
    }

    .error-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: white;
    }

    .error-description {
      font-size: 1.5rem;
      color: #b3b3b3;
      margin-bottom: 40px;
      line-height: 1.4;
    }

    .error-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }

    .home-button {
      background: #e50914;
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .home-button:hover {
      background: #f40612;
    }

    .error-code-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .error-label {
      font-size: 0.9rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .error-value {
      font-size: 1.1rem;
      color: #b3b3b3;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .error-code {
        font-size: 6rem;
      }

      .error-title {
        font-size: 2rem;
      }

      .error-description {
        font-size: 1.2rem;
      }

      .home-button {
        padding: 12px 30px;
        font-size: 1rem;
      }
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }
}