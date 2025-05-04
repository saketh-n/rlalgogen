import { useState, useEffect } from 'react';
import AlgorithmCard from './AlgorithmCard';
import { getRandomCardContent } from '../utils/cardUtils';

interface ModelComparisonProps {
  models: string[];
}

const ModelComparison = ({ models }: ModelComparisonProps) => {
  const [visibleCards, setVisibleCards] = useState<Record<string, number[]>>(() => {
    const initial: Record<string, number[]> = {};
    models.forEach(model => {
      initial[model] = [];
    });
    return initial;
  });

  useEffect(() => {
    models.forEach(model => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setVisibleCards(prev => ({
            ...prev,
            [model]: [...prev[model], i]
          }));
        }, i * 2000 + models.indexOf(model) * 6000);
      }
    });
  }, [models]);

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-16 mb-8">
        {models.map(model => (
          <h2 key={model} className="text-xl font-semibold text-gray-100">{model}</h2>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        {models.map(model => (
          <div key={model} className="flex flex-col items-center space-y-4">
            {visibleCards[model].map(index => {
              const content = getRandomCardContent();
              return (
                <AlgorithmCard 
                  key={`${model}-${index}`} 
                  compact={true}
                  title={content.title}
                  description={content.description}
                  pseudocode={content.pseudocode}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelComparison;