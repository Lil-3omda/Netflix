import type { User, Content } from '../types';

export const formatUserStats = (users: User[]) => {
  const total = users.length;
  const active = users.filter(u => u.status === 'Active').length;
  const premium = users.filter(u => u.subscription === 'Premium').length;
  
  return {
    total,
    active,
    premium,
    activePercentage: ((active / total) * 100).toFixed(1),
    premiumPercentage: ((premium / total) * 100).toFixed(1)
  };
};

export const formatContentStats = (content: Content[]) => {
  const movies = content.filter(c => c.type === 'Movie').length;
  const series = content.filter(c => c.type === 'Series').length;
  
  return {
    total: content.length,
    movies,
    series,
    moviesPercentage: ((movies / content.length) * 100).toFixed(1),
    seriesPercentage: ((series / content.length) * 100).toFixed(1)
  };
};

export const formatNumber = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-green-600';
    case 'inactive': return 'bg-yellow-600';
    case 'suspended': return 'bg-red-600';
    default: return 'bg-gray-600';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority.toLowerCase()) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-yellow-400';
    case 'low': return 'text-green-400';
    default: return 'text-gray-400';
  }
};