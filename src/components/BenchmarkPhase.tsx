import { useState, useEffect } from 'react';
import ProgressCard from './ProgressCard';
import { getRandomCardContent } from '../utils/cardUtils';

const TOTAL_CARDS = 3;
const CARD_DURATION = 3000;
const PROGRESS_DURATION = 2700; // Slightly faster than card duration

const BenchmarkPhase = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState(getRandomCardContent());

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, PROGRESS_DURATION / 100);

    const cardInterval = setInterval(() => {
      setCurrentCard(prev => (prev + 1) % TOTAL_CARDS);
      setProgress(0);
      setContent(getRandomCardContent());
    }, CARD_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(cardInterval);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-100 mb-2">Benchmark: CartPole</h1>
      <div className="w-full max-w-xl">
        <ProgressCard 
          progress={progress} 
          title={content.title}
          description={content.description}
          pseudocode={content.pseudocode}
        />
      </div>
    </div>
  );
};

export default BenchmarkPhase;