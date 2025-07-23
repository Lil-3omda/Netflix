import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Analytics } from '../../models/movie.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="analytics-container">
      <div class="analytics-header">
        <h1>Analytics & Reports</h1>
        <div class="date-filter">
          <select class="filter-select">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">👥</div>
          <div class="metric-content">
            <h3>{{analytics?.totalUsers | number}}</h3>
            <p>Total Users</p>
            <span class="metric-change positive">+12.5%</span>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">🎬</div>
          <div class="metric-content">
            <h3>{{analytics?.totalMovies | number}}</h3>
            <p>Total Content</p>
            <span class="metric-change positive">+8.3%</span>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">⭐</div>
          <div class="metric-content">
            <h3>{{analytics?.activeUsers | number}}</h3>
            <p>Active Users</p>
            <span class="metric-change positive">+15.2%</span>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">💰</div>
          <div class="metric-content">
            <h3>$2.4M</h3>
            <p>Revenue</p>
            <span class="metric-change positive">+22.1%</span>
          </div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <h3>User Growth</h3>
          <div class="chart-placeholder">
            <div class="growth-chart">
              <div *ngFor="let point of analytics?.userGrowth" class="chart-bar" 
                   [style.height.%]="(point.count / 125000) * 100">
                <span class="bar-label">{{point.date | date:'MMM'}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Watch Time by Genre</h3>
          <div class="genre-stats">
            <div *ngFor="let stat of analytics?.watchTimeStats" class="genre-item">
              <div class="genre-info">
                <span class="genre-name">{{stat.genre}}</span>
                <span class="genre-hours">{{stat.hours | number}} hours</span>
              </div>
              <div class="genre-bar">
                <div class="genre-fill" [style.width.%]="(stat.hours / 125000) * 100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reports-section">
        <div class="report-card">
          <h3>Popular Content</h3>
          <div class="popular-list">
            <div *ngFor="let movie of analytics?.popularMovies; let i = index" class="popular-item">
              <span class="rank">{{i + 1}}</span>
              <img [src]="movie.posterUrl" [alt]="movie.title" class="popular-poster">
              <div class="popular-info">
                <h4>{{movie.title}}</h4>
                <p>{{movie.genre.join(', ')}}</p>
                <div class="popular-stats">
                  <span class="rating">⭐ {{movie.rating}}</span>
                  <span class="views">1.2M views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="report-card">
          <h3>Recent Activity</h3>
          <div class="activity-feed">
            <div class="activity-item">
              <div class="activity-icon">🎬</div>
              <div class="activity-content">
                <p><strong>New content added:</strong> 5 movies uploaded</p>
                <span class="activity-time">2 hours ago</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">👤</div>
              <div class="activity-content">
                <p><strong>User milestone:</strong> 125K total users reached</p>
                <span class="activity-time">4 hours ago</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">📊</div>
              <div class="activity-content">
                <p><strong>Peak usage:</strong> 89K concurrent users</p>
                <span class="activity-time">6 hours ago</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">💬</div>
              <div class="activity-content">
                <p><strong>Support tickets:</strong> 25 new requests</p>
                <span class="activity-time">8 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .analytics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .analytics-header h1 {
      margin: 0;
      color: #E50914;
    }

    .filter-select {
      padding: 10px 15px;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .metric-card {
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.3s ease;
    }

    .metric-card:hover {
      transform: translateY(-5px);
      border-color: #E50914;
    }

    .metric-icon {
      font-size: 2.5rem;
      background: rgba(229, 9, 20, 0.2);
      padding: 15px;
      border-radius: 50%;
      border: 2px solid #E50914;
    }

    .metric-content h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #E50914;
    }

    .metric-content p {
      margin: 5px 0;
      color: #ccc;
      font-size: 0.9rem;
    }

    .metric-change {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .metric-change.positive {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }

    .charts-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }

    .chart-card {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
    }

    .chart-card h3 {
      margin: 0 0 20px 0;
      color: #E50914;
      font-size: 1.3rem;
    }

    .growth-chart {
      display: flex;
      align-items: end;
      gap: 10px;
      height: 200px;
      padding: 20px 0;
    }

    .chart-bar {
      flex: 1;
      background: linear-gradient(to top, #E50914, #ff4757);
      border-radius: 4px 4px 0 0;
      position: relative;
      min-height: 20px;
      transition: all 0.3s ease;
    }

    .chart-bar:hover {
      opacity: 0.8;
    }

    .bar-label {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8rem;
      color: #ccc;
    }

    .genre-stats {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .genre-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .genre-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .genre-name {
      font-weight: 500;
    }

    .genre-hours {
      color: #ccc;
      font-size: 0.9rem;
    }

    .genre-bar {
      height: 8px;
      background: #333;
      border-radius: 4px;
      overflow: hidden;
    }

    .genre-fill {
      height: 100%;
      background: linear-gradient(90deg, #E50914, #ff4757);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .reports-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .report-card {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
    }

    .report-card h3 {
      margin: 0 0 20px 0;
      color: #E50914;
      font-size: 1.3rem;
    }

    .popular-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .popular-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .popular-item:hover {
      background: rgba(229, 9, 20, 0.1);
    }

    .rank {
      font-size: 1.5rem;
      font-weight: 700;
      color: #E50914;
      min-width: 30px;
    }

    .popular-poster {
      width: 50px;
      height: 70px;
      object-fit: cover;
      border-radius: 6px;
    }

    .popular-info h4 {
      margin: 0 0 5px 0;
      font-size: 1rem;
    }

    .popular-info p {
      margin: 0 0 5px 0;
      color: #ccc;
      font-size: 0.8rem;
    }

    .popular-stats {
      display: flex;
      gap: 15px;
      font-size: 0.8rem;
    }

    .rating {
      color: #ffd700;
    }

    .views {
      color: #ccc;
    }

    .activity-feed {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
    }

    .activity-icon {
      font-size: 1.5rem;
      background: rgba(229, 9, 20, 0.2);
      padding: 10px;
      border-radius: 50%;
      min-width: 45px;
      text-align: center;
    }

    .activity-content p {
      margin: 0 0 5px 0;
      font-size: 0.9rem;
    }

    .activity-time {
      color: #999;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .charts-section,
      .reports-section {
        grid-template-columns: 1fr;
      }
      
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  analytics: Analytics | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe(
      analytics => this.analytics = analytics
    );
  }
}