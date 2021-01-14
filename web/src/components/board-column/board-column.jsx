import React, { createRef, memo, useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useBoardEventsEmitter from '../../hooks/useBoardEventsEmitter';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { addCard, deleteCard, moveCard } from '../../redux/board/board.actions';
import { selectColumn } from '../../redux/board/board.selectors';
import ColumnHeader from '../column-header/column-header';
import ElementCreator from '../element-creator/element-creator';
import TaskCard from '../task-card/task-card';
import {
  AddBtn,
  TasksContainer,
  ColumnContainer,
  ColumnContent,
} from './board-column.styles';

const BoardColumn = ({ columnId, onColumnDragOver }) => {
  const dispatch = useDispatch();
  const emitBoardChange = useBoardEventsEmitter();

  const columnInfo = useSelector(selectColumn(columnId));

  const [isAddingCard, setIsAddingCard] = useState(false);

  const elementCreatorRef = createRef();

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleCardDrop = e => {
    e.preventDefault();

    const initialColumnId = e.dataTransfer.getData('from_column');
    const cardId = e.dataTransfer.getData('card_id');

    if (!cardId || !initialColumnId || initialColumnId === columnId) {
      return;
    }

    const action = moveCard(initialColumnId, columnInfo.id, cardId);

    dispatch(action);

    emitBoardChange(action);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('column_id', columnInfo.id);
  };

  const handleCardDelete = useCallback(
    (from, cardId) => {
      const action = deleteCard(from, cardId);

      dispatch(action);

      emitBoardChange(action);
    },
    [dispatch, emitBoardChange]
  );

  const handleCardAdd = ({ text, color }) => {
    if (!text.length) {
      return;
    }

    const action = addCard(columnInfo.id, { description: text, color });

    emitBoardChange(action);

    setIsAddingCard(false);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => {
        onColumnDragOver(e, columnInfo.id);
      }}
      draggable
    >
      <ColumnHeader columnId={columnId} />
      <ColumnContent>
        <TasksContainer onDrop={handleCardDrop} onDragOver={handleDragOver}>
          {columnInfo.cards.map(card => (
            <TaskCard
              key={card.id}
              cardData={card}
              columnId={columnInfo.id}
              onDeleteClick={handleCardDelete}
              draggable
            />
          ))}
        </TasksContainer>
        {isAddingCard ? (
          <ElementCreator
            autoFocus
            asTextArea
            withColor
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
