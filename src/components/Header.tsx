import React from 'react';
import { Bell, User, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="relative w-64 hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
      
      <div className="md:hidden">
        <Search className="text-gray-600" size={20} />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;