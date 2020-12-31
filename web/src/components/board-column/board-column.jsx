import React, { createRef, memo, useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { selectColumn } from '../../redux/board/board.selectors';
import ColumnCard from '../column-card/column-card';
import ElementCreator from '../element-creator/element-creator';
import {
  AddBtn,
  CardsContainer,
  ColumnContainer,
  ColumnContent,
} from './board-column.styles';
import ColumnHeader from '../column-header/column-header';
import { addCard, deleteCard, moveCard } from '../../redux/board/board.actions';
import useBoardEventsEmmiter from '../../hooks/useBoardEventsEmmiter';

const BoardColumn = ({ columnId, onColumnDragOver }) => {
  const dispatch = useDispatch();
  const emitBoardChange = useBoardEventsEmmiter();

  const columnData = useSelector(selectColumn(columnId));

  const [isAddingCard, setIsAddingCard] = useState(false);

  const elementCreatorRef = createRef();

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleCardDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const initialColumnId = e.dataTransfer.getData('from');
    const cardId = e.dataTransfer.getData('id');

    const action = moveCard(initialColumnId, columnData.id, cardId);

    dispatch(action);

    emitBoardChange(action);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('id', columnData.id);
  };

  const handleCardDelete = useCallback(
    (from, cardId) => {
      const action = deleteCard(from, cardId);

      dispatch(action);

      emitBoardChange(action);
    },
    [dispatch, emitBoardChange]
  );

  const handleCardAdd = description => {
    if (!description.length) {
      return;
    }

    const action = addCard(columnData.id, { description });

    emitBoardChange(action);

    setIsAddingCard(false);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => {
        onColumnDragOver(e, columnData.id);
      }}
      draggable
    >
      <ColumnHeader columnId={columnId} />
      <ColumnContent>
        <CardsContainer onDrop={handleCardDrop} onDragOver={handleDragOver}>
          {columnData.cards.map(card => (
            <ColumnCard
              key={card.id}
              cardData={card}
              columnId={columnData.id}
              onDeleteClick={handleCardDelete}
              draggable
            />
          ))}
        </CardsContainer>
        {isAddingCard ? (
          <ElementCreator
            autoFocus
            asTextArea
            name='description'
            placeholder='Type card description here'
            buttonText='Add card'
            ref={elementCreatorRef}
            onClose={() => setIsAddingCard(false)}
            onSubmit={handleCardAdd}
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
