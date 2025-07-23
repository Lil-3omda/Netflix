import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Analytics } from '../../models/movie.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{analytics?.totalUsers | number}}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎬</div>
          <div class="stat-content">
            <h3>{{analytics?.totalMovies | number}}</h3>
            <p>Total Content</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <h3>{{analytics?.activeUsers | number}}</h3>
            <p>Active Users</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-content">
            <h3>+12%</h3>
            <p>Growth Rate</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="popular-content">
          <h2>Popular Content</h2>
          <div class="content-list">
            <div *ngFor="let movie of analytics?.popularMovies" class="content-item">
              <img [src]="movie.posterUrl" [alt]="movie.title" class="content-poster">
              <div class="content-info">
                <h4>{{movie.title}}</h4>
                <p>{{movie.genre.join(', ')}}</p>
                <div class="rating">⭐ {{movie.rating}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="recent-activity">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">🎬</div>
              <div class="activity-info">
                <h4>New content added</h4>
                <p>3 new movies uploaded today</p>
                <span class="time">2 hours ago</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">👤</div>
              <div class="activity-info">
                <h4>User registrations</h4>
                <p>250 new users joined today</p>
                <span class="time">4 hours ago</span>
              </div>
            </div>
            
            <div class="activity-item">
              <div class="activity-icon">💬</div>
              <div class="activity-info">
                <h4>Support tickets</h4>
                <p>15 new support requests</p>
                <span class="time">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 30px;
      background: #0a0a0a;
      min-height: 100vh;
      color: #fff;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      border-color: #E50914;
    }

    .stat-icon {
      font-size: 2.5rem;
      background: rgba(229, 9, 20, 0.2);
      padding: 15px;
      border-radius: 50%;
      border: 2px solid #E50914;
    }

    .stat-content h3 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #E50914;
    }

    .stat-content p {
      margin: 5px 0 0 0;
      color: #ccc;
      font-size: 0.9rem;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .popular-content, .recent-activity {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 12px;
      border: 1px solid #333;
    }

    .popular-content h2, .recent-activity h2 {
      margin: 0 0 20px 0;
      color: #E50914;
      font-size: 1.3rem;
    }

    .content-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .content-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .content-item:hover {
      background-color: rgba(229, 9, 20, 0.1);
    }

    .content-poster {
      width: 60px;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
    }

    .content-info h4 {
      margin: 0 0 5px 0;
      font-size: 1rem;
    }

    .content-info p {
      margin: 0 0 5px 0;
      color: #ccc;
      font-size: 0.85rem;
    }

    .rating {
      color: #ffd700;
      font-size: 0.9rem;
    }

    .activity-list {
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
    }

    .activity-info h4 {
      margin: 0 0 5px 0;
      font-size: 0.95rem;
    }

    .activity-info p {
      margin: 0 0 5px 0;
      color: #ccc;
      font-size: 0.8rem;
    }

    .time {
      color: #999;
      font-size: 0.75rem;
    }

    @media (max-width: 768px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  analytics: Analytics | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAnalytics().subscribe(
      analytics => this.analytics = analytics
    );
  }
}