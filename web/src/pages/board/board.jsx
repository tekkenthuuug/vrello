import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import BoardControl from '../../components/board-control/board-control';
import BoardHeader from '../../components/board-header/board-header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import NoBoardAccess from '../../components/no-board-access/no-board-access';
import BoardEventsEmitterContext from '../../contexts/boardEventsEmitterContext';
import {
  initializeBoard,
  noAccess,
  reset,
} from '../../redux/board/board.actions';
import {
  selectBoardBackgroundColor,
  selectBoardId,
  selectBoardIsDeleted,
  selectBoardIsLoading,
  selectHasAccess,
} from '../../redux/board/board.selectors';
import { BoardContainer } from './board.styles';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import useUserContext from '../../hooks/useUserContext';

const Board = () => {
  const { boardSlug, creatorSlug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const backgroundColor = useSelector(selectBoardBackgroundColor);
  const isLoading = useSelector(selectBoardIsLoading);
  const isDeleted = useSelector(selectBoardIsDeleted);
  const boardId = useSelector(selectBoardId);
  const hasAccess = useSelector(selectHasAccess);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000/boards', {
      transports: ['websocket'],
    });

    socket.current.on('connected', () => {
      socket.current.emit('join', { boardSlug, creatorSlug });
    });

    socket.current.on('joined', boardData => {
      dispatch(initializeBoard(boardData));
    });

    socket.current.on('noAccess', boardId => {
      dispatch(noAccess(boardId));

      queryClient.setQueryData(['boards', user.id], old => {
        if (!old) return old;

        old.data.memberBoards = old.data.memberBoards.filter(
          board => board.id !== boardId
        );

        return old;
      });
    });

    socket.current.on('boardChange', action => {
      // handle changes received from server
      dispatch(action);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      dispatch(reset());
    };
  }, [boardSlug, creatorSlug, dispatch, history, queryClient, user.id]);

  const emitBoardChange = useCallback(
    action => {
      socket.current.emit('boardChange', {
        boardId: boardId,
        action,
      });
    },
    [socket, boardId]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!hasAccess) {
    return <NoBoardAccess />;
  }

  if (isDeleted) {
    toast.warning('Board you was currently in was deleted');
    return <Redirect to='/app' />;
  }

  return (
    <BoardEventsEmitterContext.Provider value={emitBoardChange}>
      <BoardContainer backgroundColor={backgroundColor}>
        <BoardHeader />
        <BoardControl />
      </BoardContainer>
    </BoardEventsEmitterContext.Provider>
  );
};

export default Board;
