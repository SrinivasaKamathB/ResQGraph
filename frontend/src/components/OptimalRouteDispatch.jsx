import React from 'react';
import { useDisaster } from '../context/DisasterContext';
import { Check, AlertOctagon, Navigation, ShieldCheck, RefreshCw } from 'lucide-react';

export default function OptimalRouteDispatch() {
  const { isApproved, approvePlan, activeReports } = useDisaster();

  // Active VOI rumor check
  const hasVoiRumor = activeReports.some((r) => r.is_rumor_voi);

  return (
    <div className="h-64 bg-[#0E131F] p-4 flex flex-col justify-between flex-shrink-0">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Navigation size={15} className="text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              Optimal Route Dispatch (OR-Tools)
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            {isApproved ? 'LIVE DISPATCH' : 'PLAN PENDING'}
          </span>
        </div>

        {/* VOI Rumor Alert Badge */}
        {hasVoiRumor && (
          <div className="mb-2.5 p-2 rounded bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-300 flex items-start gap-2">
            <AlertOctagon size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">VOI Engine Alert:</span> Unverified rumor detected on Silk Board bridge. Drone reconnaissance dispatched before ground team entry.
            </div>
          </div>
        )}

        {/* Fleet Allocation List */}
        <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center justify-between">
              <span>Boat Alpha</span>
              <span className="text-[9px] text-slate-400">ETA 9m</span>
            </div>
            <div className="text-slate-300 truncate">RMZ Ecospace ORR</div>
          </div>

          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center justify-between">
              <span>Boat Bravo</span>
              <span className="text-[9px] text-slate-400">ETA 12m</span>
            </div>
            <div className="text-slate-300 truncate">Rainbow Drive Gate 2</div>
          </div>

          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center justify-between">
              <span>Boat Charlie</span>
              <span className="text-[9px] text-slate-400">ETA 14m</span>
            </div>
            <div className="text-slate-300 truncate">Yamalur / Kempapura</div>
          </div>

          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <div className="font-bold text-cyan-400 flex items-center justify-between">
              <span>Boat Delta</span>
              <span className="text-[9px] text-slate-400">ETA 11m</span>
            </div>
            <div className="text-slate-300 truncate">HSR Layout Sec 5</div>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Commander Action */}
      <div>
        {isApproved ? (
          <div className="w-full py-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
            <ShieldCheck size={16} />
            Plan Approved & Rescue Units En Route
          </div>
        ) : (
          <button
            onClick={approvePlan}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            <Check size={16} strokeWidth={3} />
            Approve Dispatch Plan (Human-in-the-Loop)
          </button>
        )}
      </div>
    </div>
  );
}
