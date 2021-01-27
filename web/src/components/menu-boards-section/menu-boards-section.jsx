import React from 'react';
import BoardCard from '../board-card/board-card';
import SkeletonBoardCards from '../skeleton-board-cards/skeleton-board-cards';
import {
  BoardsContainer,
  SectionHeading,
  MenuBoardsContainer,
} from './menu-boards-section.styles';

const MenuBoardsSection = ({
  children,
  label,
  isLoading,
  boards,
  selectedBoards,
  onBoardCardClick,
}) => {
  const boardCards = isLoading ? (
    <SkeletonBoardCards numberOfCards={3} />
  ) : (
    boards.map(board => (
      <BoardCard
        key={board.id}
        board={board}
        isSelected={selectedBoards[board.id]}
        onClick={onBoardCardClick}
      />
    ))
  );

  return (
    <MenuBoardsContainer>
      <SectionHeading>{label}</SectionHeading>
      <BoardsContainer>
        {boardCards}
        {children}
      </BoardsContainer>
    </MenuBoardsContainer>
  );
};

export default MenuBoardsSection;
