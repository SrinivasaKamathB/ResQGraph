import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { Volume2, MessageSquare, AlertCircle, Play, Pause } from 'lucide-react';

export default function DistressStream() {
  const { activeReports } = useDisaster();
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="flex-1 bg-[#101624] border-b border-slate-800 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-[#0E131F]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
          <h2 className="text-xs font-bold text-slate-200 tracking-wide uppercase">
            Live Distress Stream
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
          {activeReports.length} Reports Ingested
        </span>
      </div>

      {/* Stream Cards List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {[...activeReports].reverse().map((report) => {
          const isAudio = report.channel === 'VOICE';
          const isPlaying = playingId === report.id;

          return (
            <div
              key={report.id}
              className={`p-3 rounded-lg border transition ${
                report.is_rumor_voi
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : report.medical_emergency
                  ? 'bg-red-950/20 border-red-500/30'
                  : 'bg-[#151D2F] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                    {report.language}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {report.channel}
                  </span>
                  {report.is_rumor_voi && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      UNVERIFIED RUMOR
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    report.medical_emergency
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}
                >
                  {report.medical_emergency ? 'P1 - MEDICAL' : 'P2 - WATERLOGGED'}
                </span>
              </div>

              {/* Audio Waveform Row (If Voice Input) */}
              {isAudio && (
                <div className="my-2 p-2 rounded bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
                  <button
                    onClick={() => togglePlay(report.id)}
                    className="w-7 h-7 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center hover:bg-cyan-400 transition flex-shrink-0"
                  >
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                  </button>

                  {/* Animated Waveform Visualizer */}
                  <div className="flex-1 flex items-center gap-0.5 h-5 px-1">
                    {[40, 75, 30, 90, 60, 100, 45, 80, 65, 35, 95, 70, 50, 85, 30, 60, 90, 45].map((height, i) => (
                      <span
                        key={i}
                        className={`flex-1 rounded-full transition-all duration-150 ${
                          isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-slate-700'
                        }`}
                        style={{ height: `${isPlaying ? Math.max(20, (height + i * 5) % 100) : 30}%` }}
                      ></span>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400">0:14</span>
                </div>
              )}

              {/* Message Transcript / Text */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                "{report.raw_text}"
              </p>

              {/* AI Extraction Footer */}
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-slate-300 font-semibold truncate max-w-[160px]">
                  📍 {report.extracted_landmark}
                </span>
                <div className="flex items-center gap-2.5">
                  <span>🌊 {report.est_water_level}m</span>
                  <span>👥 {report.casualties} stranded</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
