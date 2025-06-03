import React from 'react';

type CardSkeletonProps = {
  height?: string;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ height = 'h-32' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${height} w-full`}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;