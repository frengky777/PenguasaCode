import React from 'react';

const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-80">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="flex items-end justify-between h-56 px-2">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="bg-gray-200 rounded-t w-8" 
              style={{ height: `${20 + Math.random() * 80}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-10"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSkeleton;