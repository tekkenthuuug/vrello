import { useCallback, useEffect, useReducer, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import { boardReducer, initialState } from '../utils/boardReducer';

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

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
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
