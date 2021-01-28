import React, { createContext, useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';
import removeBoardFromMemberBoardsCache from '../react-query/updaters/removeBoardFromMemberBoardsCache';
import { initializeBoard, noAccess, reset } from '../redux/board/board.actions';
import { selectBoardId } from '../redux/board/board.selectors';
import socketIOClient from 'socket.io-client';

export const BoardEventsEmitterContext = createContext();

const BoardEventsEmitterProvider = ({ children }) => {
  const { boardSlug, creatorSlug } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const boardId = useSelector(selectBoardId);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketIOClient('http://localhost:5000/boards', {
      transports: ['websocket'],
    });

    socket.current.on('connected', () => {
      socket.current.emit('join', { boardSlug, creatorSlug });
    });

    socket.current.on('joined', boardData => {
      dispatch(initializeBoard(boardData, user));
    });

    socket.current.on('noAccess', boardId => {
      dispatch(noAccess(boardId));

      const queryKey = ['boards', user.id];

      const queryData = queryClient.getQueryData(queryKey);

      if (queryData) {
        queryClient.setQueryData(
          queryKey,
          removeBoardFromMemberBoardsCache(boardId)
        );
      }
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
  }, [boardSlug, creatorSlug, dispatch, history, queryClient, user]);

  const emitBoardChange = useCallback(
    role => action =>
      socket.current.emit(`${role}BoardChange`, {
        boardId: boardId,
        action,
      }),
    [socket, boardId]
  );

  const emitMemberBoardChange = emitBoardChange('member');
  const emitAdminBoardChange = emitBoardChange('admin');

  return (
    <BoardEventsEmitterContext.Provider
      value={{
        emitMemberBoardChange,
        emitAdminBoardChange,
      }}
    >
      {children}
    </BoardEventsEmitterContext.Provider>
  );
};

export default BoardEventsEmitterProvider;
