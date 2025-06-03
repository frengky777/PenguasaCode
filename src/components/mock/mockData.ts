// src/data/mockData.ts
import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export const stats = [
  { 
    id: 'stat-1',
    title: 'Total Customers', 
    value: '1,284', 
    change: '12%', 
    changeType: 'positive' as const, 
    icon: Users,
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-blue-100'
  },
  { 
    id: 'stat-2',
    title: 'Total Products', 
    value: '843', 
    change: '7%', 
    changeType: 'positive' as const, 
    icon: ShoppingBag,
    iconColor: 'text-purple-500',
    iconBgColor: 'bg-purple-100'
  },
  { 
    id: 'stat-3',
    title: 'Revenue', 
    value: '$45,289', 
    change: '3%', 
    changeType: 'negative' as const, 
    icon: DollarSign,
    iconColor: 'text-green-500',
    iconBgColor: 'bg-green-100'
  },
  { 
    id: 'stat-4',
    title: 'Growth', 
    value: '24.8%', 
    change: '2%', 
    changeType: 'positive' as const, 
    icon: TrendingUp,
    iconColor: 'text-red-500',
    iconBgColor: 'bg-red-100'
  }
];

export const recentActivities = [
  { id: '1', user: 'John Doe', action: 'Created', target: 'New Product', time: '5 min ago', status: 'completed' as const },
  { id: '2', user: 'Jane Smith', action: 'Updated', target: 'Customer #1284', time: '10 min ago', status: 'completed' as const },
  { id: '3', user: 'Alex Johnson', action: 'Deleted', target: 'Old Inventory', time: '25 min ago', status: 'failed' as const },
  { id: '4', user: 'Emma Wilson', action: 'Processed', target: 'Order #582', time: '1 hour ago', status: 'pending' as const },
  { id: '5', user: 'Michael Brown', action: 'Approved', target: 'Refund #128', time: '3 hours ago', status: 'completed' as const },
];

export const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [65, 59, 80, 81, 56, 55, 40, 58, 62, 79, 85, 90]
};
