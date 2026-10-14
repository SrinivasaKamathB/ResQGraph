import React from 'react';

const ConfidenceBadge = ({ level, score }) => {
  let colorClass = '';
  let dotColor = '';
  
  if (score < 0.3 || level === 'low') {
    colorClass = 'text-red-400 border-red-800 bg-red-900/30';
    dotColor = 'bg-red-500';
  } else if (score < 0.7 || level === 'medium') {
    colorClass = 'text-yellow-400 border-yellow-800 bg-yellow-900/30';
    dotColor = 'bg-yellow-500';
  } else {
    colorClass = 'text-green-400 border-green-800 bg-green-900/30';
    dotColor = 'bg-green-500';
  }

  const displayLevel = level || (score < 0.3 ? 'Low' : score < 0.7 ? 'Medium' : 'High');

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${dotColor}`}></span>
      {displayLevel} Conf.
    </div>
  );
};

export default ConfidenceBadge;
