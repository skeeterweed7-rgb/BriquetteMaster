import React, { useState } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { getLandscapingAdvice } from '../services/geminiService';
import { ProjectType } from '../types';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorProps {
  acres: number;
}

const AiAdvisor: React.FC<AiAdvisorProps> = ({ acres }) => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<ProjectType>(ProjectType.PATIO);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLandscapingAdvice(acres, projectType);
      setAdvice(result);
    } catch (err) {
      setError("Failed to retrieve advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-indigo-100">
        <div className="flex items-start space-x-4">
          <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">AI Landscape Architect</h3>
            <p className="text-gray-600 text-sm mt-1">
              Get personalized expert advice on ground prep and installation for your {acres} acre project.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!advice ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are you building?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {Object.values(ProjectType).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      projectType === type
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGetAdvice}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing Project...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Expert Advice</span>
                </>
              )}
            </button>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                 <Info className="h-4 w-4" />
                 <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="prose prose-indigo max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
               <ReactMarkdown>{advice}</ReactMarkdown>
            </div>
            <button
              onClick={() => setAdvice(null)}
              className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium underline-offset-2 hover:underline"
            >
              Ask about a different project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAdvisor;