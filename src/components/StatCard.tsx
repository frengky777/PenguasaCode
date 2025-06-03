import React from 'react';
import { LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
  iconBgColor,
}) => {
  const changeColor = 
    changeType === 'positive' ? 'text-green-600' : 
    changeType === 'negative' ? 'text-red-600' : 
    'text-gray-600';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <p className={`text-xs mt-2 flex items-center ${changeColor}`}>
            {changeType === 'positive' && '↑ '}
            {changeType === 'negative' && '↓ '}
            {change} {changeType !== 'neutral' && 'from last period'}
          </p>
        </div>
        <div className={`h-12 w-12 rounded-full ${iconBgColor} flex items-center justify-center ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;