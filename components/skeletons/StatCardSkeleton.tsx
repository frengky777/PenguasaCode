import React from 'react';

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="animate-pulse flex justify-between">
        <div className="space-y-3 w-2/3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;