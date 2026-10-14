import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, HelpCircle, Award, Target, Cpu, CheckCircle2 } from 'lucide-react';

export default function HelpModal() {
  const { showHelp, setShowHelp } = useDisaster();

  if (!showHelp) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E131F] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[88vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setShowHelp(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            Documentation & Pitch Guide
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="text-cyan-400" size={20} />
            <span>ResQGraph Crisis Operation Guide</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            System operation reference, technical architecture highlights, and pitch flow.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          {/* Quick Pitch Flow */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2 mb-2">
              <Award size={16} />
              The 3-Minute Hackathon Pitch Flow
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 leading-relaxed">
              <li>
                <strong className="text-white">0:00 - 0:30 (The Crisis):</strong> Introduce the 2022 Bengaluru floods. Thousands of chaotic multilingual citizen calls in Kannada, Hindi, and English overwhelming 4 boats.
              </li>
              <li>
                <strong className="text-white">0:30 - 1:45 (Live Demo):</strong> Click <em>"Start Flood Simulation"</em> on the top bar. Watch 50 calls pour in, auto-cluster into 10 verified hazard zones, and draw glowing cyan boat routes.
              </li>
              <li>
                <strong className="text-white">1:45 - 2:30 (Key Differentiators):</strong> Point out the <em>VOI Engine</em> flagging the unverified Silk Board bridge rumor. Open <em>"Before vs After"</em> showing 36 minutes saved. Click <em>"Approve Dispatch Plan"</em>.
              </li>
              <li>
                <strong className="text-white">2:30 - 3:00 (Impact):</strong> Click <em>"SITREP"</em> to show the automated executive report for disaster authorities.
              </li>
            </ol>
          </div>

          {/* Technical Modules */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2 mb-2">
              <Cpu size={16} />
              Core Technical Algorithms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-0.5">1. Multilingual Gemini Extractor</div>
                <p className="text-[11px] text-slate-400">
                  Parses Kannada, Hindi, and English audio/text into structured coordinates, water levels, and medical urgency tags.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-0.5">2. HDBSCAN Incident Fusion</div>
                <p className="text-[11px] text-slate-400">
                  Merges dozens of duplicate calls within spatial proximity into single verified clusters with confidence scores.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-0.5">3. Google OR-Tools Routing</div>
                <p className="text-[11px] text-slate-400">
                  Computes mathematically optimal routes for limited boats avoiding bottlenecks and conflicting paths.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-white mb-0.5">4. Value-of-Information (VOI)</div>
                <p className="text-[11px] text-slate-400">
                  Evaluates if unverified social media rumors would break routes and automatically triggers drone reconnaissance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setShowHelp(false)}
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
