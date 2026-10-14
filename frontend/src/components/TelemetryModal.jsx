import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, BatteryCharging, Gauge, Anchor, Radio, Users, CheckCircle } from 'lucide-react';

export default function TelemetryModal() {
  const { activeTab, setActiveTab } = useDisaster();

  if (activeTab !== 'telemetry') return null;

  const fleet = [
    {
      id: 'BOAT_ALPHA',
      name: 'SDRF Squad Alpha (Boat 1)',
      commander: 'Capt. Rao (SDRF Marine Unit)',
      status: 'UNDERWAY',
      target: 'RMZ Ecospace ORR Basement Zone',
      speed: '14.2 knots',
      battery: 88,
      fuel: 92,
      crew: 4,
      capacity: '6 / 8 rescued',
      gps: '12.9360° N, 77.6961° E',
      engine: 'NOMINAL',
    },
    {
      id: 'BOAT_BRAVO',
      name: 'NDRF Squad Bravo (Boat 2)',
      commander: 'Sub. Kumar (NDRF 10th Bn)',
      status: 'ON SCENE',
      target: 'Rainbow Drive Layout Gate 2',
      speed: '8.4 knots',
      battery: 76,
      fuel: 85,
      crew: 4,
      capacity: '4 / 8 rescued',
      gps: '12.9126° N, 77.6872° E',
      engine: 'NOMINAL',
    },
    {
      id: 'BOAT_CHARLIE',
      name: 'Civil Defense Rescue 3',
      commander: 'Insp. Anita (Civil Defense)',
      status: 'UNDERWAY',
      target: 'Yamalur / Kempapura Bridge',
      speed: '11.8 knots',
      battery: 92,
      fuel: 79,
      crew: 3,
      capacity: '3 / 6 rescued',
      gps: '12.9463° N, 77.6789° E',
      engine: 'NOMINAL',
    },
    {
      id: 'BOAT_DELTA',
      name: 'Fire Dept Heavy Boat 4',
      commander: 'Sgt. David (Fire Force)',
      status: 'STAGING',
      target: 'HSR Layout 5th Sector Govt School',
      speed: '15.0 knots',
      battery: 84,
      fuel: 96,
      crew: 5,
      capacity: '8 / 10 rescued',
      gps: '12.9116° N, 77.6388° E',
      engine: 'NOMINAL',
    },
    {
      id: 'AMB_ALS_01',
      name: 'ALS Paramedic Ambulance 108',
      commander: 'Dr. Praveen (108 Emergency)',
      status: 'STANDBY',
      target: 'Koramangala SDRF Base Staging',
      speed: '0.0 knots',
      battery: 99,
      fuel: 90,
      crew: 2,
      capacity: 'Oxygen + Dialysis Ready',
      gps: '12.9350° N, 77.6200° E',
      engine: 'READY',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E131F] border border-slate-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
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
            Real-Time Telemetry Stream
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Rescue Fleet & Asset Telemetry</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
              5 Units Active
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Live sensor feeds, battery status, and spatial coordinates for deployed disaster response assets.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {fleet.map((unit) => (
            <div
              key={unit.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs">
                    🚤
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{unit.name}</h3>
                    <span className="text-[11px] text-slate-400 block">{unit.commander}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {unit.status}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {unit.speed}
                  </span>
                </div>
              </div>

              {/* Sub-metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <BatteryCharging size={14} className="text-emerald-400" />
                  <span>Battery: <strong className="text-white">{unit.battery}%</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Gauge size={14} className="text-amber-400" />
                  <span>Fuel: <strong className="text-white">{unit.fuel}%</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Users size={14} className="text-cyan-400" />
                  <span>Rescued: <strong className="text-white">{unit.capacity}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Radio size={14} className="text-purple-400" />
                  <span className="truncate">Target: <strong className="text-white">{unit.target.split(' ')[0]}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Back to Command Map
          </button>
        </div>
      </div>
    </div>
  );
}
