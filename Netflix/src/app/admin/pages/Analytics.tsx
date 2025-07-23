import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Play, Globe } from 'lucide-react';
import { Chart } from '../components/Chart';

export function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'User Acquisition',
      value: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Content Engagement',
      value: '+12.3%',
      trend: 'up',
      icon: Play,
      color: 'text-purple-400'
    },
    {
      title: 'Global Reach',
      value: '190 Countries',
      trend: 'stable',
      icon: Globe,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className={metric.color} size={24} />
                <TrendIcon className={metric.trend === 'up' ? 'text-green-400' : 'text-red-400'} size={16} />
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Revenue vs User Growth</h3>
          <Chart type="combined" />
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Geographic Distribution</h3>
          <Chart type="geographic" />
        </div>
      </div>

      {/* Device Analytics */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Device Usage Analytics</h3>
        <Chart type="devices" />
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Top Performing Content</h3>
          <div className="space-y-3">
            {[
              { title: 'Stranger Things 4', views: '1.2B', rating: 9.1 },
              { title: 'Wednesday', views: '987M', rating: 8.9 },
              { title: 'The Crown', views: '756M', rating: 8.7 },
              { title: 'Ozark', views: '654M', rating: 8.5 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.views} views</p>
                </div>
                <div className="text-yellow-400 font-bold">{item.rating}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Regional Performance</h3>
          <div className="space-y-3">
            {[
              { region: 'North America', subscribers: '75.2M', growth: '+2.1%' },
              { region: 'Europe', subscribers: '73.9M', growth: '+3.4%' },
              { region: 'Asia Pacific', subscribers: '68.3M', growth: '+5.7%' },
              { region: 'Latin America', subscribers: '29.7M', growth: '+1.8%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-medium">{item.region}</p>
                  <p className="text-sm text-gray-400">{item.subscribers} subscribers</p>
                </div>
                <div className="text-green-400 font-bold">{item.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}