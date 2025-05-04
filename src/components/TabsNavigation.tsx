import React from 'react';
import { Brain, Swords } from 'lucide-react';

interface TabsNavigationProps {
  activeTab: 'visualize' | 'play';
  setActiveTab: (tab: 'visualize' | 'play') => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveTab('visualize')}
          className={`${
            activeTab === 'visualize'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base flex-1 flex items-center justify-center transition-colors duration-200 ease-in-out`}
        >
          <Brain className="w-5 h-5 mr-2" />
          <span>Visualize Thoughts 💭</span>
        </button>
        <button
          onClick={() => setActiveTab('play')}
          className={`${
            activeTab === 'play'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base flex-1 flex items-center justify-center transition-colors duration-200 ease-in-out`}
        >
          <Swords className="w-5 h-5 mr-2" />
          <span>Play Against ⚔️</span>
        </button>
      </nav>
    </div>
  );
};

export default TabsNavigation;