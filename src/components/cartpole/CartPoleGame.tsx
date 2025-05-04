import { useEffect, useRef, useState } from 'react';

interface CartPoleGameProps {
  isPlaying: boolean;
  isAI: boolean;
}

// CartPole physics constants
const GRAVITY = 9.8;
const CART_MASS = 1.0;
const POLE_MASS = 0.1;
const POLE_LENGTH = 1.0;
const FORCE_MAG = 10.0;
const TAU = 0.02; // Time step
const X_THRESHOLD = 2.4;
const THETA_THRESHOLD = 12 * Math.PI / 180;

const CartPoleGame: React.FC<CartPoleGameProps> = ({ isPlaying, isAI }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cartX, setCartX] = useState(0);
  const [cartVel, setCartVel] = useState(0);
  const [poleAngle, setPoleAngle] = useState(0);
  const [poleVel, setPoleVel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Physics simulation step
  const step = (force: number) => {
    const cosTheta = Math.cos(poleAngle);
    const sinTheta = Math.sin(poleAngle);
    
    const temp = (force + POLE_MASS * POLE_LENGTH * poleVel * poleVel * sinTheta) / (CART_MASS + POLE_MASS);
    const poleAcc = (GRAVITY * sinTheta - cosTheta * temp) / 
      (POLE_LENGTH * (4.0/3.0 - POLE_MASS * cosTheta * cosTheta / (CART_MASS + POLE_MASS)));
    const cartAcc = temp - POLE_MASS * POLE_LENGTH * poleAcc * cosTheta / (CART_MASS + POLE_MASS);

    // Update state
    setCartX(x => x + TAU * cartVel);
    setCartVel(v => v + TAU * cartAcc);
    setPoleAngle(theta => theta + TAU * poleVel);
    setPoleVel(omega => omega + TAU * poleAcc);
  };

  // Draw the cart and pole
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert simulation coordinates to canvas coordinates
    const scale = canvas.width / (X_THRESHOLD * 2.2); // Leave some margin
    const cartWidth = 50;
    const cartHeight = 30;
    const poleWidth = 10;
    const poleLength = POLE_LENGTH * scale;

    const cartXPixels = canvas.width/2 + cartX * scale;
    const cartYPixels = canvas.height - cartHeight - 10;

    // Draw cart
    ctx.fillStyle = '#4A5568';
    ctx.fillRect(cartXPixels - cartWidth/2, cartYPixels, cartWidth, cartHeight);

    // Draw pole
    ctx.save();
    ctx.translate(cartXPixels, cartYPixels);
    ctx.rotate(-poleAngle); // Negative because canvas Y is down
    ctx.fillStyle = '#2B6CB0';
    ctx.fillRect(-poleWidth/2, -poleLength, poleWidth, poleLength);
    ctx.restore();

    // Draw ground
    ctx.strokeStyle = '#A0AEC0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 5);
    ctx.lineTo(canvas.width, canvas.height - 5);
    ctx.stroke();
  };

  // Game loop
  const animate = (time: number) => {
    if (!isPlaying || gameOver) return;

    if (lastTimeRef.current != undefined) {
      if (isAI) {
        // Simple AI: apply force in direction of pole fall
        const force = poleAngle > 0 ? -FORCE_MAG : FORCE_MAG;
        step(force);
      }
      
      // Check for game over
      if (Math.abs(cartX) > X_THRESHOLD || Math.abs(poleAngle) > THETA_THRESHOLD) {
        setGameOver(true);
        return;
      }

      setScore(s => s + 1);
    }

    lastTimeRef.current = time;
    draw();
    requestRef.current = requestAnimationFrame(animate);
  };

  // Handle user input
  useEffect(() => {
    if (isAI || !isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      if (e.key === 'ArrowLeft') {
        step(-FORCE_MAG);
      } else if (e.key === 'ArrowRight') {
        step(FORCE_MAG);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAI, isPlaying, gameOver]);

  // Start/stop game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, gameOver]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="bg-gray-100 rounded-lg"
      />
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <p className="text-white text-lg">Press Play to start</p>
        </div>
      ) : gameOver ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-center">
            <p className="text-white text-lg mb-2">Game Over!</p>
            <p className="text-white">Score: {score}</p>
          </div>
        </div>
      ) : !isAI && (
        <div className="mt-4 text-sm text-gray-600">
          Use ← → arrow keys to balance the pole
        </div>
      )}
    </div>
  );
};

export default CartPoleGame; 