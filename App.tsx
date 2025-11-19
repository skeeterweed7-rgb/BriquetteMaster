import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import AiAdvisor from './components/AiAdvisor';
import { SQ_FT_PER_ACRE, SQ_FT_PER_BRIQUETTE, DEFAULT_ACRES } from './constants';
import { Ruler, Grid3X3, LayoutDashboard, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [acres, setAcres] = useState<number | string>(DEFAULT_ACRES);
  const [sqFt, setSqFt] = useState<number>(0);
  const [briquettes, setBriquettes] = useState<number>(0);

  // Calculation Logic
  useEffect(() => {
    const acreValue = typeof acres === 'string' ? parseFloat(acres) : acres;
    
    if (isNaN(acreValue) || acreValue < 0) {
      setSqFt(0);
      setBriquettes(0);
      return;
    }

    const calculatedSqFt = acreValue * SQ_FT_PER_ACRE;
    const calculatedBriquettes = Math.ceil(calculatedSqFt / SQ_FT_PER_BRIQUETTE);

    setSqFt(calculatedSqFt);
    setBriquettes(calculatedBriquettes);
  }, [acres]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAcres('');
    } else {
      setAcres(value);
    }
  };

  const handleIncrement = (amount: number) => {
    const current = typeof acres === 'string' ? parseFloat(acres) || 0 : acres;
    setAcres(Math.max(0, parseFloat((current + amount).toFixed(2))));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Estimator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter the acreage of your land to instantly calculate the required number of briquettes for full coverage.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <label htmlFor="acres" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Total Acreage
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="acres"
                  name="acres"
                  min="0"
                  step="0.01"
                  value={acres}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-4 text-lg border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 shadow-sm bg-gray-50 border"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">acres</span>
                </div>
              </div>

              {/* Quick Adjust Buttons */}
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => handleIncrement(-0.1)}
                  className="flex-1 sm:flex-none px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  -0.1
                </button>
                <button 
                  onClick={() => handleIncrement(0.1)}
                  className="flex-1 sm:flex-none px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                >
                  +0.1
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ResultCard
              label="Total Area"
              value={sqFt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="Square Feet"
              icon={<Grid3X3 className="h-6 w-6" />}
            />
            <ResultCard
              label="Briquettes Needed"
              value={briquettes.toLocaleString()}
              unit="Units (100 sq ft coverage each)"
              icon={<LayoutDashboard className="h-6 w-6" />}
              highlight={true}
            />
          </div>

          {/* Visualization / Divider */}
          <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm mb-8">
             <div className="h-px bg-gray-200 flex-grow"></div>
             <span className="flex items-center space-x-2">
               <span>1 Acre</span>
               <ArrowRight className="h-4 w-4" />
               <span>43,560 Sq Ft</span>
             </span>
             <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          {/* AI Advisor */}
          <AiAdvisor acres={typeof acres === 'number' ? acres : parseFloat(acres || '0')} />

        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BriquetteMaster. All rights reserved.</p>
          <p className="mt-1">Calculations are estimates. Always buy 5-10% extra for cuts and waste.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;