import React from 'react';

interface ChartProps {
  type: 'revenue' | 'users' | 'content' | 'combined' | 'geographic' | 'devices';
}

export function Chart({ type }: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'revenue':
        return (
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 82, 94, 87, 92, 98, 89, 95, 88, 94, 100].map((height, index) => (
              <div key={index} className="flex-1 bg-red-600 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      case 'users':
        return (
          <div className="h-64 flex items-end justify-between space-x-2">
            {[45, 58, 72, 84, 79, 86, 91, 88, 92, 95, 89, 96].map((height, index) => (
              <div key={index} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      case 'content':
        return (
          <div className="h-64 flex items-end justify-between space-x-2">
            {[55, 68, 75, 89, 82, 88, 94, 91, 87, 93, 96, 92].map((height, index) => (
              <div key={index} className="flex-1 bg-purple-600 rounded-t" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        );
      case 'combined':
        return (
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between space-x-1">
              {[65, 78, 82, 94, 87, 92, 98, 89, 95, 88, 94, 100].map((height, index) => (
                <div key={index} className="flex-1 bg-red-600/50 rounded-t" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-end justify-between space-x-1">
              {[45, 58, 72, 84, 79, 86, 91, 88, 92, 95, 89, 96].map((height, index) => (
                <div key={index} className="flex-1 bg-blue-600/70 rounded-t ml-0.5" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        );
      case 'geographic':
        return (
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-red-600 rounded-full mb-4 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold">190</span>
              </div>
              <p className="text-gray-400">Countries Served</p>
            </div>
          </div>
        );
      case 'devices':
        return (
          <div className="h-64 flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full mb-2 flex items-center justify-center text-sm font-bold">45%</div>
              <p className="text-xs text-gray-400">Mobile</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full mb-2 flex items-center justify-center text-sm font-bold">35%</div>
              <p className="text-xs text-gray-400">Desktop</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full mb-2 flex items-center justify-center text-sm font-bold">20%</div>
              <p className="text-xs text-gray-400">TV</p>
            </div>
          </div>
        );
      default:
        return <div className="h-64 bg-gray-700 rounded-lg"></div>;
    }
  };

  return (
    <div className="w-full">
      {renderChart()}
    </div>
  );
}