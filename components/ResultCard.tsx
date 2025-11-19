import React from 'react';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, unit, icon, highlight = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-md transition-all duration-300 ${
      highlight 
        ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-200/50 ring-4 ring-emerald-100' 
        : 'bg-white text-gray-800 border border-gray-100'
    }`}>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-semibold uppercase tracking-wider ${highlight ? 'text-emerald-100' : 'text-gray-500'}`}>
            {label}
          </span>
          {icon && <div className={`${highlight ? 'text-emerald-200' : 'text-emerald-600'}`}>{icon}</div>}
        </div>
        <div>
          <div className="text-4xl font-bold tracking-tight">
            {value}
          </div>
          <div className={`mt-1 text-sm font-medium ${highlight ? 'text-emerald-100' : 'text-gray-400'}`}>
            {unit}
          </div>
        </div>
      </div>
      {/* Decorative circles */}
      <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-10 ${highlight ? 'bg-white' : 'bg-emerald-500'}`} />
    </div>
  );
};

export default ResultCard;