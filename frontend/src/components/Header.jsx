import React from 'react';
import { Activity, Radio } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-brand-primary border-b border-brand-accent px-6 py-3 flex justify-between items-center z-10 relative">
      <div className="flex items-center space-x-4">
        <Activity className="text-blue-400 w-8 h-8" />
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">ResQGraph</h1>
          <p className="text-xs text-blue-200">Disaster Response Commander Dashboard</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="bg-[#0a0f24] px-4 py-1.5 rounded-full border border-blue-800 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-sm text-gray-300 font-medium">Scenario: Bengaluru Flood Response</span>
        </div>
        
        <div className="flex items-center space-x-2 text-green-400">
          <Radio className="w-4 h-4" />
          <span className="text-sm font-semibold">Live System Connected</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
