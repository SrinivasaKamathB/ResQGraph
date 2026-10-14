import React from 'react';
import { ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';

const ComparisonPanel = () => {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-3">Optimization Impact</h3>
      
      <div className="flex items-center justify-between space-x-4">
        {/* Baseline */}
        <div className="flex-1 bg-gray-900 rounded p-2 border border-gray-700">
          <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-2 text-center">Standard FIFO</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Response</span>
              <span className="text-red-400 font-mono">45m</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Coverage</span>
              <span className="text-yellow-400 font-mono">65%</span>
            </div>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0" />

        {/* ResQGraph */}
        <div className="flex-1 bg-blue-900/20 rounded p-2 border border-blue-800">
          <div className="text-[10px] text-blue-300 uppercase tracking-wide mb-2 text-center font-bold">ResQGraph</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Response</span>
              <div className="flex items-center text-green-400 font-mono">
                18m <TrendingDown className="w-3 h-3 ml-1" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Coverage</span>
              <div className="flex items-center text-green-400 font-mono">
                100% <TrendingUp className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-[11px] text-center text-blue-200 bg-blue-900/30 py-1 rounded">
        Saves ~27 mins per incident • No duplicate dispatches
      </div>
    </div>
  );
};

export default ComparisonPanel;
