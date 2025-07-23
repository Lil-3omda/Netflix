import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="faq-page">
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
          <h1>Frequently Asked Questions</h1>

          <div class="faq-list">
            <div class="faq-item" *ngFor="let faq of faqs; let i = index">
              <div class="faq-question" (click)="toggleFaq(i)" [class.active]="faq.isOpen">
                <h3>{{ faq.question }}</h3>
                <div class="faq-icon">
                  <svg [class.rotated]="faq.isOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8L18 14L6 14L12 8Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div class="faq-answer" [class.open]="faq.isOpen">
                <div class="answer-content">
                  <p [innerHTML]="faq.answer"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="email-signup">
            <h2>Ready to watch? Enter your email to create or restart your membership.</h2>
            <div class="email-form">
              <div class="input-group">
                <input
                  type="email"
                  placeholder="Email address"
                  [(ngModel)]="email"
                  class="email-input"
                />
                <button class="get-started-btn" (click)="getStarted()">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="page-footer">
        <div class="footer-content">
          <p>Questions? Call 1-844-505-2993</p>
          <div class="footer-links">
            <div class="link-column">
              <a href="#">FAQ</a>
              <a href="#">Investor Relations</a>
              <a href="#">Privacy</a>
              <a href="#">Speed Test</a>
            </div>
            <div class="link-column">
              <a href="#">Help Center</a>
              <a href="#">Jobs</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">Legal Notices</a>
            </div>
            <div class="link-column">
              <a href="#">Account</a>
              <a href="#">Ways to Watch</a>
              <a href="#">Corporate Information</a>
              <a href="#">Only on Netflix</a>
            </div>
            <div class="link-column">
              <a href="#">Media Center</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div class="language-selector">
            <select>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
            </select>
          </div>
          <p class="country">Netflix Egypt</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .faq-page {
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
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
    }

    h1 {
      font-size: 3.125rem;
      font-weight: 900;
      margin-bottom: 3rem;
      text-align: center;
      line-height: 1.1;
    }

    .faq-list {
      margin-bottom: 4rem;
    }

    .faq-item {
      margin-bottom: 8px;
      background: #2d2d2d;
      border-radius: 4px;
      overflow: hidden;
    }

    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
      user-select: none;
    }

    .faq-question:hover {
      background: #404040;
    }

    .faq-question.active {
      background: #404040;
    }

    .faq-question h3 {
      font-size: 1.5rem;
      font-weight: 400;
      margin: 0;
      flex: 1;
      line-height: 1.2;
    }

    .faq-icon {
      margin-left: 1rem;
      transition: transform 0.3s ease;
    }

    .faq-icon svg {
      transition: transform 0.3s ease;
    }

    .faq-icon svg.rotated {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .faq-answer.open {
      max-height: 500px;
    }

    .answer-content {
      padding: 0 1.5rem 1.5rem;
      border-top: 1px solid #333;
      padding-top: 1.5rem;
    }

    .answer-content p {
      font-size: 1.125rem;
      line-height: 1.5;
      margin: 0;
      color: #fff;
    }

    .email-signup {
      text-align: center;
      padding: 3rem 0;
    }

    .email-signup h2 {
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 1rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .email-form {
      margin-top: 1rem;
    }

    .input-group {
      display: flex;
      max-width: 600px;
      margin: 0 auto;
      gap: 0;
    }

    .email-input {
      flex: 1;
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid #333;
      border-radius: 4px 0 0 4px;
      background: rgba(22, 22, 22, 0.7);
      color: white;
      outline: none;
    }

    .email-input::placeholder {
      color: #8c8c8c;
    }

    .email-input:focus {
      border-color: #fff;
      background: rgba(22, 22, 22, 0.9);
    }

    .get-started-btn {
      padding: 1rem 2rem;
      font-size: 1.125rem;
      font-weight: 500;
      background: #e50914;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: background-color 0.3s ease;
      white-space: nowrap;
    }

    .get-started-btn:hover {
      background: #f40612;
    }

    .page-footer {
      border-top: 1px solid #333;
      padding: 30px 0;
      background: #000;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .footer-content > p {
      color: #737373;
      margin-bottom: 2rem;
    }

    .footer-links {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .link-column {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .link-column a {
      color: #737373;
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.3s ease;
    }

    .link-column a:hover {
      color: #fff;
    }

    .language-selector {
      margin-bottom: 1rem;
    }

    .language-selector select {
      background: #000;
      color: #737373;
      border: 1px solid #333;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
    }

    .country {
      color: #737373;
      font-size: 0.875rem;
      margin: 0;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .faq-question h3 {
        font-size: 1.125rem;
      }

      .input-group {
        flex-direction: column;
        gap: 1rem;
      }

      .email-input {
        border-radius: 4px;
      }

      .get-started-btn {
        border-radius: 4px;
        justify-content: center;
      }

      .footer-links {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .footer-links {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FaqComponent {
  email: string = '';

  faqs = [
    {
      question: 'What is Netflix?',
      answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices.<br><br>You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!',
      isOpen: false
    },
    {
      question: 'How much does Netflix cost?',
      answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EGP 120 to EGP 280 a month. No extra costs, no contracts.',
      isOpen: false
    },
    {
      question: 'Where can I watch?',
      answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.<br><br>You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you\'re on the go and without an internet connection. Take Netflix with you anywhere.',
      isOpen: false
    },
    {
      question: 'How do I cancel?',
      answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
      isOpen: false
    },
    {
      question: 'What can I watch on Netflix?',
      answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
      isOpen: false
    },
    {
      question: 'Is Netflix good for kids?',
      answer: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.<br><br>Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don\'t want kids to see.',
      isOpen: false
    }
  ];

  constructor(private router: Router) {}

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  getStarted() {
    if (this.email) {
      // Navigate to signup with email
      this.router.navigate(['/signup'], { queryParams: { email: this.email } });
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
