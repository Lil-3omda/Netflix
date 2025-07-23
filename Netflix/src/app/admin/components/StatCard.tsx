import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <Icon className={color} size={24} />
        <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}