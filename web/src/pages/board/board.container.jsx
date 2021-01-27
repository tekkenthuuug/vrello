import React from 'react';
import BoardEventsEmitterProvider from '../../contexts/boardEventsEmitterContext';
import Board from './board';

const BoardContainer = () => {
  return (
    <BoardEventsEmitterProvider>
      <Board />
    </BoardEventsEmitterProvider>
  );
};

export default BoardContainer;
