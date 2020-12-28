import { useCallback, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { initializeBoard } from '../utils/board/board.actions';

const useLiveBoard = (boardId, localDispatch) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.current.on('connected', () => {
      socket.current.emit('join', boardId);
    });

    socket.current.on('joined', boardData => {
      localDispatch(initializeBoard(boardData));
    });

    socket.current.on('board-change', action => {
      // handle changes received from server
      localDispatch(action);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [boardId, localDispatch]);

  const emitBoardChange = useCallback(
    action => {
      socket.current.emit('board-change', {
        boardId: boardId,
        action,
      });
    },
    [socket, boardId]
  );

  return {
    emitBoardChange,
  };
};

export default useLiveBoard;
