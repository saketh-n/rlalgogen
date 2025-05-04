import { useState, useEffect } from 'react';

// Simplified Tetris game state
interface GameState {
  board: number[][];
  score: number;
  level: number;
  currentPiece: {
    shape: number[][];
    position: { x: number; y: number };
  } | null;
}

// Initial game state
const createInitialState = (): GameState => ({
  board: Array(20).fill(null).map(() => Array(10).fill(0)),
  score: 0,
  level: 1,
  currentPiece: null
});

// AI move generation (simplified)
const generateAIMove = (gameState: GameState) => {
  // In a real implementation, this would use reinforcement learning
  // to determine the best move. For this demo, we'll just make random moves.
  const moves = ['left', 'right', 'rotate', 'down'];
  return moves[Math.floor(Math.random() * moves.length)];
};

// Game logic (simplified for demonstration)
export const useTetrisGame = (isPlaying: boolean, isAI: boolean) => {
  const [gameState, setGameState] = useState<GameState>(createInitialState());
  const [gameOver, setGameOver] = useState(false);
  const [tickSpeed, setTickSpeed] = useState(1000);
  
  // Reset game when play status changes
  useEffect(() => {
    if (isPlaying) {
      setGameState(createInitialState());
      setGameOver(false);
    }
  }, [isPlaying]);
  
  // Game tick effect
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const interval = setInterval(() => {
      // Update game state based on gravity
      setGameState(prevState => {
        // Simplified game update logic
        const newBoard = [...prevState.board];
        
        // Randomly fill some cells for visual effect
        if (Math.random() > 0.7) {
          const row = Math.floor(Math.random() * 20);
          const col = Math.floor(Math.random() * 10);
          
          if (newBoard[row]) {
            newBoard[row][col] = newBoard[row][col] ? 0 : 1;
          }
        }
        
        // For AI, generate and apply moves
        if (isAI && Math.random() > 0.5) {
          const aiMove = generateAIMove(prevState);
          console.log(`AI chose: ${aiMove}`);
        }
        
        return {
          ...prevState,
          board: newBoard,
          score: prevState.score + (isAI ? Math.floor(Math.random() * 2) : 0)
        };
      });
      
      // Random game over after some time (for demo)
      if (Math.random() > 0.995) {
        setGameOver(true);
      }
    }, tickSpeed);
    
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, tickSpeed, isAI]);
  
  // Keyboard controls for human player
  useEffect(() => {
    if (!isPlaying || gameOver || isAI) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      // In a real implementation, this would move the tetris pieces
      // For this demo, we'll just increment the score
      if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1
        }));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, isAI]);
  
  return { gameState, gameOver };
};