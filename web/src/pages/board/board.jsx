import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BoardControl from '../../components/board-control/board-control';
import BoardHeader from '../../components/board-header/board-header';
import { BoardContainer } from './board.styles';
import BoardEventsEmmiterContext from '../../contexts/boardEventsEmmiterContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBoardBackgroundColor,
  selectBoardIsLoading,
} from '../../redux/board/board.selectors';
import { initializeBoard, reset } from '../../redux/board/board.actions';
import socketIOClient from 'socket.io-client';

const Board = () => {
  const { boardId } = useParams();

  const history = useHistory();

  const backgroundColor = useSelector(selectBoardBackgroundColor);
  const isLoading = useSelector(selectBoardIsLoading);

  const socket = useRef(null);
  const dispatch = useDispatch();

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
      if (action.type === 'DELETE_BOARD') {
        history.push('/app');
        return;
      }

      // handle changes received from server
      dispatch(action);
    });

    return () => {
      dispatch(reset());
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [boardId, dispatch, history]);

  const emitBoardChange = useCallback(
    action => {
      socket.current.emit('board-change', {
        boardId: boardId,
        action,
      });
    },
    [socket, boardId]
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <BoardEventsEmmiterContext.Provider value={emitBoardChange}>
      <BoardContainer backgroundColor={backgroundColor}>
        <BoardHeader />
        <BoardControl />
      </BoardContainer>
    </BoardEventsEmmiterContext.Provider>
  );
};

export default Board;
