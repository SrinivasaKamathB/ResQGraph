import React, { useRef, useEffect } from 'react';
import { MessageSquare, Mic, Twitter, MessageCircle } from 'lucide-react';

const ReportFeed = ({ reports = [] }) => {
  const feedRef = useRef(null);

  // Auto-scroll to top when new report arrives (since they are unshifted)
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [reports]);

  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'whatsapp': return <MessageCircle className="w-4 h-4 text-green-400" />;
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-400" />;
      case 'voice': return <Mic className="w-4 h-4 text-purple-400" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-brand-dark rounded-xl border border-brand-accent flex flex-col h-64">
      <div className="p-3 border-b border-brand-accent bg-[#111836] rounded-t-xl flex justify-between items-center">
        <h2 className="text-sm font-bold text-blue-200">Incoming Citizen Reports</h2>
        <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded-full">{reports.length} pending</span>
      </div>
      
      <div 
        ref={feedRef}
        className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar"
      >
        {reports.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
            Waiting for simulation to start...
          </div>
        ) : (
          reports.map((report, idx) => (
            <div key={idx} className="bg-[#151e3f] p-3 rounded-lg border border-blue-900/50 hover:border-blue-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  {getSourceIcon(report.source)}
                  <span className="text-xs font-semibold text-gray-300">{report.source}</span>
                  <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{report.lang}</span>
                </div>
                <span className="text-xs text-gray-500">{report.time}</span>
              </div>
              <p className="text-sm text-gray-200">{report.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportFeed;
