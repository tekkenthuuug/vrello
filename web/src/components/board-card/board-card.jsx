import React from 'react';
import { Link } from 'react-router-dom';
import humanReadableTime from '../../utils/humanReadableTime';
import DateUpdater from '../date-updater/date-updater';
import {
  BoardCardContainer,
  BoardCardOverlay,
  BoardName,
  CreatedAt,
} from './board-card.styles';

const BoardCard = ({ board, fallbackSlug }) => {
  return (
    <Link
      to={`/app/${board.creator?.slug || fallbackSlug}/${board.slug}`}
      key={board.id}
    >
      <BoardCardContainer backgroundColor={board.backgroundColor}>
        <BoardCardOverlay />
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
    </Link>
  );
};

export default BoardCard;
