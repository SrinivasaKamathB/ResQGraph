import React from 'react';
import { Navigation, Clock, ShieldCheck } from 'lucide-react';

const DispatchPanel = ({ plan = [] }) => {
  if (!plan || plan.length === 0) return null;

  return (
    <div className="bg-brand-dark rounded-xl border border-brand-accent flex flex-col">
      <div className="p-3 border-b border-brand-accent bg-[#111836] rounded-t-xl flex justify-between items-center">
        <h2 className="text-sm font-bold text-blue-200">Recommended Dispatch</h2>
        <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full border border-green-800">Ready</span>
      </div>
      
      <div className="p-2 space-y-2">
        {plan.map((vehicle) => (
          <div key={vehicle.id} className="bg-[#151e3f] p-3 rounded-lg border border-blue-800 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-sm text-gray-200">{vehicle.type} {vehicle.id}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Assign to Incident #{vehicle.target}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-green-400">
                <Clock className="w-3 h-3" />
                <span className="text-sm font-bold">{vehicle.eta}</span>
              </div>
              <p className="text-[10px] text-gray-500">ETA</p>
            </div>
          </div>
        ))}

        <button className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center transition-colors">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Approve All Dispatches
        </button>
      </div>
    </div>
  );
};

export default DispatchPanel;
