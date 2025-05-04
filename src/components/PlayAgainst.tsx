import { useState } from 'react';
import CartPoleGame from './cartpole/CartPoleGame';

const PlayAgainst = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">RL Agent</h2>
          <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-square max-w-md">
            <CartPoleGame isPlaying={isPlaying} isAI={true} />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">You</h2>
          <div className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-square max-w-md">
            <CartPoleGame isPlaying={isPlaying} isAI={false} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${
            isPlaying 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
          }`}
        >
          {isPlaying ? 'Playing...' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default PlayAgainst;