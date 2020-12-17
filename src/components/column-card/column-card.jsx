import React, { memo } from 'react';
import { CardContainer, Description } from './column-card.styles';

const ColumnCard = ({ data, initialColumn, ...otherProps }) => {
  const handleDragStart = e => {
    e.dataTransfer.setData('from', initialColumn);
    e.dataTransfer.setData('id', data.id);

    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = e => {
    e.target.style.display = 'block';
  };

  return (
    <CardContainer
      {...otherProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Description>{data.description}</Description>
    </CardContainer>
  );
};

export default memo(ColumnCard);
