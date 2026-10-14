import React from 'react';
import { AlertTriangle, Users, MapPin, CheckCircle, XCircle } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';

const IncidentPanel = ({ incidents = [] }) => {
  return (
    <div className="bg-brand-dark rounded-xl border border-brand-accent flex flex-col max-h-80">
      <div className="p-3 border-b border-brand-accent bg-[#111836] rounded-t-xl">
        <h2 className="text-sm font-bold text-blue-200">Verified Incidents (Clustered)</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {incidents.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No verified incidents yet. Processing reports...
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="bg-[#151e3f] border border-brand-accent rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-sm text-white">Incident #{incident.id}</span>
                </div>
                <ConfidenceBadge score={incident.confidence} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center text-xs text-gray-300">
                  <Users className="w-3 h-3 mr-1 text-blue-400" />
                  <span>{incident.victims} Victims</span>
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <MapPin className="w-3 h-3 mr-1 text-blue-400" />
                  <span>Loc: {incident.location[0].toFixed(3)}, {incident.location[1].toFixed(3)}</span>
                </div>
                <div className="col-span-2 text-xs text-gray-400 mt-1">
                  Merged from {incident.sources} separate reports
                </div>
              </div>
              
              <div className="flex space-x-2 mt-2">
                <button className="flex-1 bg-green-900/30 hover:bg-green-800/50 border border-green-800 text-green-400 py-1.5 rounded text-xs font-medium flex items-center justify-center transition-colors">
                  <CheckCircle className="w-3 h-3 mr-1" /> Approve
                </button>
                <button className="flex-1 bg-red-900/30 hover:bg-red-800/50 border border-red-800 text-red-400 py-1.5 rounded text-xs font-medium flex items-center justify-center transition-colors">
                  <XCircle className="w-3 h-3 mr-1" /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentPanel;
