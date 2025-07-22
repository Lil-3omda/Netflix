import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <div class="header-content">
          <div class="netflix-logo">
            <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
              <g>
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" fill="#e50914"></path>
              </g>
            </svg>
          </div>
          <nav class="nav-menu">
            <a href="#" class="nav-item active">Home</a>
            <a href="#" class="nav-item">TV Shows</a>
            <a href="#" class="nav-item">Movies</a>
            <a href="#" class="nav-item">New & Popular</a>
            <a href="#" class="nav-item">My List</a>
            <a href="#" class="nav-item">Browse by Languages</a>
          </nav>
          <div class="user-menu">
            <div class="search-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="notifications">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="profile-dropdown">
              <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="Profile" class="profile-avatar">
              <div class="dropdown-arrow">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="dashboard-content">
        <div class="hero-banner">
          <div class="hero-info">
            <h1 class="hero-title">Stranger Things</h1>
            <p class="hero-description">
              When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
            </p>
            <div class="hero-actions">
              <button class="play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5V19L19 12L8 5Z" fill="black"/>
                </svg>
                Play
              </button>
              <button class="info-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                  <path d="M12 16V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 8H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                More Info
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABZlLZjRJPI7TOT2w9T3X3HSeCgqP5V5_8FTn73LZR6_d0qwPuY6wJKTZ53tZcxbh8XYGr7X4Q4pksHV8LJeJwXJPhNF5.jpg?r=4c8" alt="Stranger Things">
          </div>
        </div>

        <div class="content-sections">
          <div class="content-row">
            <h2 class="row-title">Trending Now</h2>
            <div class="content-slider">
              <div class="content-item" *ngFor="let item of trendingContent">
                <img [src]="item.image" [alt]="item.title" class="content-image">
              </div>
            </div>
          </div>

          <div class="content-row">
            <h2 class="row-title">Netflix Originals</h2>
            <div class="content-slider">
              <div class="content-item" *ngFor="let item of netflixOriginals">
                <img [src]="item.image" [alt]="item.title" class="content-image">
              </div>
            </div>
          </div>

          <div class="content-row">
            <h2 class="row-title">Action Movies</h2>
            <div class="content-slider">
              <div class="content-item" *ngFor="let item of actionMovies">
                <img [src]="item.image" [alt]="item.title" class="content-image">
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- <div class="success-message">
        <div class="success-content">
          <div class="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#00D532"/>
              <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2>Welcome to Netflix!</h2>
          <p>Your account has been successfully created. Enjoy unlimited movies and TV shows!</p>
          <button class="logout-btn" (click)="logout()">Sign Out</button>
        </div>
      </div>
    </div> -->
  `,
  styles: [`
    .dashboard {
      background: #141414;
      color: white;
      min-height: 100vh;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* Header */
    .dashboard-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent);
      transition: background 0.4s;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 60px;
      max-width: 1920px;
      margin: 0 auto;
    }

    .netflix-logo {
      width: 92px;
      height: 25px;
      cursor: pointer;
    }

    .logo-svg {
      width: 100%;
      height: 100%;
      fill: #e50914;
    }

    .nav-menu {
      display: flex;
      gap: 20px;
      margin-left: 25px;
    }

    .nav-item {
      color: #e5e5e5;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.4s;
    }

    .nav-item:hover,
    .nav-item.active {
      color: #b3b3b3;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .search-icon,
    .notifications {
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .search-icon:hover,
    .notifications:hover {
      opacity: 1;
    }

    .profile-dropdown {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .profile-avatar {
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }

    /* Hero Banner */
    .hero-banner {
      position: relative;
      height: 56.25vw;
      min-height: 500px;
      max-height: 800px;
      display: flex;
      align-items: center;
      background: linear-gradient(77deg, rgba(0,0,0,.6), transparent 85%);
    }

    .hero-banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('https://occ-0-1361-1360.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABZlLZjRJPI7TOT2w9T3X3HSeCgqP5V5_8FTn73LZR6_d0qwPuY6wJKTZ53tZcxbh8XYGr7X4Q4pksHV8LJeJwXJPhNF5.jpg?r=4c8');
      background-size: cover;
      background-position: center;
      z-index: -1;
    }

    .hero-info {
      padding: 0 60px;
      max-width: 40%;
      z-index: 10;
    }

    .hero-title {
      font-size: 3vw;
      font-weight: 700;
      margin-bottom: 1vw;
      line-height: 1.1;
    }

    .hero-description {
      font-size: 1.4vw;
      margin-bottom: 2vw;
      line-height: 1.4;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
    }

    .hero-actions {
      display: flex;
      gap: 12px;
    }

    .play-btn,
    .info-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      font-size: 1.1vw;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .play-btn {
      background: white;
      color: black;
    }

    .play-btn:hover {
      background: rgba(255,255,255,0.75);
    }

    .info-btn {
      background: rgba(109,109,110,0.7);
      color: white;
    }

    .info-btn:hover {
      background: rgba(109,109,110,0.4);
    }

    /* Content Sections */
    .content-sections {
      padding: 0 60px 100px;
      margin-top: -100px;
      position: relative;
      z-index: 10;
    }

    .content-row {
      margin-bottom: 20px;
    }

    .row-title {
      font-size: 1.4vw;
      font-weight: 700;
      margin-bottom: 10px;
      color: #e5e5e5;
    }

    .content-slider {
      display: flex;
      gap: 5px;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .content-slider::-webkit-scrollbar {
      display: none;
    }

    .content-item {
      flex: 0 0 auto;
      width: 20vw;
      min-width: 150px;
      max-width: 342px;
      cursor: pointer;
      transition: transform 0.3s;
    }

    .content-item:hover {
      transform: scale(1.05);
    }

    .content-image {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }

    /* Success Message */
    .success-message {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .success-content {
      background: #141414;
      padding: 40px;
      border-radius: 8px;
      text-align: center;
      max-width: 400px;
      border: 1px solid #333;
    }

    .success-icon {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
    }

    .success-content h2 {
      font-size: 24px;
      margin-bottom: 15px;
      color: #e50914;
    }

    .success-content p {
      margin-bottom: 25px;
      color: #b3b3b3;
      line-height: 1.4;
    }

    .logout-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .logout-btn:hover {
      background: #f40612;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .header-content {
        padding: 15px 30px;
      }

      .hero-info {
        padding: 0 30px;
        max-width: 50%;
      }

      .content-sections {
        padding: 0 30px 100px;
      }

      .nav-menu {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 15px 20px;
      }

      .hero-info {
        padding: 0 20px;
        max-width: 100%;
      }

      .hero-title {
        font-size: 6vw;
      }

      .hero-description {
        font-size: 3vw;
      }

      .play-btn,
      .info-btn {
        font-size: 2.5vw;
        padding: 8px 16px;
      }

      .content-sections {
        padding: 0 20px 100px;
      }

      .row-title {
        font-size: 3vw;
      }

      .content-item {
        width: 33vw;
      }
    }
  `]
})
export class DashboardComponent {
  trendingContent = [
    { title: 'The Witcher', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQTRSnxcBdlWhIsWs67wK6F-lndi7mfNnMKrAJjqcWHo8WaRZ8Bv__3qhsd8fPR_3igU-z_b8iiE1B5TpPZi6Wd5Q5YuQ5-1l7TjV.jpg?r=56e' },
    { title: 'Money Heist', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQbOXWBrCRIu2Y5j_b0YheFCtY8KVj_v_VaE0q2OOq1YCGX8cRD-Jt8_ZaA4C_w7D5QrRrlJn8P7_7WvE.jpg?r=3e1' },
    { title: 'Ozark', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABcmTXxGZQGOG8lm0S_26VFgHJ_tOnO5KKALAfqVKVR6VkJQXrDlE7LdWEVBZdMo9mLnUPdSlbEP0.jpg?r=eae' },
    { title: 'The Crown', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABfLpx1I2_zN4_0YH5P1LY5VGp7-lkCGJcpJv9JH0O5YZA7nXGF9L8_cE_r7bx7_V-aQZqn1RfwKq.jpg?r=5c0' },
    { title: 'Squid Game', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABd8Ux3X-d2gzh-A_LQp-tOy3P5H_W1_L7V7aJ9QaL7E8_F5RjVz8A_s9q7Vq3pO_r7Y_C.jpg?r=4f1' }
  ];

  netflixOriginals = [
    { title: 'Dark', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABbJU1j5LO7i3o_EJg7D5b_QbZqG3h7oOqE2Y8F_8I_7LJQaS_8qOhV_9E_9.jpg?r=a81' },
    { title: 'The Umbrella Academy', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABWzSx_Rc8kqaQ8_9z7Y_F5c7VoQ_9Q7_dY3_A8qO1J_L7_QE_8.jpg?r=1e9' },
    { title: 'Orange Is the New Black', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABVZf_8_2Y3Q7d9_rG1OY_H8J_dq7Y_L9S_8Q_3A.jpg?r=269' },
    { title: 'House of Cards', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABcJ2H_5Y7L_8Q9_rV3_dG2Y_F8S_oQ7A_9L.jpg?r=7b5' },
    { title: 'Black Mirror', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABe8_H2Y_Q9L7_dF3_rG8S_oY7V_A9.jpg?r=1c8' }
  ];

  actionMovies = [
    { title: 'Red Notice', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABf5_H8Y_Q7L_dF9_rG3S_oY2V_A8.jpg?r=2d1' },
    { title: 'Extraction', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABd2_H7Y_Q8L_dF5_rG9S_oY1V_A7.jpg?r=3e2' },
    { title: '6 Underground', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABc1_H6Y_Q9L_dF2_rG8S_oY3V_A6.jpg?r=4f3' },
    { title: 'The Old Guard', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABa9_H5Y_Q1L_dF8_rG7S_oY4V_A5.jpg?r=5g4' },
    { title: 'Bird Box', image: 'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAABb8_H4Y_Q2L_dF7_rG6S_oY5V_A4.jpg?r=6h5' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}