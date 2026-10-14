import React from 'react';
import { Play, RotateCcw, FileText } from 'lucide-react';

const SimulationControls = ({ state, onStart, onReset, onGenerateReport }) => {
  const progressPercent = (state.reportsProcessed / state.totalReports) * 100;

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-blue-200">
          {state.isRunning ? 'Simulation running...' : 'Simulation stopped'}
        </div>
        <div className="text-xs font-mono text-gray-400">
          {state.reportsProcessed} / {state.totalReports} processed
        </div>
      </div>

      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <button 
          onClick={onStart}
          disabled={state.isRunning}
          className={`flex-1 flex items-center justify-center py-2.5 rounded-lg font-bold text-sm transition-colors ${
            state.isRunning 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50'
          }`}
        >
          <Play className="w-4 h-4 mr-2" /> Start Flood Simulation
        </button>
        
        <button 
          onClick={onReset}
          className="px-4 py-2 bg-[#0d1533] hover:bg-[#15204a] border border-blue-800 text-blue-300 rounded-lg flex items-center justify-center transition-colors"
          title="Reset Simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button 
          onClick={onGenerateReport}
          disabled={state.reportsProcessed === 0}
          className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors border ${
            state.reportsProcessed === 0
              ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-500 text-blue-300'
          }`}
          title="Generate SitRep"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;
