import { useCallback, useEffect, useReducer, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { boardReducer, initialState } from '../utils/board/board.reducer';
import { initializeBoard } from '../utils/board/board.actions';

const useLiveBoard = boardId => {
  const socket = useRef(null);

  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.current.on('connected', () => {
      socket.current.emit('join', boardId);
    });

    socket.current.on('joined', boardData => {
      dispatch(initializeBoard(boardData));
    });

    socket.current.on('board-change', action => {
      // handle changes received from server
      dispatch(action);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [boardId]);

  const emitBoardChange = useCallback(
    action => {
      socket.current.emit('board-change', {
        boardId: state.id,
        action,
      });
    },
    [socket, state]
  );

  return {
    state,
    dispatch,
    emitBoardChange,
  };
};

export default useLiveBoard;
