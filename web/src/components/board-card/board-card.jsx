import React from 'react';
import humanReadableTime from '../../utils/humanReadableTime';
import DateUpdater from '../date-updater/date-updater';
import {
  BoardCardContainer,
  BoardCardOverlay,
  BoardName,
  CreatedAt,
} from './board-card.styles';

const BoardCard = ({ board, isSelected, onClick }) => {
  return (
    <div onClick={() => onClick(board)}>
      <BoardCardContainer backgroundColor={board.backgroundColor}>
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
      </BoardCardContainer>
    </div>
  );
};

export default BoardCard;
