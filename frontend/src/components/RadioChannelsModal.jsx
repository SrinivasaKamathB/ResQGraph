import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, Radio, Volume2, Play, Pause, Mic, Wifi } from 'lucide-react';

export default function RadioChannelsModal() {
  const { activeTab, setActiveTab } = useDisaster();
  const [activeChannel, setActiveChannel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (activeTab !== 'radio') return null;

  const channels = [
    {
      id: 1,
      freq: '156.800 MHz (VHF Ch 16)',
      name: 'SDRF Distress Calling & Safety',
      status: 'TRANSMITTING',
      lastMessage: 'Squad Alpha approaching Bellandur culvert. Water flow high. Proceed with caution.',
      origin: 'HAL Command HQ',
    },
    {
      id: 2,
      freq: '161.975 MHz (VHF Ch 87B)',
      name: 'NDRF 10th Battalion Tactical Net',
      status: 'LISTENING',
      lastMessage: 'Rainbow Drive gate 2 evacuation initiated. 4 elderly citizens secured.',
      origin: 'NDRF Bravo Unit',
    },
    {
      id: 3,
      freq: '157.100 MHz (Police Net)',
      name: 'Bengaluru City Police & Traffic HQ',
      status: 'ACTIVE',
      lastMessage: 'Silk Board flyover traffic diverted to Koramangala 80ft road. Water logging under control.',
      origin: 'Control Room 112',
    },
    {
      id: 4,
      freq: '121.500 MHz (Airband Guard)',
      name: 'Drone Reconnaissance & Air Ops',
      status: 'MONITORING',
      lastMessage: 'Recon Drone 02 over Yamalur lake. Submerged vehicles spotted along perimeter.',
      origin: 'Civil Defense Drone Squad',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E131F] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative">
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
            Tactical Communications
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Radio className="text-cyan-400" size={20} />
            <span>Emergency Radio & VHF Net</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-2"></span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Live emergency frequencies, field audio dispatches, and drone telemetry communications.
          </p>
        </div>

        {/* Channel Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          {channels.map((ch, idx) => (
            <div
              key={ch.id}
              onClick={() => setActiveChannel(idx)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                activeChannel === idx
                  ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-cyan-400">{ch.freq}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-emerald-400">
                  {ch.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-200">{ch.name}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 italic">
                "{ch.lastMessage}"
              </p>
            </div>
          ))}
        </div>

        {/* Live Audio Tuner Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="text-cyan-400" size={18} />
              <span className="text-xs font-bold text-slate-200">
                Frequency Audio: {channels[activeChannel].freq}
              </span>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition"
            >
              {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
              {isPlaying ? 'Mute Channel' : 'Listen Live'}
            </button>
          </div>

          {/* Animated Frequency Bars */}
          <div className="h-8 flex items-center gap-1 bg-slate-950 px-3 rounded-lg border border-slate-800">
            {[...Array(32)].map((_, i) => (
              <span
                key={i}
                className={`flex-1 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-slate-800'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, ((i * 13) % 95))}%` : '20%',
                }}
              ></span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Close Radio Net
          </button>
        </div>
      </div>
    </div>
  );
}
