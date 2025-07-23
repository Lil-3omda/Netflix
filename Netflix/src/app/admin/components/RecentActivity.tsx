import React from 'react';
import { Play, UserPlus, AlertTriangle, TrendingUp } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'content',
      icon: Play,
      title: 'New series added',
      description: 'Wednesday Season 2 uploaded',
      time: '2 min ago',
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'user',
      icon: UserPlus,
      title: 'User milestone',
      description: '250M subscribers reached',
      time: '15 min ago',
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertTriangle,
      title: 'System alert',
      description: 'High server load detected',
      time: '1 hour ago',
      color: 'text-yellow-400'
    },
    {
      id: 4,
      type: 'growth',
      icon: TrendingUp,
      title: 'Revenue milestone',
      description: 'Monthly revenue up 15%',
      time: '2 hours ago',
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            <Icon className={activity.color} size={16} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-400">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}