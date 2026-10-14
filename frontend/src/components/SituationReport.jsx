import React from 'react';
import { X, FileText, Download } from 'lucide-react';

const SituationReport = ({ onClose }) => {
  const timestamp = new Date().toLocaleString();
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
      <div className="bg-brand-dark border border-brand-accent rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="px-6 py-4 border-b border-brand-accent flex justify-between items-center bg-[#111836] rounded-t-xl">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">AI Situation Report (SitRep)</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 text-gray-300 text-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Generated</p>
              <p className="font-mono">{timestamp}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Status</p>
              <p className="text-red-400 font-bold">CRITICAL</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Region</p>
              <p className="font-bold">Bengaluru South</p>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Executive Summary</h3>
            <p className="leading-relaxed bg-blue-900/10 p-3 rounded border border-blue-900/30">
              Severe flooding reported across Koramangala and BTM Layout following intense rainfall. 
              Multiple citizen reports merged into 2 verified high-priority incidents. 
              Approximately 15 victims identified. Dispatch routes established, bypassing suspected flooded bridge at Silk Board.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Operational Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-3 rounded">
                <span className="text-gray-500 block mb-1">Reports Processed</span>
                <span className="text-xl font-bold text-white">50</span>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <span className="text-gray-500 block mb-1">Verified Incidents</span>
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <span className="text-gray-500 block mb-1">Assets Deployed</span>
                <span className="text-xl font-bold text-white">2 (1 Boat, 1 Truck)</span>
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <span className="text-gray-500 block mb-1">Est. Rescue Time</span>
                <span className="text-xl font-bold text-green-400">22 mins</span>
              </div>
            </div>
          </div>

        </div>

        <div className="px-6 py-4 border-t border-brand-accent bg-[#0d1533] rounded-b-xl flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white font-medium text-sm transition-colors">
            Close
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-medium text-sm flex items-center transition-colors">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </button>
        </div>

      </div>
    </div>
  );
};

export default SituationReport;
