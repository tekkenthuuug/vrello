import React from 'react';
import {
  CardContainer,
  Color,
  Controls,
  DeleteContainer,
  DeleteIcon,
  Description,
} from './column-card.styles';

const ColumnCard = ({ cardData, columnId, onDeleteClick, ...otherProps }) => {
  const handleDragStart = e => {
    e.stopPropagation();

    e.dataTransfer.setData('from', columnId);
    e.dataTransfer.setData('id', cardData.id);

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
        <DeleteContainer onClick={() => onDeleteClick(columnId, cardData.id)}>
          <DeleteIcon />
        </DeleteContainer>
      </Controls>
      <Description>{cardData.description}</Description>
    </CardContainer>
  );
};

export default ColumnCard;
