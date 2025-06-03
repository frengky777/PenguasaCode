import React from 'react';
import Dashboard from './pages/Dashboard';
import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </LoadingProvider>
  );
}

export default App;