import React from 'react';
import { Link } from 'react-router-dom';
import humanReadableTime from '../../utils/humanReadableTime';
import TimeUpdater from '../time-updater/time-updater';
import {
  BoardCardContainer,
  BoardCardOverlay,
  BoardName,
  CreatedAt,
} from './board-card.styles';

const BoardCard = ({ board, userSlug }) => {
  return (
    <Link
      to={`/app/${board.creator?.slug || userSlug}/${board.slug}`}
      key={board.id}
    >
      <BoardCardContainer backgroundColor={board.backgroundColor}>
        <BoardCardOverlay />
        <BoardName>{board.name}</BoardName>
        <CreatedAt>
          Updated{' '}
          <TimeUpdater
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
