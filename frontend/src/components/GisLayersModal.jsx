import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, Layers, Droplets, Tent, Building2, Route, Check } from 'lucide-react';

export default function GisLayersModal() {
  const { activeTab, setActiveTab, gisLayers, toggleGisLayer } = useDisaster();

  if (activeTab !== 'layers') return null;

  const layersList = [
    {
      id: 'floodInundation',
      label: 'Flood Inundation Heatmap (>1.5m Water Depth)',
      description: 'Highlights critical submerged areas in Bellandur, Sarjapur, and HSR Layout.',
      icon: Droplets,
      color: 'text-blue-400',
    },
    {
      id: 'shelters',
      label: 'Emergency Relief Shelters & Camps',
      description: 'Displays 6 designated high-ground shelters and dry extraction points.',
      icon: Tent,
      color: 'text-emerald-400',
    },
    {
      id: 'criticalInfra',
      label: 'Critical Infrastructure & Power Grid Hazards',
      description: 'Overlays transformer substations, hospital power supplies, and drainage culverts.',
      icon: Building2,
      color: 'text-amber-400',
    },
    {
      id: 'routes',
      label: 'OR-Tools Dynamic Boat Rescue Corridors',
      description: 'Shows glowing cyan navigation vectors optimized by vehicle routing algorithms.',
      icon: Route,
      color: 'text-cyan-400',
    },
  ];

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
            GIS Overlay Management
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="text-cyan-400" size={20} />
            <span>Map Geospatial Layers</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle situational layers to filter hazard zones, public shelters, and navigation corridors.
          </p>
        </div>

        {/* Layers List */}
        <div className="space-y-3">
          {layersList.map((layer) => {
            const Icon = layer.icon;
            const isEnabled = gisLayers[layer.id];

            return (
              <div
                key={layer.id}
                onClick={() => toggleGisLayer(layer.id)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  isEnabled
                    ? 'bg-slate-900 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-80'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center ${layer.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{layer.label}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center border transition ${
                    isEnabled
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isEnabled && <Check size={16} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Apply & View Map
          </button>
        </div>
      </div>
    </div>
  );
}
