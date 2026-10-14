import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, Sliders, Radio, Zap, Shield, Cpu, RefreshCw } from 'lucide-react';

export default function SettingsModal() {
  const { 
    activeTab, 
    setActiveTab, 
    meshOfflineMode, 
    setMeshOfflineMode,
    simulationSpeed,
    setSimulationSpeed,
    resetSimulation
  } = useDisaster();

  if (activeTab !== 'settings') return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E131F] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            System Tuning & Resilience
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="text-cyan-400" size={20} />
            <span>Crisis Parameters & Engine Config</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure algorithmic optimization models, simulation streaming rates, and low-bandwidth mesh fallbacks.
          </p>
        </div>

        {/* Settings Options */}
        <div className="space-y-4">
          {/* Zero-Bandwidth SMS Mesh Mode Toggle */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-100">
                  Zero-Bandwidth / SMS Mesh Network Mode
                </span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-800">
                  DEFENSE MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Compresses incoming distress calls into ultra-compact 60-byte radio/SMS payloads when 4G/5G towers are down.
              </p>
            </div>

            <button
              onClick={() => setMeshOfflineMode(!meshOfflineMode)}
              className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
                meshOfflineMode ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
            </button>
          </div>

          {/* Simulation Stream Speed */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-100">
                Flood Incident Streaming Cadence
              </span>
              <span className="text-xs font-mono text-cyan-400">
                {simulationSpeed === 250 ? 'Rapid (250ms)' : simulationSpeed === 500 ? 'Standard (500ms)' : 'Deliberate (1000ms)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { label: 'Rapid (250ms)', val: 250 },
                { label: 'Standard (500ms)', val: 500 },
                { label: 'Deliberate (1s)', val: 1000 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setSimulationSpeed(opt.val)}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                    simulationSpeed === opt.val
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Solver Engine Selection */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-100">Route Optimization Engine</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Current solver: <strong>Google OR-Tools Vehicle Routing Problem (VRP)</strong>
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800">
              OPTIMAL
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center pt-2">
          <button
            onClick={resetSimulation}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1.5"
          >
            <RefreshCw size={13} />
            Reset To Initial Scenario
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
}
