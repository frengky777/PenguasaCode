import React from 'react';
import { 
  Home, 
  BarChart2, 
  Users, 
  ShoppingBag, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Users, label: 'Customers' },
    { icon: ShoppingBag, label: 'Products' },
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
      </div>
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 border-t border-gray-200 p-4">
        <a href="#" className="flex items-center text-red-600 hover:text-red-800 text-sm">
          <LogOut size={18} className="mr-3" />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;