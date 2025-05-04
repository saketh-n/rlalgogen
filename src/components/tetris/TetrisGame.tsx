import { useEffect, useState } from 'react';
import { useTetrisGame } from './useTetrisGame';

interface TetrisGameProps {
  isPlaying: boolean;
  isAI: boolean;
}

const TetrisGame: React.FC<TetrisGameProps> = ({ isPlaying, isAI }) => {
  const { gameState, gameOver } = useTetrisGame(isPlaying, isAI);
  
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      {!isPlaying ? (
        <div className="text-gray-500 text-center">
          <p className="mb-2">Press Play to start</p>
          <div className="grid grid-cols-10 grid-rows-20 gap-px bg-gray-200 opacity-30">
            {Array(200).fill(null).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300"></div>
            ))}
          </div>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <p className="text-lg font-medium text-red-500 mb-2">Game Over</p>
          <p className="text-sm text-gray-600">Score: {gameState.score}</p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <div className="mb-2 text-sm text-gray-700">Score: {gameState.score}</div>
          <div className="grid grid-cols-10 grid-rows-20 gap-px bg-gray-200">
            {gameState.board.map((row, y) => 
              row.map((cell, x) => (
                <div 
                  key={`${y}-${x}`} 
                  className={`w-4 h-4 ${
                    cell ? 
                    'bg-blue-500' : 
                    'bg-gray-100'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TetrisGame;