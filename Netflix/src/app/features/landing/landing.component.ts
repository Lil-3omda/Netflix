import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="netflix-landing">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-background">
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/b2c3e95b-b7b5-4bb7-a883-f4bfc7472fb7/19fc1a4c-82db-4481-ad08-3a1dffbb8c39/EG-en-20240805-POP_SIGNUP_TWO_WEEKS-perspective_WEB_24a485f6-1820-42be-9b60-1b066f2eb869_large.jpg" alt="Netflix Background">
          <div class="hero-overlay"></div>
        </div>

        <!-- Header -->
        <header class="hero-header">
          <div class="header-content">
            <div class="netflix-logo">
              <svg viewBox="0 0 111 30" class="logo-svg" aria-hidden="true" role="img">
                <g>
                  <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" fill="#e50914"></path>
                </g>
              </svg>
            </div>
            <div class="header-actions">
              <div class="language-selector">
                <select class="language-select">
                  <option value="en">🌐 English</option>
                  <option value="ar">🌐 العربية</option>
                </select>
              </div>
              <button class="signin-btn" (click)="goToLogin()">Sign In</button>
            </div>
          </div>
        </header>

        <!-- Hero Content -->
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">Unlimited movies, TV shows, and more</h1>
            <p class="hero-subtitle">Watch anywhere. Cancel anytime.</p>
            <p class="hero-cta">Ready to watch? Enter your email to create or restart your membership.</p>
            
            <div class="email-signup-form">
              <div class="email-input-container">
                <input 
                  type="email" 
                  class="email-input" 
                  [(ngModel)]="email"
                  [class.has-value]="email.length > 0"
                  placeholder=" "
                  (keyup.enter)="startSignup()">
                <label class="email-label">Email address</label>
              </div>
              <button class="get-started-btn" (click)="startSignup()">
                Get Started
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section">
        <!-- Feature 1: Enjoy on your TV -->
        <div class="feature">
          <div class="feature-content">
            <div class="feature-text">
              <h2>Enjoy on your TV</h2>
              <p>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
            </div>
            <div class="feature-media">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV">
              <div class="video-container">
                <video autoplay playsinline muted loop>
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Feature 2: Download your shows -->
        <div class="feature reverse">
          <div class="feature-content">
            <div class="feature-text">
              <h2>Download your shows to watch offline</h2>
              <p>Save your favorites easily and always have something to watch.</p>
            </div>
            <div class="feature-media">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile">
              <div class="download-animation">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="Stranger Things">
                <div class="download-content">
                  <div class="download-text">
                    <div class="download-title">Stranger Things</div>
                    <div class="download-status">Downloading...</div>
                  </div>
                  <div class="download-gif">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt="Download">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Feature 3: Watch everywhere -->
        <div class="feature">
          <div class="feature-content">
            <div class="feature-text">
              <h2>Watch everywhere</h2>
              <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
            <div class="feature-media">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="Devices">
              <div class="devices-video">
                <video autoplay playsinline muted loop>
                  <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v" type="video/mp4">
                </video>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Feature 4: Kids profiles -->
        <div class="feature reverse">
          <div class="feature-content">
            <div class="feature-text">
              <h2>Create profiles for kids</h2>
              <p>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
            </div>
            <div class="feature-media">
              <img src="https://occ-0-5046-2164.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVr8nYuAg0xDpXDv0VI9HUoH7r2aGp4TKRCsKNQrMwxzTtr-NlwOHeS8bCI2oeZddmu3nMYr3j9MjYhHyjBASb1FaOGYZNYvPBCL.png?r=54d" alt="Kids">
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="faq-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div class="faq-item" *ngFor="let faq of faqs; let i = index" [class.active]="activeFaq === i">
            <button class="faq-question" (click)="toggleFaq(i)">
              <span>{{ faq.question }}</span>
              <svg class="faq-icon" [class.rotated]="activeFaq === i" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="faq-answer" [class.show]="activeFaq === i">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-signup">
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
          <div class="email-signup-form">
            <div class="email-input-container">
              <input 
                type="email" 
                class="email-input" 
                [(ngModel)]="email"
                [class.has-value]="email.length > 0"
                placeholder=" ">
              <label class="email-label">Email address</label>
            </div>
            <button class="get-started-btn" (click)="startSignup()">
              Get Started
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="footer-content">
          <p class="footer-contact">Questions? Call 1-844-505-2993</p>
          <div class="footer-links">
            <div class="footer-column">
              <a href="#">FAQ</a>
              <a href="#">Investor Relations</a>
              <a href="#">Privacy</a>
              <a href="#">Speed Test</a>
            </div>
            <div class="footer-column">
              <a href="#">Help Center</a>
              <a href="#">Jobs</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">Legal Notices</a>
            </div>
            <div class="footer-column">
              <a href="#">Account</a>
              <a href="#">Ways to Watch</a>
              <a href="#">Corporate Information</a>
              <a href="#">Only on Netflix</a>
            </div>
            <div class="footer-column">
              <a href="#">Media Center</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div class="footer-language">
            <select class="language-select">
              <option value="en">🌐 English</option>
              <option value="ar">🌐 العربية</option>
            </select>
          </div>
          <p class="footer-country">Netflix Egypt</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .netflix-landing {
      background: #000;
      color: white;
      font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    /* Hero Section */
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .hero-background img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.7) 0%,
        rgba(0,0,0,0.4) 50%,
        rgba(0,0,0,0.7) 100%
      );
    }

    /* Header */
    .hero-header {
      position: relative;
      z-index: 10;
      padding: 20px 0;
    }

    .header-content {
      max-width: 1170px;
      margin: 0 auto;
      padding: 0 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .netflix-logo {
      width: 167px;
      height: 45px;
      cursor: pointer;
    }

    .logo-svg {
      width: 100%;
      height: 100%;
      fill: #e50914;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .language-select {
      background: transparent;
      border: 1px solid #aaa;
      color: white;
      padding: 5px 15px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }

    .language-select option {
      background: #000;
      color: white;
    }

    .signin-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 7px 17px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .signin-btn:hover {
      background: #f40612;
    }

    /* Hero Content */
    .hero-content {
      position: relative;
      z-index: 10;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 45px;
    }

    .hero-text {
      max-width: 950px;
    }

    .hero-title {
      font-size: 3.125rem;
      font-weight: 900;
      margin: 0 0 1rem;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: 1.625rem;
      font-weight: 400;
      margin: 0 0 1rem;
    }

    .hero-cta {
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0 0 1.5rem;
    }

    .email-signup-form {
      display: flex;
      max-width: 600px;
      margin: 0 auto;
      gap: 0;
    }

    .email-input-container {
      position: relative;
      flex: 1;
    }

    .email-input {
      width: 100%;
      height: 56px;
      padding: 16px 16px 0;
      border: 1px solid #333;
      border-radius: 4px 0 0 4px;
      background: rgba(22, 22, 22, 0.7);
      color: white;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s;
    }

    .email-input:focus {
      border-color: white;
    }

    .email-label {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #8c8c8c;
      font-size: 16px;
      pointer-events: none;
      transition: all 0.2s;
    }

    .email-input:focus + .email-label,
    .email-input.has-value + .email-label {
      top: 25%;
      font-size: 12px;
      color: #8c8c8c;
    }

    .get-started-btn {
      background: #e50914;
      color: white;
      border: none;
      padding: 0 24px;
      border-radius: 0 4px 4px 0;
      font-size: 1.5rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background-color 0.2s;
      white-space: nowrap;
    }

    .get-started-btn:hover {
      background: #f40612;
    }

    /* Features Section */
    .features-section {
      background: #000;
      border-top: 8px solid #222;
    }

    .feature {
      padding: 70px 45px;
      max-width: 1100px;
      margin: 0 auto;
    }

    .feature-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 50px;
    }

    .feature.reverse .feature-content {
      direction: rtl;
    }

    .feature.reverse .feature-text {
      direction: ltr;
    }

    .feature-text h2 {
      font-size: 3.125rem;
      font-weight: 900;
      margin: 0 0 1rem;
      line-height: 1.1;
    }

    .feature-text p {
      font-size: 1.625rem;
      font-weight: 400;
      margin: 0;
    }

    .feature-media {
      position: relative;
    }

    .feature-media img {
      width: 100%;
      height: auto;
      position: relative;
      z-index: 2;
    }

    .video-container {
      position: absolute;
      top: 46%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 73%;
      z-index: 1;
    }

    .video-container video {
      width: 100%;
      height: auto;
    }

    .divider {
      border-top: 8px solid #222;
    }

    .download-animation {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      background: #000;
      border: 2px solid #333;
      border-radius: 12px;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .download-animation img {
      width: 48px;
      height: 64px;
    }

    .download-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .download-title {
      font-weight: 600;
      font-size: 16px;
    }

    .download-status {
      color: #0071eb;
      font-size: 14px;
    }

    .download-gif img {
      width: 48px;
      height: 48px;
    }

    .devices-video {
      position: absolute;
      top: 34%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 63%;
      z-index: 1;
    }

    .devices-video video {
      width: 100%;
      height: auto;
    }

    /* FAQ Section */
    .faq-section {
      background: #000;
      border-top: 8px solid #222;
      padding: 70px 45px;
      max-width: 815px;
      margin: 0 auto;
    }

    .faq-title {
      font-size: 3.125rem;
      font-weight: 900;
      text-align: center;
      margin: 0 0 3rem;
    }

    .faq-item {
      margin-bottom: 8px;
    }

    .faq-question {
      width: 100%;
      background: #2d2d2d;
      color: white;
      border: none;
      padding: 24px;
      font-size: 1.625rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.25s;
    }

    .faq-question:hover {
      background: #414141;
    }

    .faq-item.active .faq-question {
      background: #414141;
    }

    .faq-icon {
      transition: transform 0.25s;
    }

    .faq-icon.rotated {
      transform: rotate(45deg);
    }

    .faq-answer {
      background: #2d2d2d;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.25s ease-in-out;
    }

    .faq-answer.show {
      max-height: 300px;
      border-top: 1px solid #000;
    }

    .faq-answer p {
      padding: 24px;
      margin: 0;
      font-size: 1.625rem;
      line-height: 1.4;
    }

    .faq-signup {
      text-align: center;
      margin-top: 3rem;
    }

    .faq-signup p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }

    /* Footer */
    .landing-footer {
      background: #000;
      border-top: 8px solid #222;
      padding: 70px 45px 20px;
      color: #737373;
    }

    .footer-content {
      max-width: 980px;
      margin: 0 auto;
    }

    .footer-contact {
      font-size: 16px;
      margin-bottom: 30px;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }

    .footer-column {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .footer-column a {
      color: #737373;
      text-decoration: none;
      font-size: 13px;
    }

    .footer-column a:hover {
      text-decoration: underline;
    }

    .footer-language {
      margin-bottom: 20px;
    }

    .footer-country {
      font-size: 13px;
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 0 20px;
      }

      .netflix-logo {
        width: 100px;
        height: 27px;
      }

      .hero-content {
        padding: 0 20px;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1.125rem;
      }

      .hero-cta {
        font-size: 1.125rem;
      }

      .email-signup-form {
        flex-direction: column;
        gap: 15px;
      }

      .email-input {
        border-radius: 4px;
      }

      .get-started-btn {
        border-radius: 4px;
        height: 48px;
        justify-content: center;
      }

      .feature {
        padding: 50px 20px;
      }

      .feature-content {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
      }

      .feature-text h2 {
        font-size: 2rem;
      }

      .feature-text p {
        font-size: 1.125rem;
      }

      .faq-section {
        padding: 50px 20px;
      }

      .faq-title {
        font-size: 2rem;
      }

      .faq-question {
        font-size: 1.125rem;
        padding: 18px;
      }

      .faq-answer p {
        font-size: 1.125rem;
        padding: 18px;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }

      .landing-footer {
        padding: 50px 20px 20px;
      }
    }
  `]
})
export class LandingComponent {
  email = '';
  activeFaq = -1;

  faqs = [
    {
      question: 'What is Netflix?',
      answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!'
    },
    {
      question: 'How much does Netflix cost?',
      answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EGP 120 to EGP 200 a month. No extra costs, no contracts.'
    },
    {
      question: 'Where can I watch?',
      answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.'
    },
    {
      question: 'How do I cancel?',
      answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
    },
    {
      question: 'What can I watch on Netflix?',
      answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.'
    },
    {
      question: 'Is Netflix good for kids?',
      answer: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don\'t want kids to see.'
    }
  ];

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  startSignup() {
    if (this.email) {
      this.router.navigate(['/signup'], { queryParams: { email: this.email } });
    } else {
      this.router.navigate(['/signup']);
    }
  }

  toggleFaq(index: number) {
    this.activeFaq = this.activeFaq === index ? -1 : index;
  }
}