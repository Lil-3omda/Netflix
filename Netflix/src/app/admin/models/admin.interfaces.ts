export type AdminPageType = 'dashboard' | 'content' | 'users' | 'analytics' | 'chatbot' | 'communications' | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'Basic' | 'Standard' | 'Premium';
  status: 'Active' | 'Inactive' | 'Suspended';
  role: 'User' | 'Admin';
  joinDate: string;
  lastActive: string;
  region: string;
  avatar?: string;
  isAdmin?: boolean;
}
// export interface AnalyticsData {

// }

export interface AnalyticsData {
  totalSubscriptions: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  renewalRate: number;
  customerLifetimeValue: number;
  retentionRate: number;
  growthRate: number;
  ARPU: number;
  planDistribution: PlanDistribution[];
}

export interface PlanDistribution {
  planName: string;
  count: number;
  revenue: number;
}
export interface Content {
  id: number;
  title: string;
  type: 'Movie' | 'Series';
  genre: string;
  rating: number;
  views: string;
  status: string;
  releaseDate: string;
  seasons?: number;
  duration?: string;
  thumbnail?: string;
  description?: string;
  trailer?: string;
}

export interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  user: string;
  platform: string;
  lastMessage: string;
  timestamp: string;
  status: 'unread' | 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
  active: number;
}

export interface MenuItem {
  id: AdminPageType;
  label: string;
  icon: string;
  route: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[] | string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}


export type Stars = 1 | 2 | 3 | 4 | 5;


export interface Review {
  id: number;
  profileName: string;
  rating: number;
  comment: string;
  createdAt: string;
  videoId: number;
  videoTitle?: string;
}


export interface ReviewStatistics {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Partial<Record<Stars, number>>;
}

