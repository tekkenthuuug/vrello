import React from 'react';
import { CardContainer } from './skeleton-board-cards.styles';

const SkeletonBoardCards = ({ numberOfCards = 1 }) => {
  const cards = [];

  for (let i = 0; i < numberOfCards; i++) {
    cards.push(
      <CardContainer key={i}>
        <div />
        <span />
      </CardContainer>
    );
  }

  return cards;
};

export default SkeletonBoardCards;
