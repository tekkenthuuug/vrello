import { useContext } from 'react';
import { BoardEventsEmitterContext } from '../contexts/boardEventsEmitterContext';

const useBoardEventsEmitter = () => {
  const context = useContext(BoardEventsEmitterContext);
  if (context === undefined) {
    throw new Error(
      'useBoardEventsEmitter must be used within a BoardEventsEmitterProvider'
    );
  }
  return context;
};

export default useBoardEventsEmitter;
