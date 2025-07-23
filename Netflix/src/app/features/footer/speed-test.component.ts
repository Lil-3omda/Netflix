import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-speed-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="speed-test-container">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <div class="netflix-logo">
            <span class="logo-text">NETFLIX</span>
          </div>
          <div class="header-right">
            <select class="language-selector">
              <option value="en">English (US)</option>
              <option value="ar">العربية</option>
            </select>
            <a href="#" class="privacy-link">Privacy</a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Fast.com Logo -->
        <div class="fast-logo">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ff0000"/>
                <stop offset="100%" style="stop-color:#cc0000"/>
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" fill="none" stroke="url(#speedGradient)" stroke-width="8"/>
            <path d="M 25 60 A 35 35 0 0 1 95 60" fill="none" stroke="url(#speedGradient)" stroke-width="6"/>
            <circle cx="60" cy="60" r="8" fill="url(#speedGradient)"/>
            <path [attr.d]="'M 60 60 L ' + getSpeedIndicatorX() + ' ' + getSpeedIndicatorY()"
                  stroke="url(#speedGradient)" stroke-width="4" stroke-linecap="round"/>
          </svg>
        </div>

        <div class="fast-text">
          <h1>FAST</h1>
        </div>

        <!-- Speed Display -->
        <div class="speed-display">
          <div class="speed-number" [class.testing]="isTesting">
            {{ currentSpeed }}
          </div>
          <div class="speed-unit">Mbps</div>
        </div>

        <!-- Test Button -->
        <div class="test-controls" *ngIf="!isTesting">
          <button class="test-button" (click)="startSpeedTest()" [disabled]="isTesting">
            <div class="button-content">
              <span class="play-icon">▶</span>
              <span>Start Test</span>
            </div>
          </button>
        </div>

        <!-- Progress Indicator -->
        <div class="progress-container" *ngIf="isTesting">
          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="testProgress"></div>
          </div>
          <p class="progress-text">Testing your connection speed...</p>
        </div>

        <!-- Results -->
        <div class="results" *ngIf="testCompleted && !isTesting">
          <div class="result-item">
            <span class="result-label">Download Speed:</span>
            <span class="result-value">{{ finalSpeed }} Mbps</span>
          </div>
          <div class="result-item">
            <span class="result-label">Your connection is:</span>
            <span class="result-value" [class]="getConnectionQuality()">{{ getConnectionText() }}</span>
          </div>
          <button class="test-again-button" (click)="resetTest()">
            Test Again
          </button>
        </div>

        <!-- Info Section -->
        <div class="info-section">
          <p class="info-text">
            This speed test uses Netflix servers to measure your internet download speed.
          </p>
          <div class="powered-by">
            <span>POWERED BY</span>
            <span class="netflix-brand">NETFLIX</span>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} Netflix, Inc.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .speed-test-container {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Header Styles */
    .header {
      background-color: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #333;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 50px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .netflix-logo .logo-text {
      color: #e50914;
      font-size: 24px;
      font-weight: bold;
      text-decoration: none;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .language-selector {
      background-color: #333;
      color: #fff;
      border: 1px solid #555;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
    }

    .privacy-link {
      color: #fff;
      text-decoration: none;
      font-size: 14px;
      padding: 8px 16px;
      border: 1px solid #fff;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .privacy-link:hover {
      background-color: #fff;
      color: #000;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
    }

    /* Fast.com Logo */
    .fast-logo {
      margin-bottom: 20px;
      animation: pulse 2s infinite ease-in-out;
    }

    .fast-text h1 {
      font-size: 4rem;
      font-weight: bold;
      color: #e50914;
      margin-bottom: 40px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      letter-spacing: 0.1em;
    }

    /* Speed Display */
    .speed-display {
      margin-bottom: 40px;
    }

    .speed-number {
      font-size: 8rem;
      font-weight: 300;
      color: #fff;
      line-height: 1;
      margin-bottom: 10px;
      transition: all 0.3s ease;
      text-shadow: 2px 2px 8px rgba(229, 9, 20, 0.3);
    }

    .speed-number.testing {
      animation: speedPulse 1.5s infinite ease-in-out;
    }

    .speed-unit {
      font-size: 2rem;
      color: #ccc;
      font-weight: 300;
    }

    /* Test Controls */
    .test-button {
      background: linear-gradient(145deg, #e50914, #cc0000);
      border: none;
      border-radius: 50px;
      padding: 20px 40px;
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(229, 9, 20, 0.3);
      margin-bottom: 40px;
    }

    .test-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(229, 9, 20, 0.4);
    }

    .test-button:active {
      transform: translateY(0);
    }

    .test-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .button-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .play-icon {
      font-size: 16px;
    }

    /* Progress */
    .progress-container {
      width: 100%;
      max-width: 400px;
      margin-bottom: 40px;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background-color: #333;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 15px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #e50914, #ff6b6b);
      border-radius: 3px;
      transition: width 0.3s ease;
      animation: progressGlow 2s infinite ease-in-out;
    }

    .progress-text {
      color: #ccc;
      font-size: 16px;
    }

    /* Results */
    .results {
      background: rgba(17, 17, 17, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 40px;
      border: 1px solid #333;
    }

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      font-size: 18px;
    }

    .result-item:last-of-type {
      margin-bottom: 25px;
    }

    .result-label {
      color: #ccc;
    }

    .result-value {
      font-weight: 600;
      color: #fff;
    }

    .result-value.excellent {
      color: #00ff00;
    }

    .result-value.good {
      color: #ffff00;
    }

    .result-value.fair {
      color: #ff8800;
    }

    .result-value.poor {
      color: #ff0000;
    }

    .test-again-button {
      background: transparent;
      border: 2px solid #e50914;
      border-radius: 25px;
      padding: 12px 24px;
      color: #e50914;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .test-again-button:hover {
      background-color: #e50914;
      color: #fff;
    }

    /* Info Section */
    .info-section {
      margin-top: auto;
      text-align: center;
    }

    .info-text {
      color: #999;
      font-size: 14px;
      margin-bottom: 20px;
      max-width: 400px;
    }

    .powered-by {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 12px;
      color: #666;
    }

    .netflix-brand {
      color: #e50914;
      font-weight: bold;
    }

    /* Footer */
    .footer {
      background-color: rgba(0, 0, 0, 0.8);
      border-top: 1px solid #333;
      padding: 20px;
    }

    .footer-content {
      text-align: center;
      color: #666;
      font-size: 14px;
    }

    /* Animations */
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    @keyframes speedPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    @keyframes progressGlow {
      0%, 100% { box-shadow: 0 0 5px rgba(229, 9, 20, 0.5); }
      50% { box-shadow: 0 0 20px rgba(229, 9, 20, 0.8); }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
      }

      .fast-text h1 {
        font-size: 3rem;
      }

      .speed-number {
        font-size: 6rem;
      }

      .speed-unit {
        font-size: 1.5rem;
      }

      .main-content {
        padding: 20px;
      }

      .results {
        padding: 20px;
      }

      .result-item {
        flex-direction: column;
        gap: 5px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .fast-text h1 {
        font-size: 2.5rem;
      }

      .speed-number {
        font-size: 4rem;
      }

      .test-button {
        padding: 15px 30px;
        font-size: 16px;
      }
    }
  `]
})
export class SpeedTestComponent implements OnInit, OnDestroy {
  currentSpeed: number = 0;
  finalSpeed: number = 0;
  isTesting: boolean = false;
  testCompleted: boolean = false;
  testProgress: number = 0;
  currentYear: number = new Date().getFullYear();

  private speedInterval: any;
  private progressInterval: any;

  ngOnInit() {
    // Initialize component
  }

  ngOnDestroy() {
    this.clearIntervals();
  }

  startSpeedTest() {
    this.isTesting = true;
    this.testCompleted = false;
    this.testProgress = 0;
    this.currentSpeed = 0;

    // Simulate speed test with realistic progression
    this.simulateSpeedTest();
  }

  private simulateSpeedTest() {
    const testDuration = 8000; // 8 seconds
    const updateInterval = 100; // Update every 100ms
    const totalSteps = testDuration / updateInterval;
    let currentStep = 0;

    // Generate a random final speed between 5-100 Mbps
    const targetSpeed = Math.random() * 95 + 5;
    this.finalSpeed = Math.round(targetSpeed * 10) / 10;

    this.speedInterval = setInterval(() => {
      currentStep++;

      // Calculate progress
      this.testProgress = (currentStep / totalSteps) * 100;

      // Simulate realistic speed progression with some fluctuation
      const progress = currentStep / totalSteps;
      const baseSpeed = this.finalSpeed * this.easeOutCubic(progress);
      const fluctuation = (Math.random() - 0.5) * 5; // Random fluctuation ±2.5 Mbps
      this.currentSpeed = Math.max(0, Math.round((baseSpeed + fluctuation) * 10) / 10);

      if (currentStep >= totalSteps) {
        this.completeTest();
      }
    }, updateInterval);
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }

  private completeTest() {
    this.clearIntervals();
    this.currentSpeed = this.finalSpeed;
    this.isTesting = false;
    this.testCompleted = true;
    this.testProgress = 100;
  }

  resetTest() {
    this.clearIntervals();
    this.isTesting = false;
    this.testCompleted = false;
    this.testProgress = 0;
    this.currentSpeed = 0;
    this.finalSpeed = 0;
  }

  private clearIntervals() {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
      this.speedInterval = null;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  getConnectionQuality(): string {
    if (this.finalSpeed >= 50) return 'excellent';
    if (this.finalSpeed >= 25) return 'good';
    if (this.finalSpeed >= 10) return 'fair';
    return 'poor';
  }

  getConnectionText(): string {
    if (this.finalSpeed >= 50) return 'Excellent for 4K streaming';
    if (this.finalSpeed >= 25) return 'Great for HD streaming';
    if (this.finalSpeed >= 10) return 'Good for SD streaming';
    return 'May have buffering issues';
  }

  getSpeedIndicatorX(): number {
    const angle = (this.currentSpeed / 100) * 180 - 90; // -90 to 90 degrees
    const radians = (angle * Math.PI) / 180;
    return 60 + 35 * Math.cos(radians);
  }

  getSpeedIndicatorY(): number {
    const angle = (this.currentSpeed / 100) * 180 - 90; // -90 to 90 degrees
    const radians = (angle * Math.PI) / 180;
    return 60 + 35 * Math.sin(radians);
  }
}
