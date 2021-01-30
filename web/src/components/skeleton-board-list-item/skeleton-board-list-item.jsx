import React from 'react';
import { ColorBox } from '../../shared-styles/board-list-item.styles';
import {
  BoardName,
  CreatedAt,
} from '../../shared-styles/board-list-item.styles';
import { BoardListItemContainer } from './skeleton-board-list-item.styles';

const SkeletonBoardListItem = () => {
  return (
    <BoardListItemContainer>
      <ColorBox />
      <BoardName />
      <CreatedAt />
    </BoardListItemContainer>
  );
};

export default SkeletonBoardListItem;
