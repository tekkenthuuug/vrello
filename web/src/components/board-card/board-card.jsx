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
    <div onClick={() => onClick(board)}>
      <BoardCardContainer
        grayscale={grayscale}
        isSelected={isSelected}
        backgroundColor={board.backgroundColor}
      >
        <BoardCardOverlay isSelected={isSelected} />

        <BoardName>{board.name}</BoardName>
        <CreatedAt>
          Updated{' '}
          <DateUpdater
            value={board.updatedAt}
            interval={10000}
            formatFn={humanReadableTime}
          />
        </CreatedAt>
        {isSelected && <DoneIcon />}
      </BoardCardContainer>
    </div>
  );
};

export default BoardCard;
