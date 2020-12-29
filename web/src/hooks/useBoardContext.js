import { useContext } from 'react';
import { BoardContext } from '../contexts/boardContext';

const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};

export default useBoardContext;
