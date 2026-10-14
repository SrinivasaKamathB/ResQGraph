import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { AlertTriangle, Ship, CheckCircle2, Play, RotateCcw, FileText, ArrowRightLeft } from 'lucide-react';

export default function Navbar() {
  const { 
    activeReports, 
    allReports,
    streamIndex, 
    isSimulating, 
    startSimulation, 
    resetSimulation,
    setShowBeforeAfter,
    setShowSitrep
  } = useDisaster();

  const isComplete = streamIndex >= allReports.length;

  return (
    <header className="h-16 bg-[#0E131F] border-b border-slate-800 px-6 flex items-center justify-between z-10 flex-shrink-0">
      {/* Title & Status */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>ResQGraph</span>
          <span className="text-slate-500 font-normal">|</span>
          <span className="text-sm font-medium text-slate-300">AI Disaster Response Hub</span>
        </h1>
        <div className="ml-3 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
          Live Crisis: Bengaluru Urban Flood
        </div>
      </div>

      {/* Center Telemetry Stats */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-400" />
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Incidents</span>
            <span className="text-base font-bold text-red-400">{activeReports.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Ship size={18} className="text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Dispatched</span>
            <span className="text-base font-bold text-amber-400">4 Boats</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 size={18} className="text-cyan-400" />
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Critical Coverage</span>
            <span className="text-base font-bold text-cyan-400">86%</span>
          </div>
        </div>
      </div>

      {/* Right Controls & Simulation Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowBeforeAfter(true)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          title="Compare Manual vs AI Optimization"
        >
          <ArrowRightLeft size={14} className="text-cyan-400" />
          Before vs After
        </button>

        <button
          onClick={() => setShowSitrep(true)}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          title="Generate Executive Situation Report"
        >
          <FileText size={14} className="text-emerald-400" />
          SITREP
        </button>

        {isSimulating ? (
          <button
            onClick={resetSimulation}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-2 transition border border-amber-500/30"
          >
            <RotateCcw size={14} className="animate-spin" />
            Simulating ({streamIndex}/50)...
          </button>
        ) : (
          <button
            onClick={startSimulation}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-2 transition shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            <Play size={14} fill="currentColor" />
            {isComplete ? "Restart Flood Simulation" : "Start Flood Simulation"}
          </button>
        )}

        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center ml-2">
          HQ
        </div>
      </div>
    </header>
  );
}
