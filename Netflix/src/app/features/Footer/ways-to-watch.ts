import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ways-to-watch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ways-to-watch-page">
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
          <h1>Ways to Watch</h1>

          <section class="watch-section">
            <h2>Watch Netflix on your favorite devices</h2>
            <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</p>
          </section>

          <div class="devices-grid">
            <div class="device-card">
              <div class="device-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#e50914" stroke-width="2" fill="none"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="#e50914" stroke-width="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="#e50914" stroke-width="2"/>
                </svg>
              </div>
              <h3>TV</h3>
              <p>Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
            </div>

            <div class="device-card">
              <div class="device-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#e50914" stroke-width="2" fill="none"/>
                  <line x1="12" y1="18" x2="12.01" y2="18" stroke="#e50914" stroke-width="2"/>
                </svg>
              </div>
              <h3>Phone & Tablet</h3>
              <p>iPhone, iPad, Android phones and tablets and more.</p>
            </div>

            <div class="device-card">
              <div class="device-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="12" rx="2" ry="2" stroke="#e50914" stroke-width="2" fill="none"/>
                  <line x1="2" y1="20" x2="22" y2="20" stroke="#e50914" stroke-width="2"/>
                </svg>
              </div>
              <h3>Computer</h3>
              <p>Windows PC, Mac, Chromebook and more.</p>
            </div>
          </div>

          <section class="features-section">
            <h2>Features</h2>
            <div class="features-list">
              <div class="feature-item">
                <h4>Download and go</h4>
                <p>Watch offline on your mobile device or tablet.</p>
              </div>
              <div class="feature-item">
                <h4>Multiple profiles</h4>
                <p>Create profiles for different members of your household.</p>
              </div>
              <div class="feature-item">
                <h4>Available everywhere</h4>
                <p>Stream unlimited movies and TV shows on thousands of devices.</p>
              </div>
              <div class="feature-item">
                <h4>Cancel anytime</h4>
                <p>If you decide Netflix isn't for you - no problem. No contract, no cancellation fees.</p>
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
    .ways-to-watch-page {
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

    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 2rem;
      text-align: center;
    }

    .watch-section {
      text-align: center;
      margin-bottom: 4rem;
    }

    .watch-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .watch-section p {
      font-size: 1.2rem;
      color: #999;
      max-width: 600px;
      margin: 0 auto;
    }

    .devices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .device-card {
      text-align: center;
      padding: 2rem;
      border-radius: 8px;
      background: #111;
      transition: transform 0.3s ease;
    }

    .device-card:hover {
      transform: translateY(-5px);
    }

    .device-icon {
      margin-bottom: 1rem;
    }

    .device-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #e50914;
    }

    .device-card p {
      color: #999;
      line-height: 1.5;
    }

    .features-section h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      text-align: center;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature-item {
      padding: 1.5rem;
      border-left: 3px solid #e50914;
      background: #111;
      border-radius: 4px;
    }

    .feature-item h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    .feature-item p {
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
      h1 {
        font-size: 2rem;
      }

      .watch-section h2 {
        font-size: 1.5rem;
      }

      .devices-grid {
        grid-template-columns: 1fr;
      }

      .features-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WaysToWatchComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
