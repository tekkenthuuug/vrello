import { useEffect, useReducer, useRef, useCallback } from 'react';
import { boardReducer, initialState } from '../utils/boardReducer';
import socketIOClient from 'socket.io-client';

const useLiveBoard = () => {
  const socket = useRef(null);

  const [state, dispatch] = useReducer(boardReducer, initialState);

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000', {
      transports: ['websocket'],
    });

    socket.current.on('connected', boardData => {
      dispatch({ type: 'INIT', payload: boardData });

      socket.current.emit('join', boardData.id);
    });

    socket.current.on('board-change', action => {
      // handle changes received from server
      dispatch(action);
    });
  }, []);

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
