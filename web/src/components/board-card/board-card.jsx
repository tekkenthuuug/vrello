import React from 'react';
import { Link } from 'react-router-dom';
import {
  BoardCardContainer,
  BoardCardOverlay,
  BoardName,
} from './board-card.styles';

const BoardCard = ({ board }) => {
  return (
    <Link to={`/app/board/${board.id}`} key={board.id}>
      <BoardCardContainer backgroundColor={board.backgroundColor}>
        <BoardCardOverlay />
        <BoardName>{board.name}</BoardName>
      </BoardCardContainer>
    </Link>
  );
};

export default BoardCard;
