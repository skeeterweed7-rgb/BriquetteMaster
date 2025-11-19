import React from 'react';
import { Calculator, Trees } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Trees className="h-8 w-8 text-emerald-300" />
          <div>
            <h1 className="text-xl font-bold leading-tight">BriquetteMaster</h1>
            <p className="text-emerald-200 text-xs">Coverage Calculator & Advisor</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-emerald-100">
          <Calculator className="h-4 w-4" />
          <span>1 Briquette = 100 Sq. Ft.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;