import React from 'react';
import humanReadableTime from '../../utils/humanReadableTime';
import DateUpdater from '../date-updater/date-updater';
import {
  BoardCardContainer,
  BoardCardOverlay,
  BoardName,
  CreatedAt,
  DoneIcon,
} from './board-card.styles';

const BoardCard = ({ board, isSelected, onClick, grayscale }) => {
  return (
    <BoardCardContainer
      grayscale={grayscale}
      isSelected={isSelected}
      backgroundColor={board.backgroundColor}
      onClick={() => onClick(board)}
    >
      <BoardCardOverlay isSelected={isSelected} />

      <BoardName>{board.name}</BoardName>
      <CreatedAt>
        Updated{' '}
        <DateUpdater value={board.updatedAt} formatFn={humanReadableTime} />
      </CreatedAt>
      {isSelected && <DoneIcon />}
    </BoardCardContainer>
  );
};

export default BoardCard;
