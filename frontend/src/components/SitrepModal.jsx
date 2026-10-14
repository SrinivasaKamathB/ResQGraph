import React, { useState } from 'react';
import { useDisaster } from '../context/DisasterContext';
import { X, Copy, Check, FileCheck, Printer } from 'lucide-react';

export default function SitrepModal() {
  const { showSitrep, setShowSitrep, activeReports, isApproved } = useDisaster();
  const [copied, setCopied] = useState(false);

  if (!showSitrep) return null;

  const sitrepContent = `================================================================================
CRISIS SITUATION REPORT (SITREP-01) - RESQGRAPH COMMAND HUB
LOCATION: BENGALURU URBAN FLOOD INUNDATION SCENARIO (2022 SIMULATION)
DATE/TIME: ${new Date().toISOString()}
INCIDENT STATUS: ACTIVE CRISIS - ORCHESTRATED RESPONSE
================================================================================

1. EXECUTIVE SUMMARY:
   Over the last 60 minutes, the ResQGraph AI Engine ingested ${activeReports.length} incoming citizen
   distress calls across Kannada, Hindi, and English channels.
   Through spatial HDBSCAN fusion, duplicate calls were consolidated into distinct operational
   crisis clusters with zero duplicate dispatches.

2. KEY TELEMETRY:
   - Total Raw Reports Ingested: ${activeReports.length}
   - Priority 1 (Life-Threatening) Sites: 4 (Ecospace, Yamalur, Rainbow Drive, HSR Sec 5)
   - Field Assets Deployed: 4 SDRF/NDRF Inflatable Boats + 1 ALS Paramedic Ambulance
   - Critical Hazard Coverage: 86.4%
   - Plan Approval Status: ${isApproved ? 'APPROVED BY COMMANDER' : 'PENDING HUMAN APPROVAL'}

3. VALUE-OF-INFORMATION (VOI) TRIAGE:
   - Flagged unverified viral rumor regarding Silk Board bridge structural integrity.
   - Action Taken: Reconnaissance drone route triggered prior to heavy watercraft transit.

4. DIRECTIVES & NEXT STEPS:
   - Maintain continuous water level monitoring along Bellandur-Ecospace sub-basin.
   - Transfer evacuated diabetic and pediatric victims to higher elevation shelter in HSR Sector 2.
   - Conclude secondary sweep before 18:00 hrs.

ISSUED BY:
State Disaster Management Authority (SDMA) Automated SITREP Engine
================================================================================`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitrepContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0E131F] border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setShowSitrep(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FileCheck className="text-emerald-400" size={20} />
          <h2 className="text-lg font-bold text-white">
            Automated Executive Situation Report (SITREP)
          </h2>
        </div>

        {/* Formatted SITREP Text Box */}
        <div className="bg-[#080B11] border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 leading-relaxed overflow-y-auto max-h-[380px] select-all whitespace-pre">
          {sitrepContent}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Export ready for State Disaster Management Authority (SDMA).
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard' : 'Copy SITREP'}
            </button>
            <button
              onClick={() => setShowSitrep(false)}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
