import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLoading } from '../context/LoadingContext';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { toggleLoading, isLoading } = useLoading();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <button
              onClick={toggleLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isLoading ? 'Show Content' : 'Show Skeletons'}
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
