import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { 
  LayoutDashboard, 
  Activity, 
  Layers, 
  Radio, 
  Sliders, 
  HelpCircle, 
  RotateCcw 
} from 'lucide-react';

export default function SidebarNav() {
  const { activeTab, setActiveTab, resetSimulation, setShowHelp } = useDisaster();

  const navItems = [
    { id: 'dashboard', label: 'Incident Command Map', icon: LayoutDashboard },
    { id: 'telemetry', label: 'Fleet Telemetry & Status', icon: Activity },
    { id: 'layers', label: 'GIS Overlays & Layers', icon: Layers },
    { id: 'radio', label: 'Tactical Radio & Channels', icon: Radio },
    { id: 'settings', label: 'Crisis Parameters & Mesh', icon: Sliders },
  ];

  return (
    <aside className="w-16 bg-[#0E131F] border-r border-slate-800 flex flex-col items-center py-4 justify-between z-20 flex-shrink-0">
      {/* Top Brand Logo */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105 transition"
          title="ResQGraph Command Center"
        >
          Q
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition relative group ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={item.label}
              >
                <Icon size={20} />
                {isActive && (
                  <span className="absolute -left-1 w-1 h-5 rounded-r bg-cyan-400"></span>
                )}
                {/* Floating tooltip */}
                <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 shadow-xl">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Utility Items */}
      <div className="flex flex-col gap-3">
        <button 
          onClick={() => setShowHelp(true)}
          className="w-10 h-10 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 flex items-center justify-center transition relative group"
          title="Crisis Guidelines & Hackathon Pitch"
        >
          <HelpCircle size={20} />
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 shadow-xl">
            Crisis Guidelines
          </span>
        </button>

        <button 
          onClick={resetSimulation}
          className="w-10 h-10 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 flex items-center justify-center transition relative group"
          title="Reset Simulation State"
        >
          <RotateCcw size={19} />
          <span className="absolute left-14 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-200 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition z-50 shadow-xl">
            Reset State
          </span>
        </button>
      </div>
    </aside>
  );
}
