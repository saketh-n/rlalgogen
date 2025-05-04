import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ProgressCardProps {
  progress: number;
  title: string;
  description: string;
  pseudocode: string;
}

const ProgressCard = ({ progress, title, description, pseudocode }: ProgressCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out w-full relative animate-fadeIn">
      <div className="absolute top-0 left-0 h-1 bg-green-500 transition-all duration-100 ease-linear" 
           style={{ width: `${progress}%` }} />
      <div className="p-6 relative">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-gray-100 mb-2">{title}</h1>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Description</h2>
          <p className="text-gray-400 mb-6">{description}</p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full py-2 px-4 bg-gray-700 text-blue-400 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium">
              {isExpanded ? "Collapse pseudocode" : "Expand to see pseudocode"}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg overflow-auto">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                {pseudocode}
              </pre>
            </div>
          )}
        </div>
        <div 
          className="absolute inset-0 bg-green-900 transition-all duration-300 ease-linear" 
          style={{ 
            width: `${progress}%`,
            opacity: 0.1
          }} 
        />
      </div>
    </div>
  );
};

export default ProgressCard;