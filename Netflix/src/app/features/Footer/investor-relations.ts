export class InvestorRelationsComponent {
  // Component properties
  public companyProfile = {
    title: 'Company Profile',
    marketCap: '$1,233.27',
    marketCapSubtext: 'Billion USD in',
    marketCapDate: 'December 2024',
    description: 'Netflix is the world\'s leading streaming entertainment service with over 260 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages.'
  };

  public investorEvents = [
    {
      title: 'Netflix Second Quarter 2024 Earnings Interview',
      date: 'July 18, 2024',
      type: 'earnings',
      link: '#'
    },
    {
      title: 'Annual Meeting of Stockholders at Netflix, Inc.',
      date: 'June 6, 2024',
      type: 'meeting',
      link: '#'
    }
  ];

  public investorKit = [
    { title: 'Long Term View', link: '#' },
    { title: 'Investor Questions', link: '#' },
    { title: 'Contact Accounting Overview', link: '#' },
    { title: 'Netflix Culture', link: '#' },
    { title: 'Netflix Approach to Corporate Governance', link: '#' }
  ];

  public financialReleases = [
    {
      title: 'Netflix Announces Fourth Quarter and Full Year 2024 Results',
      date: 'January 16, 2025',
      type: 'quarterly'
    },
    {
      title: 'Netflix Invests in Content: Productions Ramp-up for 2024',
      date: 'December 15, 2024',
      type: 'announcement'
    },
    {
      title: 'Quarterly Earnings Report Q3 2024 Financial Results',
      date: 'October 18, 2024',
      type: 'quarterly'
    }
  ];

  public quarterlyEarnings = {
    title: 'Second Quarter 2024 Financial Results',
    description: 'Netflix continues to deliver strong financial performance with subscriber growth across all regions.',
    viewResults: '#'
  };

  public quickLinks = [
    { title: 'Annual Reports & Proxies', icon: '📄' },
    { title: 'SEC Filings', icon: '📋' },
    { title: 'Stock Information', icon: '📈' },
    { title: 'IR Contacts', icon: '👥' }
  ];

  // HTML Template
  public template = \`
    <div class="investor-relations-container">
      <!-- Header Section -->
      <header class="header-section">
        <div class="netflix-logo">
          <span class="netflix-text">NETFLIX</span>
          <span class="nav-text">INVESTORS</span>
        </div>
        <nav class="header-nav">
          <a href="#" class="nav-link">Overview</a>
          <a href="#" class="nav-link">Financials</a>
          <a href="#" class="nav-link">Events</a>
          <a href="#" class="nav-link">Governance</a>
          <a href="#" class="nav-link">News</a>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Company Profile Section -->
        <section class="company-profile-section">
          <div class="section-container">
            <div class="company-info">
              <h2 class="section-title">\${this.companyProfile.title}</h2>
              <p class="company-description">\${this.companyProfile.description}</p>
              <div class="additional-links">
                <a href="#" class="link">Netflix Second Quarter 2024 Earnings Interview</a>
                <a href="#" class="link">Annual Meeting of Stockholders at Netflix, Inc.</a>
                <a href="#" class="link">Benefits</a>
              </div>
            </div>
            <div class="market-cap-card">
              <div class="market-cap-value">\${this.companyProfile.marketCap}</div>
              <div class="market-cap-label">\${this.companyProfile.marketCapSubtext}</div>
              <div class="market-cap-date">\${this.companyProfile.marketCapDate}</div>
            </div>
          </div>
        </section>

        <!-- Investor Events and Kit Section -->
        <section class="investor-section">
          <div class="section-container">
            <div class="investor-events">
              <h3 class="subsection-title">
                <span class="icon">📅</span>
                Investor Events
              </h3>
              <div class="events-list">
                \${this.investorEvents.map(event => \`
                  <div class="event-item">
                    <h4 class="event-title">\${event.title}</h4>
                    <span class="event-date">\${event.date}</span>
                  </div>
                \`).join('')}
              </div>
            </div>
            <div class="investor-kit">
              <h3 class="subsection-title">
                <span class="icon">📊</span>
                Investor Kit
              </h3>
              <div class="kit-list">
                \${this.investorKit.map(item => \`
                  <a href="\${item.link}" class="kit-item">\${item.title}</a>
                \`).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Financial Releases Section -->
        <section class="financial-section">
          <div class="section-container">
            <h2 class="section-title">Financial Releases and Updates</h2>
            <div class="financial-grid">
              \${this.financialReleases.map(release => \`
                <div class="financial-card">
                  <h4 class="financial-title">\${release.title}</h4>
                  <span class="financial-date">\${release.date}</span>
                  <span class="financial-type">\${release.type}</span>
                </div>
              \`).join('')}
            </div>
          </div>
        </section>

        <!-- Quarterly Earnings Section -->
        <section class="quarterly-section">
          <div class="section-container">
            <h2 class="section-title">Quarterly Earnings</h2>
            <div class="quarterly-content">
              <div class="quarterly-info">
                <h3 class="quarterly-title">\${this.quarterlyEarnings.title}</h3>
                <p class="quarterly-description">\${this.quarterlyEarnings.description}</p>
                <button class="view-results-btn">View Results</button>
              </div>
              <div class="quarterly-chart">
                <div class="chart-placeholder">
                  <div class="chart-bars">
                    <div class="bar" style="height: 60%"></div>
                    <div class="bar" style="height: 80%"></div>
                    <div class="bar" style="height: 75%"></div>
                    <div class="bar" style="height: 90%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Quick Links Section -->
        <section class="quick-links-section">
          <div class="section-container">
            <h2 class="section-title">Quick Links</h2>
            <div class="quick-links-grid">
              \${this.quickLinks.map(link => \`
                <div class="quick-link-card">
                  <div class="quick-link-icon">\${link.icon}</div>
                  <div class="quick-link-title">\${link.title}</div>
                </div>
              \`).join('')}
            </div>
          </div>
        </section>
      </main>
    </div>
  \`;

  // TypeScript Methods
  constructor() {
    this.init();
  }

  private init(): void {
    this.injectStyles();
    this.render();
    this.bindEvents();
  }

  private injectStyles(): void {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  }

  private render(): void {
    const container = document.getElementById('investor-relations-root');
    if (container) {
      container.innerHTML = this.template;
    }
  }

  private bindEvents(): void {
    // Add event listeners for interactive elements
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.classList.contains('view-results-btn')) {
        this.handleViewResults();
      }
      
      if (target.classList.contains('quick-link-card')) {
        this.handleQuickLinkClick(target);
      }
      
      if (target.classList.contains('financial-card')) {
        this.handleFinancialCardClick(target);
      }
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleNavigation(link as HTMLAnchorElement);
      });
    });
  }

  private handleViewResults(): void {
    console.log('Viewing quarterly results...');
    // Add logic to show quarterly results modal or navigate to results page
  }

  private handleQuickLinkClick(card: HTMLElement): void {
    const title = card.querySelector('.quick-link-title')?.textContent;
    console.log(\`Quick link clicked: \${title}\`);
    // Add logic to handle quick link navigation
  }

  private handleFinancialCardClick(card: HTMLElement): void {
    const title = card.querySelector('.financial-title')?.textContent;
    console.log(\`Financial release clicked: \${title}\`);
    // Add logic to show financial release details
  }

  private handleNavigation(link: HTMLAnchorElement): void {
    const href = link.getAttribute('href');
    console.log(\`Navigation clicked: \${href}\`);
    // Add logic for smooth scrolling or page navigation
  }

  // Public methods for external interaction
  public updateMarketCap(newValue: string): void {
    this.companyProfile.marketCap = newValue;
    this.render();
  }

  public addFinancialRelease(release: { title: string; date: string; type: string }): void {
    this.financialReleases.unshift(release);
    this.render();
  }

  public destroy(): void {
    // Cleanup method
    const container = document.getElementById('investor-relations-root');
    if (container) {
      container.innerHTML = '';
    }
  }
}

// Export for use in other modules
export default InvestorRelationsComponent;

// Usage example:
// const investorPage = new InvestorRelationsComponent();

  // CSS Styles
  public styles = `
    .investor-relations-container {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #000;
      color: #fff;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* Header Styles */
    .header-section {
      background: linear-gradient(135deg, rgba(229, 9, 20, 0.9), rgba(139, 0, 0, 0.9));
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .netflix-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .netflix-text {
      font-size: 1.8rem;
      font-weight: bold;
      color: #e50914;
      letter-spacing: 0.1em;
    }

    .nav-text {
      font-size: 1rem;
      color: #fff;
      font-weight: 300;
    }

    .header-nav {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #e50914;
    }

    /* Main Content */
    .main-content {
      padding: 0;
    }

    .section-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: #fff;
    }

    /* Company Profile Section */
    .company-profile-section {
      background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7));
      background-size: cover;
      background-position: center;
      padding: 4rem 0;
      margin-bottom: 3rem;
    }

    .company-profile-section .section-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .company-description {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 2rem;
      color: #ccc;
    }

    .additional-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .link {
      color: #e50914;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .link:hover {
      color: #fff;
      text-decoration: underline;
    }

    .market-cap-card {
      background: rgba(229, 9, 20, 0.1);
      border: 2px solid #e50914;
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      backdrop-filter: blur(10px);
    }

    .market-cap-value {
      font-size: 3rem;
      font-weight: bold;
      color: #e50914;
      margin-bottom: 0.5rem;
    }

    .market-cap-label {
      font-size: 1rem;
      color: #ccc;
      margin-bottom: 0.5rem;
    }

    .market-cap-date {
      font-size: 0.9rem;
      color: #999;
    }

    /* Investor Section */
    .investor-section {
      padding: 3rem 0;
      background: #111;
    }

    .investor-section .section-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .subsection-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon {
      font-size: 1.2rem;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .event-item {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #e50914;
    }

    .event-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #fff;
    }

    .event-date {
      font-size: 0.9rem;
      color: #ccc;
    }

    .kit-list {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .kit-item {
      color: #e50914;
      text-decoration: none;
      padding: 0.8rem;
      background: rgba(229, 9, 20, 0.1);
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .kit-item:hover {
      background: rgba(229, 9, 20, 0.2);
      transform: translateX(5px);
    }

    /* Financial Section */
    .financial-section {
      padding: 3rem 0;
      background: #000;
    }

    .financial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .financial-card {
      background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #333;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .financial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(229, 9, 20, 0.2);
    }

    .financial-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #fff;
    }

    .financial-date {
      display: block;
      color: #ccc;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .financial-type {
      display: inline-block;
      background: #e50914;
      color: #fff;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 500;
    }

    /* Quarterly Section */
    .quarterly-section {
      padding: 3rem 0;
      background: #111;
    }

    .quarterly-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .quarterly-title {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #fff;
    }

    .quarterly-description {
      font-size: 1.1rem;
      color: #ccc;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .view-results-btn {
      background: #e50914;
      color: #fff;
      border: none;
      padding: 1rem 2rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .view-results-btn:hover {
      background: #c5070f;
    }

    .quarterly-chart {
      background: #222;
      border-radius: 12px;
      padding: 2rem;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chart-bars {
      display: flex;
      align-items: end;
      gap: 1rem;
      height: 120px;
    }

    .bar {
      width: 40px;
      background: linear-gradient(to top, #e50914, #ff4757);
      border-radius: 4px 4px 0 0;
      transition: all 0.3s ease;
    }

    .bar:hover {
      filter: brightness(1.2);
    }

    /* Quick Links Section */
    .quick-links-section {
      padding: 3rem 0 6rem 0;
      background: #000;
    }

    .quick-links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .quick-link-card {
      background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      border: 1px solid #333;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .quick-link-card:hover {
      transform: translateY(-5px);
      border-color: #e50914;
      box-shadow: 0 10px 30px rgba(229, 9, 20, 0.2);
    }

    .quick-link-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .quick-link-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .company-profile-section .section-container,
      .investor-section .section-container,
      .quarterly-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .header-section {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .header-nav {
        flex-wrap: wrap;
        justify-content: center;
      }

      .section-title {
        font-size: 2rem;
      }

      .market-cap-value {
        font-size: 2.5rem;
      }

      .financial-grid {
        grid-template-columns: 1fr;
      }

      .quick-links-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 480px) {
      .section-container {
        padding: 0 1rem;
      }

      .quick-links-grid {
        grid-template-columns: 1fr;
      }

      .chart-bars {
        gap: 0.5rem;
      }

      .bar {
        width: 30px;
      }
    }
  `;
}
