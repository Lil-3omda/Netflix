import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="netflix-privacy">
      <!-- Header -->
      <header class="netflix-header">
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

      <div class="main-container">
        <!-- Sidebar -->
        <aside class="sidebar">
          <nav class="sidebar-nav">
            <div class="nav-section">
              <h3>Privacy Info</h3>
              <ul>
                <li><a href="#" class="nav-link active">Privacy Statement</a></li>
                <li><a href="#" class="nav-link">Request to Access Personal Information</a></li>
                <li><a href="#" class="nav-link">Request to Delete Personal Information</a></li>
                <li><a href="#" class="nav-link">Request to Access Personal Information (Children)</a></li>
                <li><a href="#" class="nav-link">Request to Correct Personal Information</a></li>
                <li><a href="#" class="nav-link">Your Privacy Choices</a></li>
                <li><a href="#" class="nav-link">Netflix Cookie Disclosure</a></li>
                <li><a href="#" class="nav-link">Netflix Sensitive Personal Information</a></li>
              </ul>
            </div>

            <div class="nav-section">
              <h3>Help Center</h3>
              <ul>
                <li><a href="#" class="nav-link">Help Center</a></li>
                <li><a href="#" class="nav-link">Contact Us</a></li>
              </ul>
            </div>

            <div class="nav-section">
              <h3>Legal Notices</h3>
              <ul>
                <li><a href="#" class="nav-link">Terms of Use</a></li>
                <li><a href="#" class="nav-link">Privacy Statement</a></li>
                <li><a href="#" class="nav-link">Cookie Preferences</a></li>
                <li><a href="#" class="nav-link">Corporate Information</a></li>
              </ul>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
          <article class="privacy-content">
            <header class="content-header">
              <h1>Privacy Statement</h1>
              <p class="last-updated">Last Updated: April 17, 2024</p>
            </header>

            <div class="content-body">
              <section class="intro-section">
                <p>
                  This Privacy Statement explains our practices, including your choices, regarding the collection, use, and disclosure of certain information, including your personal information, by Netflix and its affiliates ("Netflix," "we," "us," or "our").
                </p>
              </section>

              <section class="section">
                <h2>How We Get Your Personal Information</h2>
                <p>
                  We collect information about you and devices you use to access our service in several ways.
                  Such information may be obtained from external sources and stored by us so that we can provide you the Netflix service.
                </p>

                <h3>Information you provide to us:</h3>
                <ul>
                  <li>Account registration and profile information, including your name, email address, phone number, payment method, and account settings;</li>
                  <li>Communications with us, including customer service interactions, and when you participate in polls, surveys, questionnaires, and other research;</li>
                  <li>Content you submit to our service, such as ratings, reviews, or posts to our social features;</li>
                  <li>Information when you choose to participate in interactive experiences like games, quizzes, promotions, and events.</li>
                </ul>

                <h3>Information we collect automatically:</h3>
                <ul>
                  <li>Activity information, such as titles you have watched, search queries, and how you interact with our service;</li>
                  <li>Device information, including device identifiers, operating system, browser type, IP address, and internet service provider;</li>
                  <li>Location information, including general location inferred from IP address and precise location (where you have provided permission);</li>
                  <li>Performance and usage data about your use of our service.</li>
                </ul>
              </section>

              <section class="section">
                <h2>Cookies & Other Technologies</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized advertising.
                  You can manage your cookie preferences through your browser settings or our Cookie Preferences center.
                </p>
              </section>

              <section class="section">
                <h2>How We Use Your Personal Information</h2>
                <ul>
                  <li>To provide you the Netflix service and features;</li>
                  <li>To process transactions and billing;</li>
                  <li>To improve and develop our service;</li>
                  <li>To communicate with you about our service;</li>
                  <li>To personalize your experience and recommendations;</li>
                  <li>To comply with law and prevent illegal uses of our service.</li>
                </ul>
              </section>

              <section class="section">
                <h2>Who We Share Personal Information With</h2>
                <p>
                  We may share your personal information with third parties in certain circumstances, including:
                </p>
                <ul>
                  <li>Service providers that help us deliver our service;</li>
                  <li>Business partners for promotional and marketing activities;</li>
                  <li>Law enforcement and government authorities when required by law;</li>
                  <li>Other parties in connection with certain legal processes.</li>
                </ul>
              </section>

              <section class="section">
                <h2>Other Websites</h2>
                <p>
                  The Netflix service may be provided through and/or utilize features operated by third parties,
                  such as social networking services. These third parties may collect information about you when you use the Netflix service.
                </p>
              </section>

              <section class="section">
                <h2>Children</h2>
                <p>
                  You must be 18 years of age or older to subscribe to the Netflix service.
                  In certain jurisdictions, the age of majority may be older than 18,
                  in which case you must satisfy that age in order to become a member.
                </p>
              </section>

              <section class="section">
                <h2>Your Information Choices</h2>
                <p>
                  You have choices about your information. You can:
                </p>
                <ul>
                  <li>Access and update your account information;</li>
                  <li>Adjust your communication preferences;</li>
                  <li>Manage your cookie preferences;</li>
                  <li>Request deletion of your account and associated information.</li>
                </ul>
              </section>

              <section class="section">
                <h2>Security</h2>
                <p>
                  We use reasonable administrative, logical, physical and managerial measures to safeguard your personal information against loss,
                  theft and unauthorized access, use and modification.
                </p>
              </section>

              <section class="section">
                <h2>Cross-Border Data Transfers</h2>
                <p>
                  Netflix is a global service. We may transfer your personal information to countries other than the one in which you live,
                  including to the United States where Netflix is headquartered.
                </p>
              </section>

              <section class="section">
                <h2>Changes to This Privacy Statement</h2>
                <p>
                  We will update this Privacy Statement from time to time to reflect changes in our practices.
                  When we make changes, we will revise the "Last Updated" date at the top of this statement.
                </p>
              </section>

              <section class="section">
                <h2>Contact Us</h2>
                <p>
                  For questions specifically about this Privacy Statement, or our use of your personal information,
                  cookies or similar technologies, please contact our Data Protection Officer/Privacy Office at privacynetflix.com.
                </p>
              </section>
            </div>
          </article>
        </main>
      </div>
    </div>
  `,
  styles: `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .netflix-privacy {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #000;
      color: #fff;
      min-height: 100vh;
    }

    .netflix-header {
      background-color: #000;
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
      transition: background-color 0.3s;
    }

    .privacy-link:hover {
      background-color: #fff;
      color: #000;
    }

    .main-container {
      display: flex;
      max-width: 1200px;
      margin: 0 auto;
      gap: 40px;
      padding: 20px 50px;
    }

    .sidebar {
      width: 300px;
      background-color: #111;
      padding: 20px;
      border-radius: 8px;
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .nav-section {
      margin-bottom: 30px;
    }

    .nav-section h3 {
      color: #e50914;
      font-size: 16px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333;
    }

    .nav-section ul {
      list-style: none;
    }

    .nav-section li {
      margin-bottom: 8px;
    }

    .nav-link {
      color: #ccc;
      text-decoration: none;
      font-size: 14px;
      padding: 8px 12px;
      display: block;
      border-radius: 4px;
      transition: all 0.3s;
    }

    .nav-link:hover {
      background-color: #222;
      color: #fff;
      padding-left: 16px;
    }

    .nav-link.active {
      background-color: #e50914;
      color: #fff;
    }

    .main-content {
      flex: 1;
      background-color: #111;
      border-radius: 8px;
      padding: 40px;
    }

    .content-header h1 {
      font-size: 36px;
      color: #e50914;
      margin-bottom: 10px;
    }

    .last-updated {
      color: #999;
      font-size: 14px;
      margin-bottom: 30px;
    }

    .content-body {
      line-height: 1.6;
    }

    .intro-section {
      background-color: #1a1a1a;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 4px solid #e50914;
    }

    .section {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #333;
    }

    .section:last-child {
      border-bottom: none;
    }

    .section h2 {
      color: #e50914;
      font-size: 24px;
      margin-bottom: 15px;
    }

    .section h3 {
      color: #fff;
      font-size: 18px;
      margin: 20px 0 10px 0;
    }

    .section p {
      color: #ccc;
      margin-bottom: 15px;
      font-size: 16px;
    }

    .section ul {
      padding-left: 20px;
      margin-bottom: 15px;
    }

    .section li {
      color: #ccc;
      margin-bottom: 8px;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .main-container {
        flex-direction: column;
        padding: 20px;
        gap: 20px;
      }

      .sidebar {
        width: 100%;
        position: static;
      }

      .header-content {
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
      }

      .header-right {
        justify-content: center;
      }

      .main-content {
        padding: 20px;
      }

      .content-header h1 {
        font-size: 28px;
      }
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #111;
    }

    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `
})
export class PrivacyComponent {}
