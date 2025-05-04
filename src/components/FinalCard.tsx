import ProgressCard from './ProgressCard';

interface FinalCardProps {
  title: string;
  description: string;
  pseudocode: string;
}

const FinalCard = ({ title, description, pseudocode }: FinalCardProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-xl w-full">
        <ProgressCard 
          progress={100} 
          title={title}
          description={description}
          pseudocode={pseudocode}
        />
      </div>
    </div>
  );
};

export default FinalCard;