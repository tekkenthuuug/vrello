import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BoardControl from '../../components/board-control/board-control';
import BoardHeader from '../../components/board-header/board-header';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import NoBoardAccess from '../../components/no-board-access/no-board-access';

import {
  selectBoardBackgroundColor,
  selectBoardIsDeleted,
  selectBoardIsLoading,
  selectHasAccess,
} from '../../redux/board/board.selectors';
import { BoardContainer } from './board.styles';
import { toast } from 'react-toastify';

const Board = () => {
  const backgroundColor = useSelector(selectBoardBackgroundColor);
  const isLoading = useSelector(selectBoardIsLoading);
  const isDeleted = useSelector(selectBoardIsDeleted);
  const hasAccess = useSelector(selectHasAccess);

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
    <BoardContainer backgroundColor={backgroundColor}>
      <BoardHeader />
      <BoardControl />
    </BoardContainer>
  );
};

export default Board;
