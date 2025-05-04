import { RefreshCw } from 'lucide-react';

interface ThinkingAnimationProps {
  status: 'generating' | 'analyzing' | 'evaluating' | 'final';
}

const ThinkingAnimation = ({ status }: ThinkingAnimationProps) => {
  const getStatusText = () => {
    switch (status) {
      case 'generating':
        return 'Generating';
      case 'analyzing':
        return 'Analyzing';
      case 'evaluating':
        return 'Evaluating';
      default:
        return '';
    }
  };

  if (status === 'final') return null;

  return (
    <div className="flex items-center space-x-3">
      <span className="text-xl font-medium text-gray-100">{getStatusText()}...</span>
      <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
    </div>
  );
};

export default ThinkingAnimation;