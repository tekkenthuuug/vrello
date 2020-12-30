import { useContext } from 'react';
import BoardEventsEmmiterContext from '../contexts/boardEventsEmmiterContext';

const useBoardEventsEmmiter = () => {
  const context = useContext(BoardEventsEmmiterContext);
  if (context === undefined) {
    throw new Error(
      'useBoardEventsEmmiter must be used within a BoardEventsEmmiterProvider'
    );
  }
  return context;
};

export default useBoardEventsEmmiter;
