import React from 'react';
import { ShieldAlert, Crosshair } from 'lucide-react';

const VOIAlert = ({ alert }) => {
  if (!alert) return null;

  return (
    <div className="bg-orange-950/40 border border-orange-500/50 rounded-xl overflow-hidden animate-pulse">
      <div className="bg-orange-600 px-3 py-2 flex items-center space-x-2">
        <ShieldAlert className="w-4 h-4 text-white" />
        <h2 className="text-sm font-bold text-white tracking-wide">HIGH VALUE OF INFORMATION</h2>
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Crosshair className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-orange-200 text-sm mb-1">Verify: {alert.target}</h3>
            <p className="text-xs text-orange-100/80 mb-2 leading-relaxed">
              {alert.reason}
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400">Impact Score:</span>
              <span className="text-orange-400 font-bold font-mono">{(alert.impactScore * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-3 bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/50 text-orange-300 py-1.5 rounded text-xs font-bold transition-colors">
          Deploy Drone to Verify
        </button>
      </div>
    </div>
  );
};

export default VOIAlert;
