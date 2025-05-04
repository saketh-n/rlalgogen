import { useState, useEffect } from 'react';
import ThinkingAnimation from './ThinkingAnimation';
import ModelComparison from './ModelComparison';
import AnalysisPhase from './AnalysisPhase';
import BenchmarkPhase from './BenchmarkPhase';
import FinalCard from './FinalCard';
import { models, defaultContent } from '../constants/content';

type Phase = 'generating' | 'analyzing' | 'evaluating' | 'final';

const VisualizeThoughts = () => {
  const [phase, setPhase] = useState<Phase>('generating');
  
  useEffect(() => {
    // Transition through phases
    const generatingTimeout = setTimeout(() => {
      setPhase('analyzing');
    }, 18000); // 3 models × 6 seconds

    const analyzingTimeout = setTimeout(() => {
      setPhase('evaluating');
    }, 54000); // 18000 + (12 cards × 3 seconds)

    const evaluatingTimeout = setTimeout(() => {
      setPhase('final');
    }, 63000); // 54000 + (3 cards × 3 seconds)

    return () => {
      clearTimeout(generatingTimeout);
      clearTimeout(analyzingTimeout);
      clearTimeout(evaluatingTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[60vh] py-8">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-center mb-8">
          <ThinkingAnimation status={phase} />
        </div>
        
        {phase === 'generating' && <ModelComparison models={models} />}
        {phase === 'analyzing' && <AnalysisPhase />}
        {phase === 'evaluating' && <BenchmarkPhase />}
        {phase === 'final' && (
          <FinalCard 
            title={defaultContent.title}
            description={defaultContent.description}
            pseudocode={defaultContent.pseudocode}
          />
        )}
      </div>
    </div>
  );
};

export default VisualizeThoughts;