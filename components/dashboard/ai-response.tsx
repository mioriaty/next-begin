import { BrainCircuit } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface AIResponseProps {
  children: ReactNode;
}

const AIResponse: FC<AIResponseProps> = ({ children }) => {
  return (
    <div className="p-4 pb-10 ml-20 rounded-xl relative bg-secondary">
      {children}
      <div className="bg-sky-500 w-14 h-14 flex justify-center items-center absolute -bottom-6 right-6">
        <BrainCircuit color="white" size={40} />
      </div>
    </div>
  );
};

export default AIResponse;
