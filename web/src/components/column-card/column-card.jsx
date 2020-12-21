import React, { memo } from 'react';
import {
  CardContainer,
  Description,
  DeleteIcon,
  DeleteContainer,
  Controls,
  Color,
} from './column-card.styles';

const ColumnCard = ({ data, columnId, onDeleteClick, ...otherProps }) => {
  const handleDragStart = e => {
    e.stopPropagation();

    e.dataTransfer.setData('from', columnId);
    e.dataTransfer.setData('id', data.id);

    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = e => {
    e.stopPropagation();

    e.target.style.display = 'block';
  };

  return (
    <CardContainer
      {...otherProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Controls>
        <Color />
        <DeleteContainer onClick={() => onDeleteClick(columnId, data.id)}>
          <DeleteIcon />
        </DeleteContainer>
      </Controls>
      <Description>{data.description}</Description>
    </CardContainer>
  );
};

export default memo(ColumnCard);
