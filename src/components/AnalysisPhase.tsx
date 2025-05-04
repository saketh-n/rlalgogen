import { useState, useEffect } from 'react';
import ProgressCard from './ProgressCard';
import { models, defaultContent } from '../constants/content';

const TOTAL_CARDS = 12;
const CARD_DURATION = 3000;
const PROGRESS_DURATION = 2700; // Slightly faster than card duration

const AnalysisPhase = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100);
    }, PROGRESS_DURATION / 100);

    const cardInterval = setInterval(() => {
      setCurrentCard(prev => (prev + 1) % TOTAL_CARDS);
      setProgress(0);
    }, CARD_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(cardInterval);
    };
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Models</h1>
      <div className="grid grid-cols-3 gap-8">
        {models.map(model => (
          <div key={model} className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">{model}</h2>
            <ProgressCard 
              progress={progress} 
              title={defaultContent.title}
              description={defaultContent.description}
              pseudocode={defaultContent.pseudocode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPhase;