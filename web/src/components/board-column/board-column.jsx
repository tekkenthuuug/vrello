import ColumnCard from 'Components/column-card/column-card';
import ElementCreator from 'Components/element-creator/element-creator';
import React, { memo, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import {
  AddBtn,
  ColumnContainer,
  ColumnContent,
  CardsContainer,
  ColumnName,
} from './board-column.styles';

const BoardColumn = ({
  columnData,
  onCardMove,
  onCardAdd,
  onCardDelete,
  onColumnDragOver,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const elementCreatorRef = React.createRef();

  const handleCardDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const initialColumnId = e.dataTransfer.getData('from');
    const cardId = e.dataTransfer.getData('id');

    onCardMove(initialColumnId, columnData.id, cardId);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('id', columnData.id);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => onColumnDragOver(e, columnData.id)}
      draggable
    >
      <ColumnName>{columnData.name}</ColumnName>
      <ColumnContent>
        <CardsContainer onDrop={handleCardDrop} onDragOver={handleDragOver}>
          {columnData.cards.map(card => (
            <ColumnCard
              key={card.id}
              cardData={card}
              columnId={columnData.id}
              onDeleteClick={onCardDelete}
              draggable
            />
          ))}
        </CardsContainer>
        {isAddingCard ? (
          <ElementCreator
            asTextArea
            name='description'
            placeholder='Type card description here'
            buttonText='Add card'
            ref={elementCreatorRef}
            onClose={() => setIsAddingCard(false)}
            onSubmit={description => {
              onCardAdd(columnData.id, description);
              setIsAddingCard(false);
            }}
          />
        ) : (
          <AddBtn onClick={() => setIsAddingCard(true)}>
            <MdAdd />
            Add card
          </AddBtn>
        )}
      </ColumnContent>
    </ColumnContainer>
  );
};

export default memo(BoardColumn);
