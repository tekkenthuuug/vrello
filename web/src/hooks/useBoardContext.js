import { useContext } from 'react';
import { BoardStateContext } from '../contexts/boardStateContext';

const useBoardContext = () => {
  const context = useContext(BoardStateContext);

  return context;
};

export default useBoardContext;
