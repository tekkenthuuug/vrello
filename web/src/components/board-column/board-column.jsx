import React, { createRef, memo, useCallback, useRef, useState } from 'react';
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

const BoardColumn = ({ columnId, onDragOver }) => {
  const dispatch = useDispatch();
  const { emitMemberBoardChange } = useBoardEventsEmitter();

  const columnData = useSelector(selectColumn(columnId));

  const [isAddingCard, setIsAddingCard] = useState(false);

  const elementCreatorRef = createRef();

  const dragOverCardId = useRef(null);

  useOnClickOutside(elementCreatorRef, () => {
    setIsAddingCard(false);
  });

  const handleCardDrop = e => {
    e.preventDefault();
    const initialColumnId = e.dataTransfer.getData('initial_column_id');
    const taskId = e.dataTransfer.getData('task_id');

    if (!taskId || !initialColumnId) {
      return;
    }

    const action = moveCard(
      initialColumnId,
      columnData.id,
      taskId,
      dragOverCardId.current
    );

    dispatch(action);

    emitMemberBoardChange(action);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleColumnDragStart = e => {
    e.dataTransfer.setData('column_id', columnData.id);
  };

  const handleCardDelete = useCallback(
    (from, cardId) => {
      const action = deleteCard(from, cardId);

      dispatch(action);

      emitMemberBoardChange(action);
    },
    [dispatch, emitMemberBoardChange]
  );

  const handleCardAdd = ({ text, color }) => {
    if (!text.length) {
      return;
    }

    const action = addCard(columnData.id, { description: text, color });

    emitMemberBoardChange(action);

    setIsAddingCard(false);
  };

  return (
    <ColumnContainer
      onDragStart={handleColumnDragStart}
      onDragOver={e => {
        onDragOver(e, columnData.id);
      }}
      draggable
    >
      <ColumnHeader columnId={columnId} />
      <ColumnContent>
        <TasksContainer onDrop={handleCardDrop} onDragOver={handleDragOver}>
          {columnData.cards.map(card => (
            <TaskCard
              key={card.id}
              onDragOver={(_, taskId) => {
                dragOverCardId.current = taskId;
              }}
              cardData={card}
              columnId={columnData.id}
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
