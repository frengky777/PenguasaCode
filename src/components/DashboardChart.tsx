import React from 'react';

type ChartData = {
  labels: string[];
  values: number[];
};

type DashboardChartProps = {
  title: string;
  data: ChartData;
};

const DashboardChart: React.FC<DashboardChartProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.values) * 1.2;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-80">
      <h3 className="text-lg font-medium text-gray-800 mb-6">{title}</h3>
      
      <div className="flex items-end justify-between h-56 px-2 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
        
        {/* Horizontal grid lines */}
        <div className="absolute left-8 right-0 top-0 h-full">
          {[0, 1, 2, 3].map(i => (
            <div 
              key={i} 
              className="h-px bg-gray-200 w-full absolute" 
              style={{ top: `${i * 25}%` }}
            ></div>
          ))}
        </div>
        
        {/* Bars */}
        <div className="flex items-end justify-between w-full h-full pl-8">
          {data.values.map((value, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div 
                className="bg-indigo-500 hover:bg-indigo-600 rounded-t w-8 transition-all duration-300 ease-in-out"
                style={{ height: `${(value / maxValue) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{data.labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;