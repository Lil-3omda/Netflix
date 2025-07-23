import React from 'react';
import { TrendingUp, Users, Play, DollarSign, Eye, Clock } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Chart } from '../components/Chart';
import { RecentActivity } from '../components/RecentActivity';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Subscribers',
      value: '247.15M',
      change: '+2.3%',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Monthly Revenue',
      value: '$8.2B',
      change: '+15.2%',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Content Library',
      value: '15,273',
      change: '+156',
      icon: Play,
      color: 'text-purple-400'
    },
    {
      title: 'Watch Hours',
      value: '1.2B',
      change: '+8.7%',
      icon: Clock,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Revenue Trends</h3>
          <Chart type="revenue" />
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">User Growth</h3>
          <Chart type="users" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Content Performance</h3>
          <Chart type="content" />
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}