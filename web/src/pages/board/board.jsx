import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import BoardControl from '../../components/board-control/board-control';
import BoardHeader from '../../components/board-header/board-header';
import { BoardContainer } from './board.styles';
import BoardEventsEmmiterContext from '../../contexts/boardEventsEmmiterContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBoardBackgroundColor,
  selectBoardIsLoading,
  selectBoardIsDeleted,
} from '../../redux/board/board.selectors';
import { initializeBoard, reset } from '../../redux/board/board.actions';
import socketIOClient from 'socket.io-client';
import LoadingScreen from '../../components/loading-screen/loading-screen';

const Board = () => {
  const { boardId } = useParams();

  const history = useHistory();

  const backgroundColor = useSelector(selectBoardBackgroundColor);
  const isLoading = useSelector(selectBoardIsLoading);
  const isDeleted = useSelector(selectBoardIsDeleted);

  const [hasAccess, setHasAccess] = useState(false);
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
      setHasAccess(true);
      dispatch(initializeBoard(boardData));
    });

    socket.current.on('no-access', () => {
      setHasAccess(false);
      dispatch(initializeBoard());
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
      if (socket.current) {
        socket.current.disconnect();
      }
      dispatch(reset());
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

  if (isDeleted) {
    return <Redirect to='/app' />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!hasAccess) {
    return <h1>You don't have access to this board</h1>;
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
