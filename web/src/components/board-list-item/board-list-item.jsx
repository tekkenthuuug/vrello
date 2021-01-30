import React from 'react';
import {
  BoardName,
  ColorBox,
  CreatedAt,
} from '../../shared-styles/board-list-item.styles';
import humanReadableTime from '../../utils/humanReadableTime';
import DateUpdater from '../date-updater/date-updater';
import { BoardListItemContainer, DoneIcon } from './board-list-item.styles';

const BoardListItem = ({ board, isSelected, onClick, grayscale }) => {
  return (
    <BoardListItemContainer
      grayscale={grayscale}
      isSelected={isSelected}
      backgroundColor={board.backgroundColor}
      onClick={() => onClick(board)}
    >
      <ColorBox backgroundColor={board.backgroundColor}>
        {isSelected && <DoneIcon />}
      </ColorBox>
      <BoardName>{board.name}</BoardName>
      <CreatedAt>
        <DateUpdater value={board.updatedAt} formatFn={humanReadableTime} />
      </CreatedAt>
    </BoardListItemContainer>
  );
};

export default BoardListItem;
