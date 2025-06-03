import React from 'react';

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
};

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex">
            {[...Array(columns)].map((_, i) => (
              <div 
                key={i} 
                className="h-4 bg-gray-300 rounded mr-4" 
                style={{ width: i === 0 ? '20%' : `${Math.floor(80 / (columns - 1))}%` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Rows */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="px-6 py-4 border-b border-gray-200 last:border-0"
          >
            <div className="flex items-center">
              {[...Array(columns)].map((_, colIndex) => (
                <div 
                  key={colIndex} 
                  className="h-4 bg-gray-200 rounded mr-4" 
                  style={{ width: colIndex === 0 ? '20%' : `${Math.floor(80 / (columns - 1))}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;