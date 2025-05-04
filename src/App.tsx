import { useState } from 'react';
import TabsNavigation from './components/TabsNavigation';
import VisualizeThoughts from './components/VisualizeThoughts';
import PlayAgainst from './components/PlayAgainst';

function App() {
  const [activeTab, setActiveTab] = useState<'visualize' | 'play'>('visualize');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-100 text-center">RL Interactive</h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-4">
            {activeTab === 'visualize' ? (
              <VisualizeThoughts />
            ) : (
              <PlayAgainst />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;