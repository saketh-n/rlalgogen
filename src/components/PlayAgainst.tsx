import { useState } from 'react';
import TetrisGame from './tetris/TetrisGame';

const PlayAgainst = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">RL Plays</h2>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-md aspect-[3/4] max-w-xs">
            <TetrisGame isPlaying={isPlaying} isAI={true} />
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">You</h2>
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-md aspect-[3/4] max-w-xs">
            <TetrisGame isPlaying={isPlaying} isAI={false} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all ${
            isPlaying 
              ? 'bg-gray-400 cursor-not-allowed' 
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