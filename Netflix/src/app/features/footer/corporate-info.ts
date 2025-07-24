import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corporate-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="corporate-info-page">
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
          <h1>Corporate Information</h1>

          <section class="company-overview">
            <h2>About Netflix</h2>
            <p>Netflix is one of the world's leading entertainment services with over 230 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages.</p>
          </section>

          <div class="info-sections">
            <section class="info-section">
              <h3>Company Details</h3>
              <div class="info-grid">
                <div class="info-item">
                  <h4>Founded</h4>
                  <p>August 29, 1997</p>
                </div>
                <div class="info-item">
                  <h4>Headquarters</h4>
                  <p>Los Gatos, California, United States</p>
                </div>
                <div class="info-item">
                  <h4>CEO</h4>
                  <p>Ted Sarandos & Greg Peters</p>
                </div>
                <div class="info-item">
                  <h4>Employees</h4>
                  <p>12,800+ worldwide</p>
                </div>
              </div>
            </section>

            <section class="info-section">
              <h3>Business Model</h3>
              <p>Netflix operates on a subscription-based model, offering unlimited streaming of content for a monthly fee. The company has invested heavily in original content production and global expansion.</p>

              <div class="business-highlights">
                <div class="highlight-item">
                  <h4>Global Reach</h4>
                  <p>Available in 190+ countries and territories</p>
                </div>
                <div class="highlight-item">
                  <h4>Content Investment</h4>
                  <p>Billions invested annually in original programming</p>
                </div>
                <div class="highlight-item">
                  <h4>Technology Focus</h4>
                  <p>Advanced recommendation algorithms and streaming technology</p>
                </div>
              </div>
            </section>

            <section class="info-section">
              <h3>Investor Relations</h3>
              <p>Netflix, Inc. is traded on NASDAQ under the symbol NFLX. The company regularly reports financial results and provides updates to shareholders.</p>

              <div class="investor-links">
                <a href="#" class="investor-link">Annual Reports</a>
                <a href="#" class="investor-link">Quarterly Earnings</a>
                <a href="#" class="investor-link">SEC Filings</a>
                <a href="#" class="investor-link">Investor Events</a>
              </div>
            </section>

            <section class="info-section">
              <h3>Sustainability & Social Impact</h3>
              <p>Netflix is committed to environmental sustainability and social responsibility, working towards net-zero greenhouse gas emissions and supporting diverse storytelling.</p>

              <div class="sustainability-items">
                <div class="sustainability-item">
                  <h4>Environmental Goals</h4>
                  <p>Committed to achieving net-zero greenhouse gas emissions by 2022</p>
                </div>
                <div class="sustainability-item">
                  <h4>Diversity & Inclusion</h4>
                  <p>Investing in diverse talent and inclusive storytelling</p>
                </div>
                <div class="sustainability-item">
                  <h4>Community Support</h4>
                  <p>Supporting education and creative communities worldwide</p>
                </div>
              </div>
            </section>
          </div>
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
    .corporate-info-page {
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

    .company-overview {
      text-align: center;
      margin-bottom: 4rem;
      padding: 2rem;
      background: #111;
      border-radius: 8px;
    }

    .company-overview h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #e50914;
    }

    .company-overview p {
      font-size: 1.2rem;
      color: #999;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
    }

    .info-sections {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .info-section {
      padding: 2rem;
      background: #111;
      border-radius: 8px;
    }

    .info-section h3 {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: #e50914;
    }

    .info-section p {
      color: #999;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      padding: 1rem;
      background: #222;
      border-radius: 4px;
    }

    .info-item h4 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #e50914;
    }

    .info-item p {
      color: white;
      margin: 0;
    }

    .business-highlights,
    .sustainability-items {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .highlight-item,
    .sustainability-item {
      padding: 1.5rem;
      background: #222;
      border-radius: 4px;
      border-left: 3px solid #e50914;
    }

    .highlight-item h4,
    .sustainability-item h4 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: white;
    }

    .highlight-item p,
    .sustainability-item p {
      color: #999;
      margin: 0;
    }

    .investor-links {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .investor-link {
      padding: 0.8rem 1.5rem;
      background: #e50914;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .investor-link:hover {
      background: #f40612;
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

      .company-overview h2 {
        font-size: 1.5rem;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .business-highlights,
      .sustainability-items {
        grid-template-columns: 1fr;
      }

      .investor-links {
        flex-direction: column;
      }
    }
  `]
})
export class CorporateInfoComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
